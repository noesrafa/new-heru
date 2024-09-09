import { CheckCircle, Circle } from "@phosphor-icons/react";
import React from "react";

const CheckListItems = [
  {
    label: "Vincula tu cuenta del SAT",
    isCompleted: true,
  },
  {
    label: "Comparte tu perfil fiscal",
    isCompleted: false,
  },
  {
    label: "Haz una consulta",
    isCompleted: false,
  },
  {
    label: "Descarga tus documentos",
    isCompleted: false,
  },
];

const Checklist = () => {
  return (
    <div className="w-full bg-white/50 border border-white rounded-xl p-3 shadow-sm flex flex-col gap-1 h-fit text-sm">
      {CheckListItems.map((item) => (
        <div className="flex items-center gap-3">
          <div className="text">
            {item.isCompleted ? (
              <CheckCircle className="size-5 text-blue-500" weight="fill" />
            ) : (
              <Circle
                className="size-5 opacity-60 text-neutral-400"
                weight="bold"
              />
            )}
          </div>
          <span
            className={`${item.isCompleted ? "line-through opacity-60" : "hover:underline cursor-pointer"}`}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Checklist;
