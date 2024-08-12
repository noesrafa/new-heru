import { ArrowRight, Bell, Chats, FileText } from "@phosphor-icons/react";
import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const categories = [
    {
      label: "Documentos",
      icon: <FileText className="size-5" weight="regular" />,
      route: "/documents",
    },
    {
      label: "Chats",
      icon: <Chats className="size-5" weight="regular" />,
      route: "/",
    },
    {
      label: "Notificaciones",
      icon: <Bell className="size-5" weight="regular" />,
      route: "/notifications",
    },
  ];

  const activeCategory = categories.find(
    (category) => window.location.pathname === category.route
  );

  return (
    <div
      className="flex items-center gap-2 fixed bottom-0 w-full justify-around max-w-[600px] p-2 text-blue-950
     bg-[#f3f3f1] z-10"
    >
      {categories.map((category) => (
        <NavLink
          to={category.route}
          key={category.route}
          className={({ isActive, isPending }) => {
            return `flex flex-col items-center gap-1 p-1 sm:p-2 opacity-60 bg-transparent hover:bg-blue-950/5 w-full rounded-lg transition ${
              isActive ? "!opacity-100" : isPending ? "pending" : ""
            }`;
          }}
        >
          {activeCategory === category
            ? React.cloneElement(category.icon, {
                weight: "bold",
              })
            : category.icon}
          <span
            className={`text-xs ${
              activeCategory === category ? "font-medium" : ""
            }`}
          >
            {category.label}
          </span>
        </NavLink>
      ))}
      {activeCategory === categories[1] && (
        <div className="absolute bottom-[64px] sm:bottom-[70px] left-0 w-full px-5">
          <button className="w-full font-medium text-white px-4 py-3 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full justify-center flex items-center gap-2">
            Nuevo chat
            <ArrowRight weight="bold" className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
