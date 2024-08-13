import { User } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

const Header = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`sticky -top-1 z-10 transition-all ${scrollY > 32 ? "p-2" : ""}`}>
      <div className={`flex justify-between items-center px-5 py-3  bg-white/50 backdrop-blur-lg ${
        scrollY > 32 ? "border border-neutral-300 rounded-lg" : ""
      }`}>
        <h1 className="text-2xl text-blue-600 font-medium flex items-center gap-2">
          heru
          <span className="bg-blue-100 px-1.5 py-1 text-xs rounded mt-1 flex items-center gap-1">
            Plus
          </span>
        </h1>
        <User className="size-6 text-blue-950" weight="fill" />
      </div>
    </div>
  );
};

export default Header;
