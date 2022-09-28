import React from "react";

const Spinner = ({ w, h }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`spinner-border animate-spin inline-block w-${w} h-${h} border-4 rounded-full`}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
