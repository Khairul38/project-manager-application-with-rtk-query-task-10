import gravatarUrl from "gravatar-url";
import moment from "moment";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useDeleteProjectMutation } from "../../features/projects/projectsApi";
import DropdownEditMenu from "../ui/DropdownEditMenu";

const Project = ({ project, index, notify }) => {
  const { id, date, stage, description, team, creator, match } = project;

  const { user: loggedInUser } = useSelector((state) => state.auth);
  const [deleteProject, { isLoading }] = useDeleteProjectMutation();

  const handleDeleteProject = () => {
    if (!isLoading) {
      deleteProject({ id, email: loggedInUser.email });
      notify("Project Deleted Successfully");
    }
  };

  return (
    <Draggable index={index} draggableId={project.id.toString()}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100 ${match && "border-2 border-indigo-600"}`}
          draggable="true"
        >
          {stage === "Backlog" && (
            <DropdownEditMenu
              align="right"
              className="absolute top-0 right-0 items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
            >
              <li
                onClick={handleDeleteProject}
                className="font-medium text-sm cursor-pointer text-rose-500 hover:text-rose-600 flex py-1 px-3 hover:bg-slate-100"
              >
                Delete
              </li>
            </DropdownEditMenu>
          )}
          <span
            style={{
              color: team.teamColor,
            }}
            className={`flex items-center h-6 px-3 text-xs font-semibold rounded-full bg-[${team.teamColor}] bg-opacity-20`}
          >
            {team.teamName}
          </span>
          <h4 className="mt-3 text-sm font-medium">{description}</h4>
          <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-gray-300 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-1 leading-none">
                {moment(date).format("ll")}
              </span>
            </div>

            <img
              className="w-6 h-6 ml-auto rounded-full"
              src={gravatarUrl(creator.email)}
              alt=""
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Project;
