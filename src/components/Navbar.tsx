import { Bell, Chats, FileText, Plus, Sparkle } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

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
    <div className="flex items-center gap-2 fixed bottom-0 w-full justify-around max-w-[600px] p-2 text-blue-950">
      {categories.map((category) => (
        <button
          onClick={() => handleNavigation(category.route)}
          key={category.route}
          className="flex flex-col items-center gap-1 p-2 bg-transparent hover:bg-neutral-200/50 w-full rounded-lg transition"
        >
          {category.icon}
          <span className="text-xs">{category.label}</span>
        </button>
      ))}
      <div className="absolute bottom-[70px] left-0 w-full px-5">
        <button className="w-full text-white px-4 py-3 bg-blue-500 rounded-full justify-center flex items-center gap-2">
          Nuevo chat
          <Sparkle weight="fill" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
