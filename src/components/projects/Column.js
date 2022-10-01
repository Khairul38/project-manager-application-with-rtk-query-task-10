import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import Project from "./Project";

const Column = ({ boardProjects, stage, controlModal, notify }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const filteredProjects = boardProjects.filter(
      (boardProject) => boardProject.stage === stage
    );
    setProjects(filteredProjects);
  }, [boardProjects, stage]);

  // console.log(boardProjects, stage, projects);
  return (
    <Droppable droppableId={stage}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={`flex flex-col flex-shrink-0 w-72 rounded-md pl-2.5 ${
            snapshot.isDraggingOver && "bg-indigo-100"
          }`}
        >
          <div className="flex items-center flex-shrink-0 h-10 px-2">
            <span className="block text-sm font-semibold">{stage}</span>
            <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
              {projects.length}
            </span>
            {stage === "Backlog" && (
              <button
                onClick={() => controlModal()}
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
            )}
          </div>
          <div className="flex flex-col pb-2 pr-2.5 overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400 scrollbar-track-rounded-full scrollbar-thumb-rounded-full">
            {projects.map((project, index) => (
              <Project
                key={project.id}
                index={index}
                project={project}
                notify={notify}
              />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;
