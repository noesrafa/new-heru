import React, { useState } from "react";
import Header from "../../components/Header";
import MainLayoutV2 from "../../layouts/MainLayoutV2";
import { PaperPlaneRight } from "@phosphor-icons/react";

const Home = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <MainLayoutV2>
      <Header />
      <div className="w-full fixed bottom-0 max-w-2xl px-3 sm:px-0 shadow-sm">
        <div
          className={`bg-white/70 border-2 border-white backdrop-blur-lg w-full rounded-t-lg p-4`}
        >
          <div
            className={`overflow-hidden transition-all duration-300 ease-custom-ease w-full ${
              isChatOpen ? "h-[calc(100dvh-300px)]" : "h-0"
            }`}
          >
            chat
          </div>
          <div className="flex justify-between gap-2">
            <div className="flex flex-col gap-2">
              <h4 className="text-blue-400 uppercase text-xs -mb-2">
                Tu asistente personalizado
              </h4>
              <textarea
                onFocus={() => setIsChatOpen(true)}
                onBlur={() => setIsChatOpen(false)}
                className="text-neutral-500 bg-transparent outline-none w-full h-full resize-none min-h-[100px]"
                placeholder="Escribe tu consulta aquí"
                rows={3}
              />
            </div>

            <div>
              <button
                className={`h-8 w-8 flex items-center justify-center bg-gradient-to-b from-blue-400 to-blue-500 rounded-xl mt-3 transition-all duration-250 ease-custom-ease ${
                  isChatOpen ? "scale-100" : "scale-0"
                }`}
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
    </MainLayoutV2>
  );
};

export default Home;
