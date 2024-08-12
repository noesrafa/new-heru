import React from "react";
import MainLayout from "../layouts/MainLayout";
import { Clock, ListChecks } from "@phosphor-icons/react";

const notificationsData = {
  today: [
    {
      title:
        "Tu declaración mensual de agosto ha sido presentada exitosamente.",
      time: "Hace 1 hora",
    },
    {
      title: "Tu solicitud de devolución de IVA ha sido aprobada.",
      time: "Hace 3 horas",
    },
    {
      title:
        "Recordatorio: Tienes hasta el 17 de agosto para presentar el pago provisional de ISR.",
      time: "Hace 4 horas",
    },
  ],
  yesterday: [
    {
      title:
        "El SAT ha confirmado la recepción de tu declaración informativa de operaciones con terceros.",
      time: "Ayer",
    },
    {
      title:
        "Nueva actualización en los lineamientos para el registro de facturas electrónicas.",
      time: "Ayer",
    },
    {
      title: "Tu aviso de compensación de saldos ha sido recibido.",
      time: "Ayer",
    },
  ],
};
import { useState } from "react";

const NotificationItem = ({ title, time, isYesterday }) => (
  <div
    className={`bg-white shadow-sm rounded-xl flex items-center gap-3 mt-2 p-3 ${
      isYesterday ? "text-gray-400" : ""
    }`}
  >
    <div
      className={`min-w-10 min-h-10 size-10 rounded-lg flex items-center justify-center ${
        isYesterday ? "bg-neutral-100" : "bg-blue-500"
      }`}
    >
      <ListChecks
        weight="fill"
        className={`min-w-7 min-h-7 ${
          isYesterday ? "text-neutral-400" : "text-blue-100"
        }`}
      />
    </div>
    <div>
      <p
        className={`font-medium text-sm ${
          isYesterday ? "text-neutral-700" : ""
        }`}
      >
        {title}
      </p>
      <p
        className={`flex items-center gap-1 text-xs mt-2 ${
          isYesterday ? "text-gray-400" : "text-blue-500"
        }`}
      >
        <Clock weight="fill" className="size-4" /> {time}
      </p>
    </div>
  </div>
);

const Notifications = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTodayNotifications = notificationsData.today.filter(
    (notification) =>
      notification.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredYesterdayNotifications = notificationsData.yesterday.filter(
    (notification) =>
      notification.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout className="bg-gradient-to-b from-white to-[#f3f3f1]">
      <div className="p-4 mb-32">
        <p className="text-xs opacity-50 mt-4">ACTUALIZADO 10 AGOSTO 2023</p>
        <h3 className="text-xl font-bold">Notificaciones</h3>
        <input
          type="text"
          className="w-full px-5 py-2 rounded-lg bg-neutral-400/10 mt-2"
          placeholder="Buscar en notificaciones"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <h3 className="opacity-40 mt-5 text-xs font-bold">Hoy</h3>
        {filteredTodayNotifications.map((notification, index) => (
          <NotificationItem
            key={`today-${index}`}
            {...notification}
            isYesterday={false}
          />
        ))}

        <h3 className="opacity-40 mt-5 text-xs font-bold">Ayer</h3>
        {filteredYesterdayNotifications.map((notification, index) => (
          <NotificationItem
            key={`yesterday-${index}`}
            {...notification}
            isYesterday={true}
          />
        ))}
      </div>
    </MainLayout>
  );
};

export default Notifications;
