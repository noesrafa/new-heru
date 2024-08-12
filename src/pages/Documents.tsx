import {
  CheckFat,
  SealCheck,
  Share,
  ShareFat,
  UserCheck,
} from "@phosphor-icons/react";
import MainLayout from "../layouts/MainLayout";

const Documents = () => {
  return (
    <MainLayout className="bg-gradient-to-b from-white to-[#f3f3f1]">
      <div className="p-4">
        <p className="text-xs opacity-50 mt-4">ACTUALIZADO 10 AGOSTO 2023</p>
        <h3 className="text-xl font-bold">Mis documentos fiscales</h3>

        <div className="bg-white rounded-xl px-3 py-5 mt-4 shadow-sm">
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
          <h3 className="text-lg font-medium mt-1">Vicente Fernández</h3>
          <h3 className="text-xs opacity-50">TECR000919DN5</h3>
        </div>

        <div className="flex justify-between gap-2 mt-2 text-center">
          <div className="bg-white rounded-xl p-3 flex flex-col gap-1 items-center text-sm w-full">
            <CheckFat className="size-6 text-blue-500 mt-2" />
            Opinión de cumplimiento
            <button className="text-blue-500 w-full py-1 rounded-full bg-blue-100 mt-2">
              Descargar
            </button>
          </div>
          <div className="bg-white rounded-xl p-3 flex flex-col gap-1 items-center text-sm w-full">
            <UserCheck className="size-6 text-blue-500 mt-2" />
            Constancia de situación fiscal
            <button className="text-blue-500 w-full py-1 rounded-full bg-blue-100 mt-2">
              Descargar
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3 flex flex-col gap-1 items-center text-sm w-full mt-2">
          <p>Mis facturas este mes</p>
          <div className="flex items-center justify-between gap-2 w-full">
            <div className="flex items-center flex-col w-full">
              <p className="text-lg">12</p>
              <p>Emitidas</p>
              <p className="opacity-50">$1,200.00</p>
            </div>

            <div className="h-14 bg-neutral-200 w-[1px]"></div>

            <div className="flex items-center flex-col w-full">
              <p className="text-lg">4</p>
              <p>Recibidas</p>
              <p className="opacity-50">$3,200.00</p>
            </div>
          </div>

          <button className="rounded-full w-full border border-blue-300 text-sm text-blue-400 mt-2 py-1">
            Ver todas
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Documents;
