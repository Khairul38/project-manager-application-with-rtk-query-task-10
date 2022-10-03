import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddTeamModal from "../components/modals/AddTeamModal";
import Navigation from "../components/Navigation";
import Team from "../components/Team";
import Error from "../components/ui/Error";
import Spinner from "../components/ui/Spinner";
import { useGetTeamsQuery } from "../features/teams/teamsApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Teams = () => {
  const [opened, setOpened] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading, isError, error } = useGetTeamsQuery(user.email);

  const controlModal = () => {
    setOpened((prevState) => !prevState);
  };

  const notify = (message) => toast.success(message);

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <Spinner w="8" h="8" />;
  } else if (!isLoading && isError) {
    content = (
      <div>
        <Error message={error?.data} />
      </div>
    );
  } else if (!isLoading && !isError && data?.length === 0) {
    content = <div>No teams found</div>;
  } else if (!isLoading && !isError && data?.length > 0) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto">
        {data.map((team) => (
          <Team key={team.id} team={team} loggedInUser={user} notify={notify} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        <Navigation />
        <div className="px-10 mt-6 flex justify-between">
          <h1 className="text-2xl font-bold">Teams</h1>
          <button
            onClick={controlModal}
            className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
          </button>
        </div>
        {content}
      </div>
      <AddTeamModal
        opened={opened}
        controlModal={controlModal}
        notify={notify}
      />
      <ToastContainer autoClose={3000} theme="colored" />
    </>
  );
};

export default Teams;
