import ChatLayout from "../layouts/ChatLayout";
import { CaretLeft, Eyeglasses } from "@phosphor-icons/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useOpenAI from "../hooks/useOpenAI";
import { useEffect } from "react";
import { useRef } from "react";

const Chat = () => {
  const [userMessage, setUserMessage] = useState("");
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const { createMessage, isLoading, messages } = useOpenAI();
  const navigate = useNavigate();

  const handleSendMessage = async (userMessage: string, event) => {
    event.preventDefault();
    if (!userMessage || isLoading.categorizeUserMessage) return;

    await createMessage({ message: userMessage });
    setUserMessage("");
  };

  console.log("MESSAGES", messages);

  useEffect(() => {
    if (lastMessageRef.current && messages.length > 1) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [messages]);

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
          {messages.map((message, index) => {
            const capitalizeFirstLetter = (string: string) =>
              string?.charAt(0)?.toUpperCase() + string?.slice(1);

            if (message.role === "current-action") {
              return (
                <p
                  className="text-sm pulse-opacity mt-2"
                  key={`${index}-${message.role}`}
                >
                  {capitalizeFirstLetter(message.message)}
                </p>
              );
            }

            return (
              <div
                ref={lastMessageRef}
                className={`fade-in-left ${
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
                      : "rounded-br-none text-white bg-blue-500"
                  }`}
                >
                  {message.message}
                </div>
              </div>
            );
          })}
        </div>

        <div className="fixed bottom-0 left-0 w-full fade-in">
          <form className="w-full  max-w-[600px] mx-auto px-2 pt-2 pb-3 border-x border-t border-neutral-200 bg-white z-10">
            <div className="flex items-center gap-2">
              <input
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                type="text"
                placeholder="Escribe un mensaje..."
                className="w-full px-4 py-2 rounded-lg bg-neutral-400/20"
              />
              <button
                disabled={isLoading.categorizeUserMessage}
                type="submit"
                onClick={(e) => handleSendMessage(userMessage, e)}
                className="bg-gradient-to-b from-blue-500 to-blue-700 text-white px-3 h-10 rounded-lg text-sm disabled:opacity-50"
              >
                Enviar
              </button>
            </div>
            <p className="opacity-50 text-center text-xs -mb-1 mt-2">
              Tiempo promedio de respuesta 1 minuto.
            </p>
          </form>
        </div>
      </div>
    </ChatLayout>
  );
};

export default Chat;
