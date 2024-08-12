import MainLayout from "../layouts/MainLayout";

const chatsMock = [
  {
    seen: true,
    name: "Comparación de planes",
    message:
      "Claro, te explico la diferencia entre heru pro y heru plus, por un lado...",
  },
  {
    seen: false,
    name: "Duda sobre sacar e firma",
    message: "Es todo por ahora gracias",
  },
  {
    seen: false,
    name: "Obtener constancia fiscal",
    message: "Puedes descargar tu constancia desde el siguiente link",
  },
];
const Chats = () => {
  return (
    <MainLayout className="max-w-[600px] relative">
      <hr />
      <div className="px-3 mt-4">
        <input
          type="text"
          className="w-full px-5 py-2 rounded-lg bg-neutral-400/10 "
          placeholder="Buscar en conversaciones"
        />
      </div>
      <div className="flex flex-col">
        {chatsMock.map((chat, index) => (
          <div
            key={index}
            className="relative border-b border-neutral-200 px-4 py-3"
          >
            <span className="absolute top-3 right-3 text-xs opacity-20">
              12:00 PM
            </span>
            <h4 className="font-medium text-lg flex items-center gap-1.5">
              {chat.name}
              {chat.seen && (
                <div className="size-2 bg-blue-500 rounded-full"> </div>
              )}
            </h4>
            <p className="font-light opacity-40 truncate">{chat.message}</p>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default Chats;
