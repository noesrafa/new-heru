import { CaretRight, Check, CheckCircle, Trophy } from "@phosphor-icons/react";

const benefits = [
  "Acceso a Heru AI",
  "Soporte fiscal",
  "Deducciones con inteligencia artificial",
  "Análisis de facturas",
];

const Plan = () => {
  return (
    <div className="bg-white/50 border border-white rounded-xl shadow-sm flex flex-col overflow-hidden relative">
      <div className="flex items-center gap-2 bg-blue-100 px-2 py-1 w-fit absolute top-3 left-3 rounded-full">
        <Trophy weight="duotone" />
        <p className="flex gap-2 items-center text-blue-950 text-xs leading-[18px] font-medium undefined undefined">
          Tu suscripción
        </p>
      </div>
      <img
        src="https://heru-static-assets.s3.us-east-2.amazonaws.com/plans_regularization.webp"
        alt="imag"
      />
      <div className="p-3">
        <h3 className="font-bold text-base">Heru Plus</h3>
        <p className="text-sm opacity-50 mb-2">$599 / Mensual</p>
        <hr />
        <ul className="flex flex-col gap-1 mt-3 text-sm">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-2">
              <Check className="size-3 text-blue-500" weight="bold" />
              {benefit}
            </li>
          ))}
        </ul>
        {/* <button className="text-blue-500 mt-4 border border-blue-500 rounded-full w-full justify-center px-3 py-1 text-sm font-normal flex items-center gap-1">
          Ver todos los planes
          <CaretRight />
        </button> */}
      </div>
    </div>
  );
};

export default Plan;
