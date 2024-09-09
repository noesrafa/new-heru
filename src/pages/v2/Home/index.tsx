import { useState } from "react";
import Header from "../../../components/Header";
import MainLayoutV2 from "../../../layouts/MainLayoutV2";
import Chat from "./Chat";
import FiscalProfileOverview from "./FiscalProfileOverview";
import Checklist from "./Checklist";
import Plan from "./Plan";
import Invoices from "./Invoices";
import { Plus } from "@phosphor-icons/react";
import AddSection from "./AddSection";

const Home = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <MainLayoutV2>
      <Header />
      <div
        className={`px-3 transition-all ease-custom-ease pb-60 ${
          isChatOpen ? "opacity-40 scale-95" : "opacity-100 scale-100"
        }`}
      >
        <FiscalProfileOverview />
        <div className="sm:grid grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col gap-4">
            <Checklist />
            <img
              src="	https://web.heru.app/assets/Conoce_planes_Small_Desktop-19a58158.png"
              alt="Banner de compra suscripcion"
              className="relative h-fit-content w-full object-cover rounded-lg"
            ></img>
            <Invoices />
          </div>
          <div className="flex flex-col gap-4">
            <Plan />
            <AddSection />
          </div>
        </div>
      </div>
      <Chat isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
    </MainLayoutV2>
  );
};

export default Home;
