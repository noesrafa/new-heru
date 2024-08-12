import { User } from "@phosphor-icons/react";

const Header = () => {
  return (
    <div className="flex justify-between items-center px-5 py-3">
      <h1 className="text-2xl text-blue-500 font-medium flex items-center gap-2">
        heru
        <span className="bg-blue-100 px-1.5 py-1 text-xs rounded mt-1 flex items-center gap-1">
          Plus
        </span>
      </h1>
      <User className="size-6 text-blue-950" weight="fill" />
    </div>
  );
};

export default Header;
