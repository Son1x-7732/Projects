import argparse
import json
import math
import os
import pickle
import string
from collections import Counter
from logging import exception, raiseExceptions

from nltk.stem import PorterStemmer

BM25_K1 = 1.5
BM25_B = 0.75
CACHE_DIR = "cache"

stemmer = PorterStemmer()


# Helper Function
def load_movies():
    with open("data/movies.json") as f:
        data = json.load(f)

    return data["movies"]


def load_stopwords():
    with open("data/stopwords.txt") as f:
        return [
            word.translate(str.maketrans("", "", string.punctuation)).lower()
            for word in f.read().splitlines()
        ]


def tokenize_text(text, stopwords):
    translator = str.maketrans("", "", string.punctuation)
    text = text.lower()
    text = text.translate(translator)
    tokens = text.split()
    tokens = [token for token in tokens if token not in stopwords]
    tokens = [stemmer.stem(token) for token in tokens]
    return tokens


def tokenize_single_term(text, stopwords):
    tokens = tokenize_text(text, stopwords)

    if len(tokens) != 1:
        raise ValueError("Expected exactly one token")

    return tokens[0]


def bm25_tf_command(doc_id, term, k1=BM25_K1, b=BM25_B):
    inverted_index = InvertedIndex()
    inverted_index.load()
    stopwords = load_stopwords()

    term = tokenize_single_term(term, stopwords)

    return inverted_index.get_bm25_tf(doc_id, term, k1, b)


class InvertedIndex:
    def __init__(self):
        self.index = {}
        self.docmap = {}
        self.term_frequencies = {}
        self.doc_lengths = {}
        self.doc_lengths_path = os.path.join(CACHE_DIR, "doc_lengths.pkl")

    def __add_document(self, doc_id, text, stopwords):
        tokens = tokenize_text(text, stopwords)

        self.doc_lengths[doc_id] = len(tokens)

        self.term_frequencies[doc_id] = Counter()

        for token in tokens:
            if token not in self.index:
                self.index[token] = set()
            self.index[token].add(doc_id)
            self.term_frequencies[doc_id][token] += 1

    def __get_avg_doc_length(self) -> float:
        if not self.doc_lengths:
            return 0.0

        return sum(self.doc_lengths.values()) / len(self.doc_lengths)

    def get_documents(self, term):
        return sorted(self.index.get(term, set()))

    def build(self):
        movies = load_movies()
        stopwords = load_stopwords()

        for movie in movies:
            self.docmap[movie["id"]] = movie

            text = f"{movie['title']} {movie['description']}"
            self.__add_document(movie["id"], text, stopwords)

    def save(self):
        os.makedirs(CACHE_DIR, exist_ok=True)

        with open("cache/index.pkl", "wb") as f:
            pickle.dump(self.index, f)

        with open("cache/docmap.pkl", "wb") as f:
            pickle.dump(self.docmap, f)

        with open("cache/term_frequencies.pkl", "wb") as f:
            pickle.dump(self.term_frequencies, f)

        with open(self.doc_lengths_path, "wb") as f:
            pickle.dump(self.doc_lengths, f)

    def load(self):
        with open("cache/index.pkl", "rb") as f:
            self.index = pickle.load(f)

        with open("cache/docmap.pkl", "rb") as f:
            self.docmap = pickle.load(f)

        with open("cache/term_frequencies.pkl", "rb") as f:
            self.term_frequencies = pickle.load(f)

        with open(self.doc_lengths_path, "rb") as f:
            self.doc_lengths = pickle.load(f)

    def get_tf(self, doc_id, term):
        return self.term_frequencies[doc_id][term]

    def get_bm25_tf(self, doc_id, term, k1=BM25_K1, b=BM25_B):
        tf = self.get_tf(doc_id, term)
        doc_length = self.doc_lengths[doc_id]
        avg_doc_length = self.__get_avg_doc_length()

        length_norm = 1 - b + b * (doc_length / avg_doc_length)

        return (tf * (k1 + 1)) / (tf + k1 * length_norm)

    def get_bm25_idf(self, term):
        N = len(self.docmap)

        df = len(self.get_documents(term))

        return math.log((N - df + 0.5) / (df + 0.5) + 1)

    def bm25(self, doc_id, term):
        bm25_tf = self.get_bm25_tf(doc_id, term)
        bm25_idf = self.get_bm25_idf(term)

        return bm25_tf * bm25_idf

    def bm25_search(self, query, limit):
        stopwords = load_stopwords()
        query_tokens = tokenize_text(query, stopwords)

        scores = {}

        for doc_id in self.docmap:
            total_score = 0.0

            for token in query_tokens:
                total_score += self.bm25(doc_id, token)

            scores[doc_id] = total_score

        sorted_scores = sorted(scores.items(), key=lambda item: item[1], reverse=True)

        return sorted_scores[:limit]


def main() -> None:
    parser = argparse.ArgumentParser(description="Keyword Search CLI")
    subparsers = parser.add_subparsers(dest="command", help="Available commands")

    search_parser = subparsers.add_parser("search", help="Search movies using keywords")
    search_parser.add_argument("query", type=str, help="Search query")

    build_parser = subparsers.add_parser("build", help="Build the inverted index")

    tf_parser = subparsers.add_parser("tf", help="Get term frequency")
    tf_parser.add_argument("doc_id", type=int)
    tf_parser.add_argument("term", type=str)

    idf_parser = subparsers.add_parser(
        "idf", help="Calculate inverse document frequency"
    )
    idf_parser.add_argument("term", type=str, help="Term to calculate IDF for")

    tfidf_parser = subparsers.add_parser("tfidf", help="Calculate TF-IDF score")

    tfidf_parser.add_argument("doc_id", type=int)
    tfidf_parser.add_argument("term", type=str)

    bm25_id_parser = subparsers.add_parser(
        "bm25idf", help="Get BM25 IDF score for a given term"
    )

    bm25_id_parser.add_argument(
        "term", type=str, help="Term to get the BM25 IDF score for"
    )

    bm25_tf_parser = subparsers.add_parser(
        "bm25tf", help="Get BM25 TF score for a given document ID and term"
    )

    bm25_tf_parser.add_argument("doc_id", type=int, help="Document ID")
    bm25_tf_parser.add_argument("term", type=str, help="Term to get BM25 TF score for")
    bm25_tf_parser.add_argument(
        "k1", type=float, nargs="?", default=BM25_K1, help="Tunable BM25 K1 parameter"
    )
    bm25_tf_parser.add_argument(
        "b", type=float, nargs="?", default=BM25_B, help="Tunable BM25 b parameter"
    )

    bm25_search_parser = subparsers.add_parser(
        "bm25search", help="Search movies using full BM25 scoring"
    )

    bm25_search_parser.add_argument("query", type=str, help="Search query")

    bm25_search_parser.add_argument(
        "--limit", type=int, default=5, help="Maximum number of results"
    )

    args = parser.parse_args()

    match args.command:
        case "search":
            inverted_index = InvertedIndex()

            try:
                inverted_index.load()
            except FileNotFoundError:
                print("Error: index not found. Please run the build command first.")
                return

            stopwords = load_stopwords()
            query_tokens = tokenize_text(args.query, stopwords)
            results = []
            seen = set()

            for token in query_tokens:
                docs = inverted_index.get_documents(token)

                for doc_id in docs:
                    if doc_id in seen:
                        continue

                    seen.add(doc_id)
                    results.append(inverted_index.docmap[doc_id])

                    if len(results) == 5:
                        break

                if len(results) == 5:
                    break

            for i, movie in enumerate(results, 1):
                print(f"{i}. {movie['title']} ({movie['id']})")

        case "tf":
            inverted_index = InvertedIndex()

            try:
                inverted_index.load()
            except FileNotFoundError:
                print("Error: index not found. Please run the build command first.")
                return

            stopwords = load_stopwords()

            term = tokenize_single_term(args.term, stopwords)

            frequency = inverted_index.get_tf(args.doc_id, term)

            print(frequency)

        case "idf":
            inverted_index = InvertedIndex()
            inverted_index.load()

            stopwords = load_stopwords()
            token = tokenize_single_term(args.term, stopwords)

            total_doc_count = len(inverted_index.docmap)
            term_match_doc_count = len(inverted_index.get_documents(token))

            idf = math.log((total_doc_count + 1) / (term_match_doc_count + 1))

            print(f"Inverse document frequency of '{args.term}': {idf:.2f}")

        case "tfidf":
            inverted_index = InvertedIndex()
            inverted_index.load()

            stopwords = load_stopwords()
            term = tokenize_single_term(args.term, stopwords)

            tf = inverted_index.get_tf(args.doc_id, term)

            total_doc_count = len(inverted_index.docmap)
            term_match_doc_count = len(inverted_index.get_documents(term))

            idf = math.log((total_doc_count + 1) / (term_match_doc_count + 1))

            tf_idf = tf * idf

            print(
                f"TF-IDF score of '{args.term}' in document '{args.doc_id}': {tf_idf:.2f}"
            )

        case "bm25idf":
            inverted_index = InvertedIndex()
            inverted_index.load()
            stopwords = load_stopwords()

            term = tokenize_single_term(args.term, stopwords)

            bm25idf = inverted_index.get_bm25_idf(term)
            print(f"BM25 IDF score of '{args.term}': {bm25idf:.2f}")

        case "bm25tf":
            bm25tf = bm25_tf_command(args.doc_id, args.term, args.k1, args.b)
            print(
                f"BM25 TF score of '{args.term}' in document '{args.doc_id}': {bm25tf:.2f}"
            )

        case "bm25search":
            inverted_index = InvertedIndex()
            inverted_index.load()

            results = inverted_index.bm25_search(args.query, args.limit)

            for i, (doc_id, score) in enumerate(results, 1):
                movie = inverted_index.docmap[doc_id]

                print(f"{i}. ({doc_id}) {movie['title']} - Score: {score:.2f}")

        case "build":
            inverted_index = InvertedIndex()
            inverted_index.build()
            inverted_index.save()

        case _:
            parser.print_help()


if __name__ == "__main__":
    main()
