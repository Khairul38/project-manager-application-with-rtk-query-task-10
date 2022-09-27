import React from "react";

const AddProjectModal = ({ opened, controlModal }) => {
  return (
    opened && (
      <>
        <div
          onClick={controlModal}
          className="fixed w-full h-full inset-0 z-10 bg-black/50"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add New Project
          </h2>
          <form
            className="mt-8 space-y-6"
            // onSubmit={handleSubmit}
            // method="POST"
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="to" className="sr-only">
                  To
                </label>
                <input
                  // onChange={debounce(doSearch, 500)}
                  id="to"
                  name="to"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Send to"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  // value={message}
                  // onChange={(e) => setMessage(e.target.value)}
                  id="message"
                  name="message"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Message"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                // disabled={
                //   conversation === undefined ||
                //   (participant?.length > 0 &&
                //     participant[0].email === loggedInUser.email)
                // }
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </>
    )
  );
};

export default AddProjectModal;
