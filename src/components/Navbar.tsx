import { ArrowRight, Bell, Chats, FileText } from "@phosphor-icons/react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const categories = [
    {
      label: "Documentos",
      icon: <FileText className="size-5 opacity-60" weight="regular" />,
      route: "/documents",
    },
    {
      label: "Chats",
      icon: <Chats className="size-5 opacity-60" weight="regular" />,
      route: "/",
    },
    {
      label: "Notificaciones",
      icon: <Bell className="size-5 opacity-60" weight="regular" />,
      route: "/notifications",
    },
  ];

  const activeCategory = categories.find(
    (category) => window.location.pathname === category.route
  );

  return (
    <div
      className="flex items-center gap-2 fixed bottom-0 w-full justify-around max-w-[600px] p-2 text-blue-950
     bg-[#f3f3f1] z-10 mx-auto border-x border-neutral-200 fade-in"
    >
      {categories.map((category) => (
        <NavLink
          to={category.route}
          key={category.route}
          className={({ isActive, isPending }) => {
            return `flex flex-col items-center gap-1 p-1 sm:p-2 bg-transparent sm:hover:bg-blue-950/5 w-full rounded-lg transition`;
          }}
        >
          <div className="relative">
            {category.label === "Notificaciones" && (
              <span className="size-3 bg-blue-600 text-white flex items-center justify-center text-xs rounded-full absolute -top-1 -right-1"></span>
            )}
            {activeCategory === category
              ? React.cloneElement(category.icon, {
                  weight: "bold",
                  className: "size-5 opacity-100",
                })
              : category.icon}
          </div>
          <span
            className={`text-xs opacity-60 ${
              activeCategory === category
                ? "font-bold !opacity-100"
                : "font-normal"
            }`}
          >
            {category.label}
          </span>
        </NavLink>
      ))}
      <div className="w-full fixed bottom-[60px] left-0">
        <div className="w-full max-w-[600px] bg-gradient-to-t from-[#f3f3f1] to-[#f3f3f1]/20 border-x border-neutral-200 mx-auto left-0 h-20 z-5">
        </div>
      </div>
      {activeCategory === categories[1] && (
        <div className="absolute bottom-[64px] sm:bottom-[70px] left-0 w-full px-5">
          <button
            onClick={() => navigate("/chat/new")}
            className="w-full font-medium text-white px-4 py-3 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full justify-center flex items-center gap-2"
          >
            Nuevo chat
            <ArrowRight weight="bold" className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
