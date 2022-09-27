import React from "react";

const Color = ({ teamColor, setTeamColor }) => {
  
  return (
    <>
      <li
        onClick={() => setTeamColor("#F44336")}
        className={`bg-[#F44336] p-4 rounded-full cursor-pointer ${
          teamColor === "#F44336" && `ring-2 ring-offset-2 ring-[#F44336]`
        }`}
      ></li>
      <li
        onClick={() => setTeamColor("#E91E63")}
        className={`bg-[#E91E63] p-4 rounded-full cursor-pointer ${
          teamColor === "#E91E63" && `ring-2 ring-offset-2 ring-[#E91E63]`
        }`}
      ></li>
      <li
        onClick={() => setTeamColor("#9C27B0")}
        className={`bg-[#9C27B0] p-4 rounded-full cursor-pointer ${
          teamColor === "#9C27B0" && `ring-2 ring-offset-2 ring-[#9C27B0]`
        }`}
      ></li>
      <li
        onClick={() => setTeamColor("#2196F3")}
        className={`bg-[#2196F3] p-4 rounded-full cursor-pointer ${
          teamColor === "#2196F3" && `ring-2 ring-offset-2 ring-[#2196F3]`
        }`}
      ></li>
      <li
        onClick={() => setTeamColor("#00BCD4")}
        className={`bg-[#00BCD4] p-4 rounded-full cursor-pointer ${
          teamColor === "#00BCD4" && `ring-2 ring-offset-2 ring-[#00BCD4]`
        }`}
      ></li>
      <li
        onClick={() => setTeamColor("#009688")}
        className={`bg-[#009688] p-4 rounded-full cursor-pointer ${
          teamColor === "#009688" && `ring-2 ring-offset-2 ring-[#009688]`
        }`}
      ></li>
      <li
        onClick={() => setTeamColor("#8BC34A")}
        className={`bg-[#8BC34A] p-4 rounded-full cursor-pointer ${
          teamColor === "#8BC34A" && `ring-2 ring-offset-2 ring-[#8BC34A]`
        }`}
      ></li>
      <li
        onClick={() => setTeamColor("#FFC107")}
        className={`bg-[#FFC107] p-4 rounded-full cursor-pointer ${
          teamColor === "#FFC107" && `ring-2 ring-offset-2 ring-[#FFC107]`
        }`}
      ></li>
      <li
        onClick={() => setTeamColor("#FF9800")}
        className={`bg-[#FF9800] p-4 rounded-full cursor-pointer ${
          teamColor === "#FF9800" && `ring-2 ring-offset-2 ring-[#FF9800]`
        }`}
      ></li>
      <li
        onClick={() => setTeamColor("#795548")}
        className={`bg-[#795548] p-4 rounded-full cursor-pointer ${
          teamColor === "#795548" && `ring-2 ring-offset-2 ring-[#795548]`
        }`}
      ></li>
      <li
        onClick={() => setTeamColor("#F78DA7")}
        className={`bg-[#F78DA7] p-4 rounded-full cursor-pointer ${
          teamColor === "#F78DA7" && `ring-2 ring-offset-2 ring-[#F78DA7]`
        }`}
      ></li>
      <li
        onClick={() => setTeamColor("#3F51B5")}
        className={`bg-[#3F51B5] p-4 rounded-full cursor-pointer ${
          teamColor === "#3F51B5" && `ring-2 ring-offset-2 ring-[#3F51B5]`
        }`}
      ></li>
    </>
  );
};

export default Color;
