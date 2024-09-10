import React from "react";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`bg-white/60 backdrop-blur-sm border border-white rounded-xl p-3 text-sm ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
