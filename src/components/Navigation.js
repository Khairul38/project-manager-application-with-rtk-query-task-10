import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { userLoggedOut } from "../features/auth/authSlice";
import logoImage from "../images/logo.png";
import DropdownProfile from "./ui/DropdownProfile";

const Navigation = ({ children }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
  };
  return (
    <div className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75">
      <Link to="/">
        <img src={logoImage} className="h-10 w-10 cursor-pointer" alt="" />
      </Link>

      <div className="flex ml-10">
        <Link to="/teams">
          <p
            className={`mx-2 text-sm font-semibold hover:text-indigo-700 ${
              pathname === "/teams" ? "text-indigo-700" : "text-gray-600"
            }`}
          >
            Teams
          </p>
        </Link>
        <Link to="/projects">
          <p
            className={`mx-2 text-sm font-semibold hover:text-indigo-700 ${
              pathname === "/projects" ? "text-indigo-700" : "text-gray-600"
            }`}
          >
            Projects
          </p>
        </Link>
      </div>
      {children}
      {/* <button className="flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer">
        <img
          src="https://assets.codepen.io/5041378/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1600304177&width=512"
          alt="pathyhssdf asd "
        />
      </button> */}
      <div className="flex items-center justify-center ml-auto">
        <DropdownProfile user={user} handleLogout={handleLogout} />
      </div>
    </div>
  );
};

export default Navigation;
