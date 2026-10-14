import React from "react";

const NoteCard = ({ note, onDelete, onEdit }) => {
  return (
    <div
      className="flex flex-col justify-between h-fit w-full rounded-xl bg-gray-800 border border-gray-700 p-5 shadow-lg hover:shadow-xl transition-all duration-200 mb-6 break-inside-avoid"
    >
      <div className="mb-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-100 mb-2 wrap-break-word">
          {note.title}
        </h3>
        
        {/* Details */}
        <p className="font-medium text-gray-400 text-sm whitespace-pre-wrap wrap-break-word">
          {note.details}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between w-full gap-2 mt-auto">
        <button
          type="button"
          className="flex-1 bg-gray-700 text-xs py-2 text-gray-200 font-semibold rounded hover:bg-gray-600 transition-colors"
          onClick={() => onEdit(note)}
        >
          Edit
        </button>
        <button
          type="button"
          className="flex-1 bg-red-900/50 border border-red-900 text-xs py-2 text-red-400 font-semibold rounded hover:bg-red-900/80 hover:text-red-300 transition-colors"
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
