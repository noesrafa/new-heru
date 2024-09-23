import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import MainLayoutV2 from "../../../layouts/MainLayoutV2";
import Chat from "./Chat";
import FiscalProfileOverview from "./FiscalProfileOverview";
import Checklist from "./Checklist";
import Plan from "./Plan";
import Invoices from "./Invoices";
import AddSection from "./AddSection";
import { User, useUser } from "../../../contexts/UserContext";
import Deductibles from "./Deductibles";

const Home = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { user, setUser } = useUser();

  const fetchTaxpayerRegimes = async () => {
    const accessToken = localStorage.getItem("access_token");
    const userInfoLocal = JSON.parse(localStorage.getItem("user_info"));

    if (!accessToken || !userInfoLocal) {
      console.error("Access token or user info not found");
      return;
    }

    try {
      const response = await fetch(
        "https://api2.heru.app/tax/fiscal-profile/taxpayer/regimes",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch taxpayer regimes");
      }

      const data = await response.json();
      return data.resource;
    } catch (error) {
      console.error("Error fetching taxpayer regimes:", error);
    }
  };

  const fetchTaxpayerInfo = async () => {
    setUser((prev) => ({ ...prev, isLoading: true }));
    const accessToken = localStorage.getItem("access_token");
    const userInfoLocal = JSON.parse(localStorage.getItem("user_info"));

    console.log(userInfoLocal);

    if (!accessToken || !userInfoLocal) return;

    try {
      const response = await fetch(
        `https://api2.heru.app/tax/heru-core-fiscal-read-level-service/taxpayer/users/${userInfoLocal.id}/taxpayers`,
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

      const regimes = await fetchTaxpayerRegimes();

      const userComplete: User = {
        ...userInfoLocal,
        taxpayer_info: data.resource,
        taxpayer_regimes: regimes,
        isLoading: false,
      };

      setUser((prev) => ({ ...prev, ...userComplete }));
    } catch (error) {
      console.error("Error fetching taxpayer info:", error);
    } finally {
      setUser((prev) => ({ ...prev, isLoading: false }));
    }
  };

  console.log("USER", user);

  useEffect(() => {
    fetchTaxpayerInfo();
  }, []);

  useEffect(() => {
    setUser((prev) => ({ ...prev, isChatOpen }));
  }, [isChatOpen]);

  return (
    <MainLayoutV2>
      <Header />
      <div
        className={`px-3 transition-all ease-custom-ease pb-60 ${
          isChatOpen ? "opacity-40 scale-95" : "opacity-100 scale-100"
        }`}
      >
        <FiscalProfileOverview />
        <div className="flex flex-col sm:grid grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col gap-4">
            <Checklist />
            <img
              src="https://web.heru.app/assets/Conoce_planes_Small_Desktop-19a58158.png"
              alt="Banner de compra suscripcion"
              className="relative h-fit-content w-full object-cover rounded-lg"
            ></img>
            <Invoices />
            <Deductibles />
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
