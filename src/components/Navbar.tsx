import { Gear, Sparkle, User } from "@phosphor-icons/react";

const Navbar = () => {
  return (
    <div className="border-b border-neutral-200 flex justify-between items-center p-3">
      <h1 className="text-4xl text-blue-500 font-medium flex items-center gap-2">
        heru
        <span className="bg-blue-100 px-2 py-1.5 text-xs rounded mt-1.5 flex items-center gap-1">
          Plus 
          <User weight="fill" className="size-3"/>
        </span>
      </h1>
      <Gear className="size-8 text-neutral-600" weight="light" />
    </div>
  )
};

export default Navbar;
