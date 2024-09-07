import { useState } from "react";
import Header from "../../../components/Header";
import MainLayoutV2 from "../../../layouts/MainLayoutV2";
import Chat from "./Chat";
import FiscalProfileOverview from "./FiscalProfileOverview";

const Home = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <MainLayoutV2>
      <Header />
      <div
        className={`px-3 transition-all ease-custom-ease  ${
          isChatOpen ? "opacity-20 scale-95" : "opacity-100 scale-100"
        }`}
      >
        <FiscalProfileOverview />
      </div>
      <Chat isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
    </MainLayoutV2>
  );
};

export default Home;
