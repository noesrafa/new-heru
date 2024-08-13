import ChatLayout from "../layouts/ChatLayout";
import { CaretLeft, Eyeglasses } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

const messages = [
  {
    message: "Hola, ¿en qué puedo ayudarte?",
    role: "assistant",
  },
  {
    message: "Quiero saber mi saldo.",
    role: "user",
  },
  {
    message: "Claro, ¿me puedes proporcionar tu número de cuenta?",
    role: "assistant",
  },
  {
    message: "1234567890",
    role: "user",
  },
  {
    message: "Tu saldo actual es de $1,000.00",
    role: "assistant",
  },
  {
    message: "¡Gracias!",
    role: "user",
  },
  {
    message: "¿En qué más puedo ayudarte?",
    role: "assistant",
  },
  {
    message: "Tu saldo actual es de $1,000.00",
    role: "assistant",
  },
  {
    message: "¡Gracias!",
    role: "user",
  },
  {
    message: "¿En qué más puedo ayudarte?",
    role: "assistant",
  },
  {
    message: "Tu saldo actual es de $1,000.00",
    role: "assistant",
  },
  {
    message: "¡Gracias!",
    role: "user",
  },
  {
    message: "¿En qué más puedo ayudarte?",
    role: "assistant",
  },
  {
    message: "Tu saldo actual es de $1,000.00",
    role: "assistant",
  },
  {
    message: "¡Gracias!",
    role: "user",
  },
  {
    message: "¿En qué más puedo ayudarte?",
    role: "assistant",
  },
];

const Chat = () => {
  const assistant = import.meta.env.VITE_OPENAI_HERU_AI_ASSISTANT_OPERATIONS_ID;
  console.log(assistant);

  const navigate = useNavigate();

  return (
    <ChatLayout>
      <div className="flex gap-2 items-center p-3 sticky top-0 border-b border-neutral-100 bg-white/70 backdrop-blur-xl z-10">
        <button
          className="p-3 hover:bg-neutral-100 rounded-lg"
          onClick={() => navigate("/")}
        >
          <CaretLeft className="text-blue-600 size-4" weight="bold" />
        </button>
        <div className="size-10 bg-blue-200 rounded-lg flex items-center justify-center">
          <Eyeglasses weight="bold" />
        </div>
        <div className="ml-1">
          <h3 className="font-medium text-lg -mt-1">HeruConta</h3>
          <p className="text-xs text-blue-950/70 -mt-1">
            <span className="px-1 py-0.5 rounded text-[10px] bg-blue-950/70 text-white">
              AI
            </span>{" "}
            Bot
          </p>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-col gap-1 mb-20">
          {messages.map((message, index) => (
            <div
              className={`${
                message.role === "assistant" ? "" : "ml-auto"
              } gap-2 items-center`}
              key={`${index}-${message.role}`}
            >
              <div>
                <h4
                  className={`text-[10px] opacity-60 font-medium mb-0.5 ${
                    message.role === "assistant" ? "" : "text-right"
                  }`}
                >
                  {message.role === "assistant" ? "HeruConta" : ""}
                </h4>
              </div>
              <div
                className={`w-fit px-2 py-2 text-sm rounded-xl ${
                  message.role === "assistant"
                    ? "bg-white shadow-sm rounded-tl-none"
                    : "bg-blue-200 rounded-br-none text-blue-950"
                }`}
              >
                {message.message}
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 w-full fade-in">
          <div className="w-full flex items-center gap-1 max-w-[600px] mx-auto px-2 pt-2 pb-3 border-x border-t border-neutral-200 bg-[#f3f3f1] z-10">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              className="w-full px-4 py-2 rounded-lg bg-neutral-400/10"
            />
            <button className="bg-gradient-to-b from-blue-500 to-blue-600 text-white px-3 h-10 rounded-lg text-sm">
              Enviar
            </button>
          </div>
        </div>
      </div>
    </ChatLayout>
  );
};

export default Chat;
