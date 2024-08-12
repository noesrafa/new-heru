import { ArrowRight, Bell, Chats, FileText, Plus, Sparkle } from "@phosphor-icons/react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const categories = [
    {
      label: "Documentos",
      icon: <FileText className="size-5" />,
      route: "/documents",
    },
    {
      label: "Chats",
      icon: <Chats className="size-5" />,
      route: "/",
    },
    {
      label: "Notificaciones",
      icon: <Bell className="size-5" />,
      route: "/notifications",
    },
  ];
  const navigate = useNavigate();

  const handleNavigation = (slug: string) => {
    navigate(slug, { replace: true });
  };

  return (
    <div className="flex items-center gap-2 fixed bottom-0 w-full justify-around max-w-[600px] p-2 text-blue-950
     bg-[#f3f3f1] z-10">
      {categories.map((category) => (
        <NavLink
          to={category.route}
          key={category.route}
          className={({ isActive, isPending }) => {
            return `flex flex-col items-center gap-1 p-1 sm:p-2 opacity-60 bg-transparent hover:bg-neutral-200/50 w-full rounded-lg transition ${
              isActive ? "opacity-100" : isPending ? "pending" : ""
            }`;
          }}
        >
          {category.icon}
          <span className="text-xs">{category.label}</span>
        </NavLink>
      ))}
      <div className="absolute bottom-[64px] sm:bottom-[70px] left-0 w-full px-5">
        <button className="w-full font-medium text-white px-4 py-3 bg-blue-500 rounded-full justify-center flex items-center gap-2">
          Nuevo chat
          <ArrowRight weight="bold" className="size-5"/>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
