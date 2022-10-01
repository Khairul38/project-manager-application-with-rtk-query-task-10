import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useAddProjectMutation } from "../../features/projects/projectsApi";
import Error from "../ui/Error";
import Spinner from "../ui/Spinner";

const AddProjectModal = ({
  opened,
  controlModal,
  loggedInUser,
  teams,
  getTeamsSuccess,
  notify,
}) => {
  const [options, setOptions] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState({});
  const [description, setDescription] = useState("");
  const [addProject, { isLoading, isError }] = useAddProjectMutation();

  useEffect(() => {
    if (getTeamsSuccess) {
      setOptions(teams.map((team) => ({ label: team.teamName, value: team })));
    }
  }, [getTeamsSuccess, teams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTeam !== {} && description !== "") {
      addProject({
        team: selectedTeam.value,
        description,
        creator: loggedInUser,
        stage: "Backlog",
        date: new Date(),
      });
      controlModal();
      setSelectedTeam({});
      setDescription("");
      notify();
    }
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
            Add New Project
          </h2>
          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
            method="POST"
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <Select
                  options={options}
                  onChange={(e) => setSelectedTeam(e)}
                  noOptionsMessage={() => "Not found"}
                  placeholder="Type/Select team"
                  backspaceRemovesValue={true}
                  hideSelectedOptions={true}
                  isSearchable={true}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary: "#8000ff",
                    },
                  })}
                />
              </div>
              <div>
                <label htmlFor="description" className="sr-only">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id="description"
                  name="description"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Description"
                />
              </div>
            </div>

            <div className="flex gap-10">
              <button
                type="button"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => {
                  controlModal();
                  setSelectedTeam({});
                  setDescription("");
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                disabled={isLoading}
              >
                {isLoading ? <Spinner w="5" h="5" /> : "Add"}
              </button>
            </div>
            {isError && <Error message="There is an error" />}
          </form>
        </div>
      </>
    )
  );
};

export default AddProjectModal;
