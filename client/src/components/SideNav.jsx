import React from "react";
import { NavLink, useNavigate } from "react-router";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faLockOpen,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";
import { getUser, removeLocalStorageData } from "../utilities/AuthValid";
import { getColor } from "../static/RandomizeAvatarBgTheme";

function RenderUserAvatar() {
  const { name } = getUser();
  const getFirstLetterOfName = name.charAt(0);
  const bgAvatar = getColor();
  return (
    <div className="grid justify-center">
      <div
        className={`relative inline-flex items-center justify-center w-15 h-15 overflow-hidden ${bgAvatar} rounded-full`}
      >
        <span className="text-3xl text-white uppercase">
          {getFirstLetterOfName}
        </span>
      </div>
      <div className="relative text-center mt-2">
        <span className="font-semibold text-lg">{name}</span>
      </div>
    </div>
  );
}

function RenderNavigationItems({ title, iconStyle }) {
  return (
    <div
      role="button"
      tabIndex="0"
      className="flex uppercase items-center font-bold w-full p-3 text-start leading-tight transition-all hover:bg-blue-100 hover:bg-opacity-80  hover:text-black  outline-none"
    >
      <div className="grid place-items-center mr-4">
        <FontAwesomeIcon icon={iconStyle} />
      </div>
      {title}
    </div>
  );
}

RenderNavigationItems.Proptypes = {
  title: PropTypes.string,
  iconStyle: PropTypes.any,
};

function NavigationLinkHandler({ pathName, pathTo, operation, iconStyle }) {
  const activeLinkStyle = "underline text-blie-50";
  return (
    <>
      {pathTo ? (
        <NavLink
          to={pathTo}
          className={({ isActive }) => {
            return isActive ? activeLinkStyle : "";
          }}
        >
          <RenderNavigationItems title={pathName} iconStyle={iconStyle} />
        </NavLink>
      ) : (
        <div
          className="cursor-pointer"
          onClick={() => {
            operation();
          }}
        >
          <RenderNavigationItems title={pathName} iconStyle={iconStyle} />
        </div>
      )}
    </>
  );
}

RenderNavigationItems.Proptypes = {
  pathName: PropTypes.string,
  pathTo: PropTypes.string,
  operation: PropTypes.func,
  iconStyle: PropTypes.any,
};

export default function SideNav() {
  const nav = useNavigate();
  const handleLogout = async () => {
    removeLocalStorageData();
    nav("/");
  };

  const navItems = [
    { name: "dashboard", pathTo: "/dashboard", iconStyle: faHouse },
    { name: "create task", pathTo: "/task/create", iconStyle: faNoteSticky },
    {
      name: "logout",
      pathTo: "",
      handleOperation: handleLogout,
      iconStyle: faLockOpen,
    },
  ];

  return (
    <div className="relative flex flex-col bg-clip-border bg-white text-gray-700 h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4 text-center">
        <div>
          <RenderUserAvatar />
        </div>
      </div>
      <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
        {navItems.map((key, index) => {
          return (
            <NavigationLinkHandler
              key={index}
              pathName={key.name}
              pathTo={key.pathTo}
              operation={key.handleOperation}
              iconStyle={key.iconStyle}
            />
          );
        })}
      </nav>
    </div>
  );
}
