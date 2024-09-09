import { Check, CheckCircle } from "@phosphor-icons/react";

const benefits = [
  "Acceso a Heru AI",
  "Soporte fiscal",
  "Deducciones con inteligencia artificial",
];

const Plan = () => {
  return (
    <div className="bg-white/50 border border-blue-100 rounded-xl shadow-sm flex flex-col overflow-hidden">
      <h3 className="bg-blue-500 text-white px-3 py-1 text-xs flex justify-between font-medium">
        PROMOCIÓN
        <span>50% OFF</span>
      </h3>
      <div className="p-3">
        <div className="flex justify-between mb-2">
          <h3 className="font-bold text-base">Declaración <br /> anual 2023</h3>
          <div className="font-bold flex flex-col items-end">
            <p className="opacity-50 line-through text-sm">$399</p>
            <p className="-mt-1 text-base">$199 / mes</p>
          </div>
        </div>
        <hr className="" />
        <ul className="flex flex-col gap-1 mt-3">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-2">
              <Check className="size-3 text-blue-500" weight="bold" />
              {benefit}
            </li>
          ))}
        </ul>
        <button className="bg-blue-500 text-white px-3 py-1 rounded-full w-full mt-3">
          Contratar
        </button>
      </div>
    </div>
  );
};

export default Plan;
