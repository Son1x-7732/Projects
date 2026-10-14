import React from 'react'

const Form = () => {
  return (
    <div>
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-4 items-start p-10 lg:w-1/2"
      >
        <h1 className="text-3xl font-medium">
          {selectId ? "Edit Note" : "Add Notes"}
        </h1>
        <input
          type="text"
          placeholder="Enter Title"
          className="px-5 py-2 border-2 rounded w-full"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          placeholder="Enter Details"
          name=""
          id=""
          className="h-32 border-2 rounded px-5 py-2 w-full"
          value={details}
          onChange={(e) => {
            setDetails(e.target.value);
          }}
        ></textarea>
        <div className="flex w-full gap-2">
          <button className="bg-white w-full outline-none text-black px-5 py-2">
            {selectId ? "Update Note" : "Add Note"}
          </button>

          {selectId && (
            <button
              type="button"
              className="bg-gray-400 w-full outline-none text-black px-5 py-2"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default Form
