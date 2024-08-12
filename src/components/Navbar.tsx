import { Bell, Chats, FileText, Plus } from "@phosphor-icons/react";

const Navbar = () => {
  const categories = [
    {
      label: "Documentos",
      icon: <FileText className="size-5" />,
      slug: "documents",
    },
    {
      label: "Chats",
      icon: <Chats className="size-5" />,
      slug: "chats",
    },
    {
      label: "Notificaciones",
      icon: <Bell className="size-5" />,
      slug: "notifications",
    },
  ];
  return (
    <div className="flex items-center gap-2 fixed bottom-0 w-full justify-around max-w-[600px] p-2">
      {categories.map((category) => (
        <button
          key={category.slug}
          className="flex flex-col items-center gap-1 p-2 bg-transparent hover:bg-neutral-200/50 w-full rounded-lg transition"
        >
          {category.icon}
          <span className="text-xs">{category.label}</span>
        </button>
      ))}
      <div className="absolute bottom-20 left-0 w-full px-5">
        <button className="w-full text-white px-4 py-3 bg-blue-500 text-lg rounded-full justify-center flex items-center gap-2">
          Nuevo chat
          <Plus weight="bold" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
