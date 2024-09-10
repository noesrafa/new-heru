import React from "react";
import Navbar from "../components/Navbar";

const MainLayoutV2 = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full min-h-[100dvh] max-w-2xl mx-auto relative">
      <Navbar />
      {/* <div className="size-[300px] rounded-full bg-blue-500 fixed top-[70%] left-[0] transform -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-20"></div>
      <div className="size-[300px] rounded-full bg-white fixed top-[80%] left-[10%] transform -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-100"></div>

      <div className="size-[300px] rounded-full bg-blue-500 fixed top-[20%] left-[100%] transform -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-20"></div>
      <div className="size-[300px] rounded-full bg-white fixed top-[30%] left-[90%] transform -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-100"></div> */}


      {children}
    </div>
  );
};

export default MainLayoutV2;
