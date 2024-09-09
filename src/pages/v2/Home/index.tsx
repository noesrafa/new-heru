import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import MainLayoutV2 from "../../../layouts/MainLayoutV2";
import Chat from "./Chat";
import FiscalProfileOverview from "./FiscalProfileOverview";
import Checklist from "./Checklist";
import Plan from "./Plan";
import Invoices from "./Invoices";
import AddSection from "./AddSection";
import { useUser } from "../../../contexts/UserContext";

const Home = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { setUser } = useUser();

  const fetchTaxpayerInfo = async () => {
    const accessToken = localStorage.getItem("access_token");
    const user = JSON.parse(localStorage.getItem("user_info"));

    if (!accessToken || !user) return;

    try {
      const response = await fetch(
        `https://api2.heru.app/tax/heru-core-fiscal-read-level-service/taxpayer/users/${user.id}/taxpayers`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch taxpayer info");
      }

      const data = await response.json();

      const userInfo = localStorage.getItem("user_info");
      const UserComplete = {
        ...JSON.parse(userInfo),
        taxpayer_info: data.resource,
      };

      setUser(UserComplete);
    } catch (error) {
      console.error("Error fetching taxpayer info:", error);
    }
  };

  useEffect(() => {
    fetchTaxpayerInfo();
  }, []);
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
