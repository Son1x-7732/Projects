import React, { useEffect, useRef, useState } from "react";
import NoteCard from "./components/NoteCard";
import NoteModal from "./components/NoteModal";

const App = () => {
  const inputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [task, setTask] = useState(() => {
    const data = localStorage.getItem("notes-app");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  });
  const [selectId, setSelectId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(
    function () {
      localStorage.setItem("notes-app", JSON.stringify(task));
    },
    [task],
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setNoteToDelete(null);
        setIsModalOpen(false);
      }
    };
    if (noteToDelete || isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [noteToDelete, isModalOpen]);

  useEffect(() => {
    if (isModalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isModalOpen]);

  useEffect(() => {
    const handleShortcut = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();

        setTitle("");
        setDetails("");
        setSelectId(null);
        setIsModalOpen(true);
      }
    };

    window.addEventListener("keydown", handleShortcut);

    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const trimmed_title = title.trim();
    const trimmed_details = details.trim();
    if (trimmed_title === "") {
      return;
    }

    if (selectId) {
      const updatedTask = task.map((elem) => {
        if (elem.id === selectId) {
          return {
            ...elem,
            title: trimmed_title,
            details: trimmed_details,
          };
        } else {
          return elem;
        }
      });
      setTask(updatedTask);
      setSelectId(null);
    } else {
      const newnote = {
        id: crypto.randomUUID(),
        title: trimmed_title,
        details: trimmed_details,
      };
      setTask([...task, newnote]);
    }
    setTitle("");
    setDetails("");
    setIsModalOpen(false);
  };

  const handleEdit = (note) => {
    setSelectId(note.id);
    setTitle(note.title);
    setDetails(note.details);
    setIsModalOpen(true);
  };

  const deleteNote = (uuid) => {
    // const deleteTask = task.filter((elem) => elem.id !== uuid);
    // setTask(deleteTask);
    setNoteToDelete(uuid);
  };

  const closeModal = () => {
    setSelectId(null);
    setTitle("");
    setDetails("");
    setIsModalOpen(false);
  };

  const filteredTask = task.filter((note) => {
    const query = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(query) ||
      note.details.toLowerCase().includes(query)
    );
  });

  return (
    <div className="h-screen flex bg-black text-white">
      <div className="p-10 w-full bg-gray-900">
        <div className="flex gap-4 mb-4 items-center justify-between">
          <h1 className="text-3xl font-medium">Your Notes</h1>
          <button
            className="bg-white text-black px-4 py-2 rounded"
            onClick={() => {
              setTitle("");
              setDetails("");
              setSelectId(null);
              setIsModalOpen(true);
            }}
          >
            Create Note
          </button>
        </div>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          className="px-5 py-2 border-2"
        />
        {/* Responsive Grid: 1 col on mobile, 2 on small screens, 3 on medium, 4 on large */}
        {/* Replaced 'flex flex-wrap' and 'grid' with 'columns' for a true masonry layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 mt-5 h-full overflow-auto pb-20">
          {filteredTask.map((elem) => (
            <NoteCard
              key={elem.id}
              note={elem}
              onEdit={handleEdit}
              onDelete={deleteNote}
            />
          ))}
        </div>
      </div>

      {noteToDelete && (
        <div
          className="fixed inset-0 bg-black/70 flex justify-center items-center"
          onClick={() => setNoteToDelete(null)}
        >
          <div
            className="bg-white text-black p-6 rounded-lg w-80"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this note?
            </h3>

            <div className="flex gap-2">
              <button
                className="w-1/2 bg-gray-400 py-2 rounded"
                onClick={() => setNoteToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="w-1/2 bg-red-400 text-white py-2 rounded"
                onClick={() => {
                  const updatedTask = task.filter(
                    (note) => note.id !== noteToDelete,
                  );
                  setTask(updatedTask);
                  setNoteToDelete(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <NoteModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        submitHandler={submitHandler}
        title={title}
        setTitle={setTitle}
        details={details}
        setDetails={setDetails}
        selectId={selectId}
        inputRef={inputRef}
      />
    </div>
  );
};

export default App;
