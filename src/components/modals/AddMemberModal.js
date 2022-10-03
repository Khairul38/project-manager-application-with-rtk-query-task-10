import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import { useUpdateTeamMutation } from "../../features/teams/teamsApi";
import { useGetUserQuery } from "../../features/users/usersApi";
import Error from "../ui/Error";

const AddMemberModal = ({ opened, controlModal, team, notify }) => {
  const [defaultOptions, setDefaultOptions] = useState([]);
  const [selectedMember, setSelectedMember] = useState({});
  const [error, setError] = useState("");
  const { data: users, isSuccess: getUsersSuccess } = useGetUserQuery();
  const [updateTeam, { isLoading }] = useUpdateTeamMutation();

  useEffect(() => {
    if (getUsersSuccess) {
      setDefaultOptions(
        users
          .filter((u) => !team.members.includes(u.email))
          .map((user) => ({ label: user.email, value: user.email }))
      );
    }
  }, [getUsersSuccess, team.members, users]);

  const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const loadOption = (inputValue, callback) => {
    if (getUsersSuccess) {
      callback(
        defaultOptions.filter((option) =>
          option.label.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!team.members.includes(selectedMember.value)) {
      updateTeam({
        id: team.id,
        data: { members: [...team.members, selectedMember.value] },
      });
      controlModal();
      notify("Add Member Successfully");
    } else {
      setError("Member already exist");
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
            Add New Team Member
          </h2>
          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
            method="POST"
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <AsyncSelect
                defaultOptions={defaultOptions}
                loadOptions={debounce(loadOption, 500)}
                onChange={(e) => setSelectedMember(e)}
                noOptionsMessage={() => "Not found"}
                loadingMessage={() => "Searching..."}
                placeholder="Type/Select email"
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

            <div className="flex gap-10">
              <button
                type="button"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => {
                  // setTeamName("");
                  // setTeamColor("#F44336");
                  // setDescription("");
                  controlModal();
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                disabled={isLoading}
              >
                Add
              </button>
            </div>
            {error !== "" && <Error message={error} />}
          </form>
        </div>
      </>
    )
  );
};

export default AddMemberModal;
