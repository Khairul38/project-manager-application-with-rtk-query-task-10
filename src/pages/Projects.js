import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddProjectModal from "../components/modals/AddProjectModal";
import Navigation from "../components/Navigation";
import Board from "../components/projects/Board";
import Error from "../components/ui/Error";
import Spinner from "../components/ui/Spinner";
import { useGetProjectsQuery } from "../features/projects/projectsApi";
import { useGetTeamsQuery } from "../features/teams/teamsApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Projects = () => {
  const [opened, setOpened] = useState(false);
  const { user: loggedInUser } = useSelector((state) => state.auth);
  const { data: teams, isSuccess: getTeamsSuccess } = useGetTeamsQuery(
    loggedInUser.email
  );
  const {
    data: projects,
    isLoading,
    isError,
    error,
  } = useGetProjectsQuery(loggedInUser.email);

  const controlModal = () => {
    setOpened((prevState) => !prevState);
  };

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
  } else if (!isLoading && !isError && projects?.length > 0) {
    content = (
      <Board
        controlModal={controlModal}
        projects={projects}
        // loggedInUser={loggedInUser}
      />
    );
  }

  const notify = () => toast.success("Project added successfully");

  return (
    <>
      <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        <Navigation>
          <input
            className="flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring"
            type="search"
            placeholder="Search for projects…"
          />
        </Navigation>
        <div className="px-10 mt-6">
          <h1 className="text-2xl font-bold">Project Board</h1>
        </div>
        {content}
      </div>
      <AddProjectModal
        opened={opened}
        controlModal={controlModal}
        loggedInUser={loggedInUser}
        teams={teams}
        getTeamsSuccess={getTeamsSuccess}
        notify={notify}
      />
      <ToastContainer 
      autoClose={3000} 
      theme="colored" />
    </>
  );
};

export default Projects;
