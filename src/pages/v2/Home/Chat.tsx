import {
  ArrowUp,
  CircleNotch,
  Sparkle,
  TrashSimple,
  XCircle,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import ChatContent from "./ChatContent";
import useBedrock from "../../../hooks/useBedrock";
import { useUser } from "../../../contexts/UserContext";

const Chat = ({ isChatOpen, setIsChatOpen }) => {
  const [userMessage, setUserMessage] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const [showSendButton, setShowSendButton] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { user } = useUser();

  const { createMessage, isLoading, messages, setMessagesHistory } =
    useBedrock();

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (!userMessage || !sessionId || isLoading.createMessage || !user) return;
    setUserMessage("");

    const csf =
      user?.taxpayer_info?.status?.file?.file_url || "No disponible por ahora";
    const compliance =
      user?.taxpayer_info?.compliance?.file?.file_url ||
      "No disponible por ahora";
    const regimes = user?.taxpayer_regimes
      ?.filter(
        (regime) =>
          regime.code !== null && regime.name !== null && regime.name !== ""
      )
      ?.map((regime) => regime.name)
      ?.filter((name, index, self) => self.indexOf(name) === index)
      ?.join(", ");

    const rfc = user?.taxpayer_info?.code;

    const activities = user?.taxpayer_info?.status?.economic_activities
      ?.map((activity) => activity.name)
      ?.join(", ");

    const context = `
      constancia: es la constancia de situación fiscal
      compliance: es la opinión de cumplimiento del SAT

      <name>${user?.complete_name}</name>
      <email>${user?.email}</email>
      <phone>${user?.phone}</phone>
      <constancia>${csf}</constancia>
      <compliance>${compliance}</compliance>
      <current_date>${new Date().toLocaleDateString()}</current_date>
      <current_time>${new Date().toLocaleTimeString()}</current_time>
      <regimes>${regimes}</regimes>
      <rfc>${rfc}</rfc>
      <user_activities>${activities}</user_activities>
    `;

    console.log("CONTEXT", context);

    await createMessage(userMessage, sessionId, context);
  };

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 640px)").matches;

    if (false) {
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

  const generateSessionId = () => Math.random().toString(36).substring(2, 15);

  useEffect(() => {
    const sessionId = generateSessionId();
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

  const handleClearChat = () => {
    if (isLoading.createMessage) return;

    setUserMessage("");
    setSessionId(generateSessionId());
    setMessagesHistory([]);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (messages.length === 0) setIsChatOpen(false);
    if (messages.length > 0) setIsChatOpen(true);
  }, [messages]);

  useEffect(() => {
    if (isChatOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isChatOpen]);

  return (
    <div className="w-full fixed bottom-0 max-w-2xl px-3 sm:px-0 shadow-sm fade-in z-20">
      <div
        className={`${
          user?.isChatOpen ? "bg-white/70" : "bg-white/90"
        } border-2 border-white backdrop-blur-xl w-full rounded-t-lg p-3 sm:p-4 shadow-inverse`}
      >
        {/* ========= CHAT ========== */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-custom-ease w-full ${
            isChatOpen
              ? "h-[calc(100dvh-160px)] sm:h-[calc(100dvh-300px)] mb-3"
              : "h-0"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <button
              disabled={isLoading.createMessage}
              className="disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setIsChatOpen(false)}
            >
              <XCircle className="size-6 text-neutral-400" weight="fill" />
            </button>
            <button
              disabled={isLoading.createMessage}
              className={`disabled:opacity-50 disabled:cursor-not-allowed`}
              onClick={handleClearChat}
            >
              <TrashSimple className="size-5 text-neutral-400" weight="bold" />
            </button>
          </div>
          <ChatContent messages={messages} lastMessageRef={lastMessageRef} />
        </div>

        {/* =========== INPUT ============ */}
        <div className="flex justify-between gap-2">
          <div className="flex flex-col gap-2 w-full">
            <h4 className="text-blue-500 uppercase text-xs -mb-2 font-bold">
              Heru AI{" "}
              {!user?.isLoading ? (
                <Sparkle className="size-3 inline-block mb-1" weight="fill" />
              ) : (
                <CircleNotch
                  className="size-3 inline-block mb-1 animate-spin"
                  weight="bold"
                />
              )}
            </h4>
            <textarea
              ref={inputRef}
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onFocus={() => {
                messages.length > 0 && setIsChatOpen(true);
                setShowSendButton(true);
              }}
              onBlur={() => setShowSendButton(false)}
              className="text-neutral-500 bg-transparent outline-none w-full h-full resize-none min-h-[90px]"
              placeholder="Escribe tu consulta aquí"
              rows={3}
            />
          </div>

          <div>
            <button
              disabled={isLoading.createMessage}
              className={`size-6 sm:size-7 flex items-center justify-center bg-blue-500 rounded-full mt-3 transition-all duration-250 ease-custom-ease disabled:opacity-50 disabled:cursor-not-allowed ${
                showSendButton || isChatOpen ? "scale-100" : "scale-0"
              }`}
              onClick={handleSendMessage}
            >
              <ArrowUp className="size-[18px] text-white" weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
