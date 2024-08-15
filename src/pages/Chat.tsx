import ChatLayout from "../layouts/ChatLayout";
import {
  CaretLeft,
  Check,
  CheckCircle,
  Eyeglasses,
  Shield,
  ShieldCheck,
} from "@phosphor-icons/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useOpenAI from "../hooks/useOpenAI";
import { useEffect } from "react";
import { useRef } from "react";

const Chat = () => {
  const [userMessage, setUserMessage] = useState("");
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { createMessage, isLoading, messages } = useOpenAI();
  const navigate = useNavigate();

  const handleSendMessage = async (userMessage: string, event) => {
    event.preventDefault();
    if (!userMessage || isLoading.categorizeUserMessage) return;
    setUserMessage("");

    await createMessage({ message: userMessage });
  };

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 640px)").matches;

    if (isMobile) {
      if (lastMessageRef.current && messages.length > 5) {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [messages]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
        <div className="flex flex-col gap-2 mb-20">
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

            if (message.role === "linking-sat") {
              return (
                <div
                  ref={lastMessageRef}
                  className="fade-in-left text-sm gap-2 items-center bg-white shadow-sm border border-blue-200 rounded-xl px-3 pt-5 pb-3 my-1 max-w-[90%] sm:max-w-[70%]"
                  key={`${index}-${message.role}`}
                >
                  <div className="text-center">
                    <CheckCircle className="size-7 text-blue-500 mx-auto my-2" />
                    <h4 className="font-medium text-lg">
                      Vincula tu cuenta del SAT
                    </h4>
                    <p className="text-xs opacity-60 my-2">
                      Para obtener tu constancia, opinión de cumplimiento,
                      presentar tus declaraciones y más.
                    </p>
                  </div>
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Ingresa tu RFC"
                      className="bg-neutral-100/50 border border-neutral-200 rounded-lg px-2 py-2 w-full"
                    />
                    <input
                      type="text"
                      placeholder="Ingresa tu contraseña del SAT"
                      className="bg-neutral-100/50 border border-neutral-200 rounded-lg px-2 py-2 w-full mt-2"
                    />
                  </div>
                  <button className="bg-gradient-to-b from-blue-500 to-blue-600 text-white text-center py-2 rounded-lg w-full mt-5">
                    Vincular
                  </button>
                  <div className="bg-blue-100/80 text-blue-500 px-2 py-1 text-xs rounded-lg mt-3 flex items-center gap-2">
                    <ShieldCheck className="size-5" />
                    Tus datos están encriptados y 100% protegidos.
                  </div>
                </div>
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
                {/* {message.role === "assistant" ? (
                  <TypingText
                    text={message.message}
                    duration={50}
                    className={`w-fit px-2 py-2 text-sm rounded-xl ${
                      message.role === "assistant"
                        ? "bg-white shadow-sm rounded-tl-none"
                        : "rounded-br-none text-white bg-blue-500"
                    }`}
                  />
                ) : (
                  <p
                    className={`w-fit px-2 py-2 text-sm rounded-xl ${
                      message.role === "assistant"
                        ? "bg-white shadow-sm rounded-tl-none"
                        : "rounded-br-none text-white bg-blue-500"
                    }`}
                  >
                    {message.message}
                  </p>
                )} */}
                <p
                  className={`w-fit px-2 py-2 text-sm rounded-xl ${
                    message.role === "assistant"
                      ? "bg-white shadow-sm rounded-tl-none"
                      : "rounded-br-none text-blue-950 bg-blue-100"
                  }`}
                >
                  {message.message}
                </p>
              </div>
            );
          })}
        </div>

        <div className="fixed bottom-0 left-0 w-full fade-in">
          <form className="w-full  max-w-[600px] mx-auto px-2 pt-2 pb-3 border-x border-t border-neutral-200 bg-white z-10">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                type="text"
                placeholder="Escribe un mensaje..."
                className="w-full px-4 py-2 rounded-lg bg-neutral-400/20"
              />
              <button
                disabled={isLoading.createMessage}
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
