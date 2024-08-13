import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

const chatsMock = [
  {
    seen: true,
    name: "Deducción de impuestos",
    message: "¿Cómo puedo deducir gastos médicos en mi declaración anual?",
  },
  {
    seen: false,
    name: "Registro en el SAT",
    message: "¿Qué documentos necesito para darme de alta en el SAT?",
  },
];

const chatsMock2 = [
  {
    seen: false,
    name: "Obtener constancia de situación fiscal",
    message: "Puedes obtener tu constancia desde el portal del SAT.",
  },
  {
    seen: false,
    name: "Duda sobre RFC",
    message: "¿Cómo puedo verificar si mi RFC está activo?",
  },
  {
    seen: false,
    name: "Pago de impuestos trimestrales",
    message:
      "¿Cuándo es la fecha límite para pagar mis impuestos del tercer trimestre?",
  },
];

const chatsMock3 = [
  {
    seen: false,
    name: "Declaración anual",
    message: "¿Qué información necesito para hacer mi declaración anual?",
  },
  {
    seen: false,
    name: "Devolución de impuestos",
    message: "¿Cuánto tiempo tarda en llegar la devolución de impuestos?",
  },
  {
    seen: false,
    name: "Deducción de colegiaturas",
    message:
      "¿Qué colegios están autorizados para la deducción de colegiaturas?",
  },
  {
    seen: true,
    name: "Obtener e.firma",
    message: "Puedes agendar una cita para obtener tu e.firma en el SAT.",
  },
  {
    seen: false,
    name: "Facturación electrónica",
    message: "¿Cómo emitir una factura electrónica correctamente?",
  },
  {
    seen: false,
    name: "Actualización de domicilio fiscal",
    message: "¿Cómo actualizo mi domicilio fiscal en el SAT?",
  },
];

const ChatsPeriod = (period) => {
  return (
    <div className="flex flex-col gap-1 px-2">
      {period.map((chat, index) => (
        <div
          key={index}
          className="relative px-4 py-3 transition text-sm  shadow-sm bg-white rounded-lg" 
        >
          <span className="absolute top-3 right-3 text-xs opacity-20">
            12:00 PM
          </span>
          <h4 className="font-medium  flex items-center gap-1.5">
            {chat.name}
            {chat.seen && (
              <div className="size-2 bg-blue-500 rounded-full"> </div>
            )}
          </h4>
          <p className="font-light opacity-40 truncate -mt-0.5">{chat.message}</p>
        </div>
      ))}
    </div>
  );
};

const Chats = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredChats, setFilteredChats] = useState({
    today: chatsMock,
    twoDaysAgo: chatsMock2,
    weekAgo: chatsMock3,
  });

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();

    const filteredToday = chatsMock.filter(
      (chat) =>
        chat.name.toLowerCase().includes(lowercasedFilter) ||
        chat.message.toLowerCase().includes(lowercasedFilter)
    );
    const filteredTwoDaysAgo = chatsMock2.filter(
      (chat) =>
        chat.name.toLowerCase().includes(lowercasedFilter) ||
        chat.message.toLowerCase().includes(lowercasedFilter)
    );
    const filteredWeekAgo = chatsMock3.filter(
      (chat) =>
        chat.name.toLowerCase().includes(lowercasedFilter) ||
        chat.message.toLowerCase().includes(lowercasedFilter)
    );

    setFilteredChats({
      today: filteredToday,
      twoDaysAgo: filteredTwoDaysAgo,
      weekAgo: filteredWeekAgo,
    });
  }, [searchTerm]);

  return (
    <MainLayout className="max-w-[600px] relative bg-gradient-to-b from-white to-[#f3f3f1] rounded-xl">

      <div className="px-3 mt-4">
        <input
          type="text"
          className="w-full px-5 py-2 rounded-lg bg-neutral-400/10 "
          placeholder="Buscar en conversaciones"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="mb-32">
        {filteredChats.today.length > 0 && (
          <>
            <h3 className="px-4 opacity-40 mt-5 mb-3 text-xs font-bold">
              Hoy
            </h3>
            {ChatsPeriod(filteredChats.today)}
          </>
        )}
        {filteredChats.twoDaysAgo.length > 0 && (
          <>
            <h3 className="px-4 opacity-40 mt-7 mb-3 text-xs font-bold">
              Hace 2 días
            </h3>
            {ChatsPeriod(filteredChats.twoDaysAgo)}
          </>
        )}
        {filteredChats.weekAgo.length > 0 && (
          <>
            {" "}
            <h3 className="px-4 opacity-40 mt-7 mb-3 text-xs font-bold">
              Hace una semana
            </h3>
            {ChatsPeriod(filteredChats.weekAgo)}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Chats;
