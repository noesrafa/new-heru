import React from "react";
import Navbar from "../components/Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-2xl mx-auto border-x border-neutral-300 min-h-screen">
      <Navbar />
      {children}
    </div>
  );
};
export default MainLayout;
