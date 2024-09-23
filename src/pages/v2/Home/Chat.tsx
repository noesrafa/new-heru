import {
  ArrowUp,
  CircleNotch,
  PaperPlaneTilt,
  Sparkle,
  TrashSimple,
  XCircle,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import ChatContent from "./ChatContent";
import useBedrock from "../../../hooks/useBedrock";
import { useUser } from "../../../contexts/UserContext";
import AccountantAvatar from "../../../assets/man.svg";

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

    const csf = user?.taxpayer_info?.status?.file?.file_url
      ? "#csf-id#"
      : "No disponible por ahora";

    const compliance = user?.taxpayer_info?.compliance?.file?.file_url
      ? "#compliance-id#"
      : "No disponible por ahora";
    ("No disponible por ahora");

    const regimes = user?.taxpayer_regimes
      ?.filter(
        (regime) =>
          regime.code !== null && regime.name !== null && regime.name !== ""
      )
      ?.map((regime) => regime.name)
      ?.filter((name, index, self) => self.indexOf(name) === index)
      ?.join("Regimen: ");

    const rfc = user?.taxpayer_info?.code;

    const activities = user?.taxpayer_info?.status?.economic_activities
      ?.map((activity) => activity.name)
      ?.join(", ");

    const context = `
      YOU CANT SHARE IMAGES, ONLY TEXT OR URLS
      DONT MODIFY FILES ID

      constancia: url de la constancia de situación fiscal
      compliance: url de la opinión de cumplimiento del SAT
      invoices_overview_id: si el usuario quiere ver un resumen de sus facturas
      purchase_plan_id: información sobre el plan del usuario

      <name>${user?.complete_name}</name>
      <email>${user?.email}</email>
      <phone>${user?.phone}</phone>
      <constancia>${csf}</constancia>
      <compliance>${compliance}</compliance>
      <current_date>${new Date().toLocaleDateString()}</current_date>
      <current_time>${new Date().toLocaleTimeString()}</current_time>
      <regimes>Regimen: ${regimes}</regimes>
      <rfc>${rfc}</rfc>
      <user_activities>${activities}</user_activities>
      <invoices_overview_id>#invoices-overview-id#</invoices_overview_id>
      <purchase_plan_id>#purchase-plan-id#</purchase_plan_id>
      <last_purchase_product>
        <product_name>Suscripción mensual Heru Plus para Plataformas tecnológicas</product_name>
        <product_price>$499</product_price>
        <product_adquisition_date>2024-09-01</product_adquisition_date>
        <product_renewal_date>2024-10-01</product_renewal_date>
        <discount>10%</discount>
        <discount_info>Descuento por vincular organización (Rappi)</discount_info>
      </last_purchase_product>
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
              className="disabled:opacity-40 disabled:cursor-not-allowed"
              onClick={() => setIsChatOpen(false)}
            >
              <XCircle className="size-6 text-neutral-400" weight="fill" />
            </button>
            <button
              disabled={isLoading.createMessage}
              className={`disabled:opacity-40 disabled:cursor-not-allowed`}
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
            <div className="flex items-center gap-3 mb-2">
              <img
                src={AccountantAvatar}
                alt=""
                className="size-10 bg-neutral-100 rounded-full object-cover"
              />
              <div>
                <h4 className="text-blue-950 uppercase text-xs -mb-2 font-bold">
                  César de Heru{" "}
                  {!user?.isLoading ? (
                    <div></div>
                  ) : (
                    <CircleNotch
                      className="size-3 inline-block mb-1 animate-spin"
                      weight="bold"
                    />
                  )}
                </h4>
                <p className="flex items-center gap-2 mt-2 text-xs text-green-500">
                  <div className="size-2 rounded-full bg-green-500 "></div>{" "}
                  Disponible ahora
                </p>
              </div>
            </div>
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
              className={`size-8 sm:size-8 flex items-center justify-center bg-blue-500 rounded-full mt-12 transition-all duration-250 ease-custom-ease disabled:opacity-50 disabled:cursor-not-allowed ${
                showSendButton || isChatOpen ? "scale-100" : "scale-0"
              }`}
              onClick={handleSendMessage}
            >
              <PaperPlaneTilt
                className="size-[16px] text-white mt-[1px]"
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
