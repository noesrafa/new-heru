import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[600px] relative mx-auto border-x border-neutral-300 min-h-screen">
      <Header />
      <div>{children}</div>
      <Navbar />
    </div>
  );
};
export default MainLayout;
