import React, { useEffect, useRef, useState } from "react";
import useBedrock from "../../../hooks/useBedrock";
import { CheckCircle, ShieldCheck } from "@phosphor-icons/react";

const ChatContent = ({ messages, lastMessageRef }) => {
  return (
    <div className="h-[calc(100%-64px)]">
      <div className="flex flex-col gap-2 mb-20 overflow-y-auto h-full">
        {messages.map((message, index) => {
          const capitalizeFirstLetter = (string: string) =>
            string?.charAt(0)?.toUpperCase() + string?.slice(1);

          if (message.role === "current-action") {
            return (
              <div
                className="text-sm mt-2 px-3 py-1 rounded-xl bg-blue-50 w-fit gap-3 flex justify-between rounded-tl-none text-blue-500 border border-blue-200"
                key={`${index}-${message.role}`}
              >
                {capitalizeFirstLetter(message.message)}
                <div className="flex items-center gap-1">
                  <div className="size-3 bg-blue-300 border border-blue-400 rounded animate-pulse-scale"></div>
                  <div className="size-3 bg-blue-300 border border-blue-400 rounded animate-pulse-scale animation-delay-200"></div>
                  <div className="size-3 bg-blue-300 border border-blue-400 rounded animate-pulse-scale animation-delay-400"></div>
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
                  className={`text-[10px] opacity-60 font-medium mb-0.5 ${
                    message.role === "assistant" ? "" : "text-right"
                  }`}
                >
                  {message.role === "assistant" ? "Heru-AI" : ""}
                </h4>
              </div>
              <p
                className={`w-fit px-2 py-2 text-sm rounded-xl ${
                  message.role === "assistant"
                    ? "rounded-tl-none text-blue-950 bg-blue-100"
                    : "rounded-br-none bg-white shadow-sm "
                }`}
              >
                {message.message}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatContent;
