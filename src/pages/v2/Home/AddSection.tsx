import { Plus } from "@phosphor-icons/react";

const AddSection = () => {
  return (
    <button className="border-dashed border-2 border-neutral-200 rounded-xl p-3 h-32 flex items-center justify-center text-neutral-400 text-sm gap-1 hover:border-blue-500 transition-all cursor-pointer hover:border hover:text-blue-500 hover:bg-blue-300/10">
      Agregar sección
      <Plus weight="bold" className="size-3" />
    </button>
  );
};

export default AddSection;
