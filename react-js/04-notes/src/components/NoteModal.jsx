import React from "react";

const NoteModal = ({
  isModalOpen,
  closeModal,
  submitHandler,
  title,
  setTitle,
  details,
  setDetails,
  selectId,
  inputRef
}) => {
  if (!isModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex justify-center items-center p-4 backdrop-blur-sm"
      onClick={closeModal}
    >
      <div
        className="bg-gray-900 border border-gray-700 text-white p-8 rounded-xl w-full max-w-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={submitHandler} className="flex flex-col gap-5">
          <h1 className="text-2xl font-bold text-gray-100">
            {selectId ? "Edit Note" : "Create Note"}
          </h1>
          
          <input
            type="text"
            placeholder="Note Title..."
            className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-100 placeholder-gray-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            ref={inputRef}
          />
          
          <textarea
            placeholder="Note Details..."
            className="h-40 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none text-gray-100 placeholder-gray-500"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          ></textarea>
          
          <div className="flex w-full gap-3 mt-2">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-lg transition-colors">
              {selectId ? "Update" : "Save"}
            </button>

            <button
              type="button"
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold px-5 py-3 rounded-lg transition-colors"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;