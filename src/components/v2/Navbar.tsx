import { Bell, Chats, FileText } from "@phosphor-icons/react";
import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);

  const categories = [
    {
      label: "Documentos",
      icon: <FileText className="size-5 opacity-60" weight="regular" />,
      route: "/documents",
    },
    {
      label: "Inicio",
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
    (category) => location.pathname === category.route
  );

  return (
    <div className="fixed bottom-0 w-full max-w-2xl pb-2 z-10">
      <div className="h-6 w-full bg-c-neutral-100 max-w-2xl fixed bottom-0 z-5"></div>
      <div className="h-20 w-full bg-gradient-to-t from-c-neutral-100 to-[#F3F4F7]/20 max-w-2xl fixed bottom-6 z-5 pointer-events-none"></div>
      <div className="flex items-center justify-around w-full px-2">
        {categories.map((category) => (
          <NavLink
            to={category.route}
            key={category.route}
            className={`z-10 flex flex-col items-center gap-1 p-1 sm:p-2 bg-transparent sm:hover:bg-blue-950/5 w-full rounded-lg transition`}
          >
            {activeCategory === category
              ? React.cloneElement(category.icon, {
                  weight: "fill",
                  className: "size-5 opacity-100",
                })
              : category.icon}
            <span
              className={`text-xs ${
                activeCategory === category ? "opacity-100" : "opacity-60"
              }`}
            >
              {category.label}
            </span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
