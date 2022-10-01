import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useUpdateProjectMutation } from "../../features/projects/projectsApi";
import Column from "./Column";

const Board = ({ controlModal, projects, notify }) => {
  
  const [boardProjects, setBoardProjects] = useState(projects);
  const [updatedProject] = useUpdateProjectMutation();

  useEffect(() => {
    setBoardProjects(projects);
  }, [projects]);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, {
      ...removed,
      stage: droppableDestination.droppableId,
    });

    // const result = {};
    const result = [...sourceClone, ...destClone];
    // result[droppableSource.droppableId] = sourceClone;
    // result[droppableDestination.droppableId] = destClone;

    updatedProject({
      id: removed.id,
      data: { stage: droppableDestination.droppableId },
    });

    return result;
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      const filteredSourceProjects = boardProjects.filter(
        (p) => p.stage === source.droppableId
      );
      const filteredRestProjects = boardProjects.filter(
        (p) => p.stage !== source.droppableId
      );
      const items = reorder(
        filteredSourceProjects,
        source.index,
        destination.index
      );
      console.log(items, [...filteredRestProjects, ...items]);
      setBoardProjects([...filteredRestProjects, ...items]);
    } else {
      const filteredSourceProjects = boardProjects.filter(
        (p) => p.stage === source.droppableId
      );
      const filteredDestinationProjects = boardProjects.filter(
        (p) => p.stage === destination.droppableId
      );
      const filteredRestProjects = boardProjects.filter((p) => {
        if (p.stage === source.droppableId) {
          return false;
        } else if (p.stage === destination.droppableId) {
          return false;
        } else {
          return true;
        }
      });
      const result = move(
        filteredSourceProjects,
        filteredDestinationProjects,
        source,
        destination
      );
      setBoardProjects([...filteredRestProjects, ...result]);
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-grow px-10 mt-4 space-x-5 overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400 scrollbar-track-rounded-full scrollbar-thumb-rounded-full">
        <Column
          boardProjects={boardProjects}
          stage="Backlog"
          controlModal={controlModal}
          notify={notify}
        />
        <Column boardProjects={boardProjects} stage="Ready" />
        <Column boardProjects={boardProjects} stage="Doing" />
        <Column boardProjects={boardProjects} stage="Review" />
        <Column boardProjects={boardProjects} stage="Blocked" />
        <Column boardProjects={boardProjects} stage="Done" />
      </div>
    </DragDropContext>
  );
};

export default Board;
