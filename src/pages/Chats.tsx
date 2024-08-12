const chatsMock = [
  {
    name: "Comparación de planes",
    message:
      "Claro, te explico la diferencia entre heru pro y heru plus, por un lado",
  },
  {
    name: "Duda sobre sacar e firma",
    message: "Es todo por ahora gracias",
  },
  {
    name: "Obtener constancia fiscal",
    message:
      "Puedes descargar tu constancia desde el siguiente link [DESCARGAR]",
  },
];
const Chats = () => {
  return (
    <div className="max-w-[600px] relative">
      <div className="flex flex-col">
        {chatsMock.map((chat, index) => (
          <div key={index} className="relative border-b border-neutral-200 px-4 py-4">
            <span className="absolute top-3 right-3 text-xs opacity-20">12:00 PM</span>
            <h4 className="font-medium text-lg">{chat.name}</h4>
            <p className="font-light opacity-50">{chat.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chats;
