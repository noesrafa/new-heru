import { ShoppingCartSimple, User } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";

const Header = () => {
  const [scrollY, setScrollY] = useState(0);
  const { user } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky -top-1 z-10 transition-all ${
        scrollY > 32 ? "p-2" : ""
      } ${user?.isChatOpen ? "-translate-y-full sm:translate-y-0" : "translate-y-0"}`}
    >
      <div
        className={`flex justify-between items-center backdrop-blur-xl ${
          scrollY > 32
            ? "border-2 border-white rounded-xl bg-white/70 shadow px-3 py-2"
            : "px-5 py-3"
        }`}
      >
        <h1 className="text-2xl text-blue-600 font-medium flex items-center gap-2">
          heru
          <span className="bg-blue-100 px-1.5 py-1 text-xs rounded mt-1 flex items-center gap-1">
            Plus
          </span>
        </h1>
        <div className="flex items-center gap-4">
          <ShoppingCartSimple className="size-6 text-blue-950" weight="fill" />
          <User className="size-6 text-blue-950" weight="fill" />
        </div>
      </div>
    </div>
  );
};

export default Header;
