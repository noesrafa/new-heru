import { SealCheck, ShareFat } from "@phosphor-icons/react";
import React from "react";

const FiscalProfileOverview = () => {
  return (
    <div className="bg-white rounded-xl px-3 py-3 mt-4 shadow-sm">
      <div className="flex justify-between items-center">
        <p className="flex gap-1 items-center text-blue-400 text-xs">
          Datos verificados
          <SealCheck weight="fill" className="size-4" />
        </p>
        <p className="flex gap-1 items-center text-blue-400 text-xs">
          Compartir
          <ShareFat weight="bold" className="size-4" />
        </p>
      </div>
      <h3 className="text font-medium mt-1">Vicente Fernández</h3>
      <h3 className="text-xs opacity-50">TECR000919DN5</h3>
    </div>
  );
};

export default FiscalProfileOverview;
