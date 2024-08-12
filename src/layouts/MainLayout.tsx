import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const MainLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`max-w-[600px] relative mx-auto border-x border-neutral-200 min-h-screen ${className}`}
    >
      <Header />
      <div>{children}</div>
      <Navbar />
    </div>
  );
};
export default MainLayout;
