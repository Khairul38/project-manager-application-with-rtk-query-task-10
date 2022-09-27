import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAddTeamMutation } from "../../features/teams/teamsApi";
import Color from "../ui/Color";

const AddTeamModal = ({ opened, controlModal }) => {
  const [teamName, setTeamName] = useState("");
  const [teamColor, setTeamColor] = useState("#F44336");
  const [description, setDescription] = useState("");
  const { user: loggedInUser } = useSelector((state) => state.auth);
  const [addTeam, { isSuccess }] = useAddTeamMutation();

  useEffect(() => {
    if (isSuccess) {
      controlModal();
    }
  }, [isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTeam({
      teamName,
      teamColor,
      description,
      members: [loggedInUser],
      creator: loggedInUser,
      date: new Date(),
    });
  };
  return (
    opened && (
      <>
        <div
          onClick={controlModal}
          className="fixed w-full h-full inset-0 z-10 bg-black/50"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add New Team
          </h2>
          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
            method="POST"
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="to" className="sr-only">
                  To
                </label>
                <input
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  id="teamName"
                  name="teamName"
                  type="name"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Team name"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id="description"
                  name="description"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Description"
                />
              </div>
              <div className="appearance-none rounded-none relative rounded-b-md block px-3 py-2 border border-gray-300">
                <label className="text-gray-500">Select team color</label>
                <ul className="flex mt-2 gap-2.5">
                  <Color teamColor={teamColor} setTeamColor={setTeamColor} />
                </ul>
              </div>
            </div>

            <div className="flex gap-10">
              <button
                type="button"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => {
                  setTeamName("");
                  setTeamColor("#F44336");
                  setDescription("");
                  controlModal();
                }}
              >
                Cancel
              </button>
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

export default AddTeamModal;
