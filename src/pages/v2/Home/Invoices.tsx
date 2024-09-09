import React from "react";

const Invoices = () => {
  return (
    <div className="bg-white/50 border border-white rounded-xl p-3 flex flex-col gap-1 items-center text-sm w-full">
      <h4 className="text-sm font-medium opacity-50">Julio 2024</h4>
      <div className="flex items-center justify-between gap-2 w-full">
        <div className="flex items-center flex-col w-full">
          <p className="text-lg font-bold">12</p>
          <p>Facturas emitidas</p>
          <p className="opacity-50">$1,200.00</p>
        </div>

        <div className="h-14 bg-neutral-200 w-[1px]"></div>
        <div className="flex items-center flex-col w-full">
          <p className="text-lg font-bold">4</p>
          <p>Facturas recibidas</p>
          <p className="opacity-50">$3,200.00</p>
        </div>
      </div>

      <button className="rounded-full w-full border border-blue-400 text-sm text-blue-500 mt-2 py-1">
        Ver más
      </button>
    </div>
  );
};

export default Invoices;
