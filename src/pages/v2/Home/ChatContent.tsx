import { CheckCircle, ShieldCheck } from "@phosphor-icons/react";
import { useUser } from "../../../contexts/UserContext";
import Invoices from "./Invoices";
import Plan from "./Plan";

const ChatContent = ({ messages, lastMessageRef }) => {
  const { user } = useUser();

  const csf =
    user?.taxpayer_info?.status?.file?.file_url || "No disponible por ahora";
  const compliance =
    user?.taxpayer_info?.compliance?.file?.file_url ||
    "No disponible por ahora";

  const replaceUrlWithLink = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
    const csfIdRegex = /#csf-id#/g;
    const complianceIdRegex = /#compliance-id#/g;
    const heruAcuseRegex = /www\.heru\.com\/acuses\/[^\s]+/g;

    if (text.includes("www.heru.com/acuses/")) {
      let processedText = text.replace(heruAcuseRegex, (url) => {
        console.log("url", url);

        return `<a href="https://d15k0l3mi8k562.cloudfront.net/PLATEC_TAX_RETURN%2F2023%2F5%2F104a3e7e-7d80-45af-84a4-39c04260a0dc.pdf" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">[Descargar acuse]</a>`;
      });

      return processedText;
    }

    // Reemplazo de URLs generales
    let processedText = text.replace(urlRegex, (url) => {
      const href = url.startsWith("www.") ? `https://${url}` : url;
      return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">${url}</a>`;
    });

    // Reemplazo del CSF
    processedText = processedText.replace(
      csfIdRegex,
      `<a href="${csf}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">[Descargar constancia de situación fiscal]</a>`
    );

    processedText = processedText.replace(
      complianceIdRegex,
      `<a href="${compliance}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">[Descargar opinión de cumplimiento]</a>`
    );

    console.log("processedText", processedText);

    return processedText;
  };

  const renderMessage = (message: string) => {
    if (message.includes("#invoices-overview-id#")) {
      return (
        <div className="mb-1 mx-1">
          <p className="text-sm text-blue-950 mb-2">
            Aquí puedes ver un resumen de tu facturación:
          </p>
          <div className="shadow rounded-xl max-w-xs">
            <Invoices />
          </div>
        </div>
      );
    }

    if (message.includes("#purchase-plan-id#")) {
      return (
        <div className="mb-1 mx-1">
          <p className="text-sm text-blue-950 mb-2">
            Aquí puedes ver más información sobre tu plan activo:
          </p>
          <div className="shadow rounded-xl max-w-xs">
            <Plan />
          </div>
        </div>
      );
    }

    // Corrección del uso de dangerouslySetInnerHTML
    const processedMessage = replaceUrlWithLink(message);
    return <div dangerouslySetInnerHTML={{ __html: processedMessage }} />;
  };
  return (
    <div className="h-[calc(100%-64px)]">
      <div className="flex flex-col gap-2 mb-20 overflow-y-auto h-full">
        {messages.map((message, index) => {
          const capitalizeFirstLetter = (string: string) =>
            string?.charAt(0)?.toUpperCase() + string?.slice(1);

          if (message.role === "current-action") {
            return (
              <div
                className="text-sm mt-2 rounded-xl  w-fit gap-2 flex justify-between rounded-tl-none text-blue-500 "
                key={`${index}-${message.role}`}
              >
                {capitalizeFirstLetter(message.message)}
                <div className="flex items-center gap-1 mt-0.5">
                  <div className="size-2 bg-blue-400 border border-blue-500 rounded-full animate-pulse-scale"></div>
                  <div className="size-2 bg-blue-400 border border-blue-500 rounded-full animate-pulse-scale animation-delay-200"></div>
                  <div className="size-2 bg-blue-400 border border-blue-500 rounded-full animate-pulse-scale animation-delay-400"></div>
                </div>
              </div>
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
                  className={`text-[10px] opacity-30 font-bold mb-0.5 text-blue-950 ${
                    message.role === "assistant" ? "" : "text-right"
                  }`}
                >
                  {message.role === "assistant" ? "Heru-AI" : ""}
                </h4>
              </div>
              <p
                className={`w-fit text-sm rounded-xl ${
                  message.role === "assistant"
                    ? "rounded-tl-none text-blue-950 "
                    : "rounded-br-none bg-blue-100 px-2 py-2"
                }`}
              >
                {renderMessage(message.message)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatContent;
