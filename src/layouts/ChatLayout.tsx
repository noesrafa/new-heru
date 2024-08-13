const ChatLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`max-w-[600px] relative mx-auto border-x border-neutral-200 min-h-screen ${className} bg-gradient-to-t from-white to-[#f3f3f1]`}
    >
      {children}
    </div>
  );
};

export default ChatLayout;
