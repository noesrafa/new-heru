import React from "react";
import Navbar from "../components/v2/Navbar";

const MainLayoutV2 = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full min-h-[100dvh] max-w-2xl mx-auto relative">
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayoutV2;
