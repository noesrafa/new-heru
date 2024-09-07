import { PaperPlaneRight, Sparkle, X } from "@phosphor-icons/react";
import React, { useEffect, useRef, useState } from "react";
import ChatContent from "./ChatContent";
import useBedrock from "../../../hooks/useBedrock";

const Chat = ({ isChatOpen, setIsChatOpen }) => {
  const [userMessage, setUserMessage] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const { createMessage, isLoading, messages } = useBedrock();

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (!userMessage || !sessionId) return;
    setUserMessage("");

    await createMessage(userMessage, sessionId);
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
    // generate random sessionId
    const sessionId = Math.random().toString(36).substring(2, 15);
    setSessionId(sessionId);
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSendMessage(event);
      }
    };

    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [userMessage, sessionId]);

  return (
    <div className="w-full fixed bottom-0 max-w-2xl px-3 sm:px-0 shadow-sm">
      <div
        className={`bg-white/70 border-2 border-white backdrop-blur-lg w-full rounded-t-lg p-4`}
      >
        {/* ========= CHAT ========== */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-custom-ease w-full ${
            isChatOpen ? "h-[calc(100dvh-250px)] sm:h-[calc(100dvh-300px)] mb-3" : "h-0"
          }`}
        >
          <div className="">
            <button
              className="bg-neutral-400/80 rounded-full p-1"
              onClick={() => setIsChatOpen(false)}
            >
              <X className="size-3 text-neutral-100" weight="bold" />
            </button>
          </div>
          <ChatContent messages={messages} lastMessageRef={lastMessageRef} />
        </div>

        {/* =========== INPUT ============ */}
        <div className="flex justify-between gap-2">
          <div className="flex flex-col gap-2 w-full">
            <h4 className="text-blue-400 uppercase text-xs -mb-2">
              Heru AI{" "}
              <Sparkle className="size-3 inline-block mb-1" weight="bold" />
            </h4>
            <textarea
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onFocus={() => setIsChatOpen(true)}
              className="text-neutral-500 bg-transparent outline-none w-full h-full resize-none min-h-[80px]"
              placeholder="Escribe tu consulta fiscal aquí"
              rows={3}
            />
          </div>

          <div>
            <button
              className={`h-8 w-8 flex items-center justify-center bg-gradient-to-b from-blue-400 to-blue-500 rounded-xl mt-3 transition-all duration-250 ease-custom-ease ${
                isChatOpen ? "scale-100" : "scale-0"
              }`}
              onClick={handleSendMessage}
            >
              <PaperPlaneRight
                className="size-[18px] text-white/80"
                weight="fill"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
