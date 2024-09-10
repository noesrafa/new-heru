import { DownloadSimple, SealCheck, ShareFat } from "@phosphor-icons/react";
import { useUser } from "../../../contexts/UserContext";

const FiscalProfileOverview = () => {
  const { user } = useUser();
  const userName = user?.complete_name;
  const userCode = user?.taxpayer_info?.code;
  const csf = user?.taxpayer_info?.status?.file?.file_url;
  const compliance = user?.taxpayer_info?.compliance?.file?.file_url;

  const handleDownload = (url: string) => {
    if (!url) {
      alert("No disponible por ahora");
      return;
    }
    window.open(url, "_blank");
  };

  return (
    <div className="bg-white rounded-xl px-3 py-3 mt-4 shadow-sm">
      <div className="flex justify-between items-center">
        <p className="flex gap-1 items-center text-blue-500 text-xs">
          Datos verificados
          <SealCheck weight="fill" className="size-4" />
        </p>
        <p className="flex gap-1 items-center text-blue-500 text-xs">
          Compartir
          <ShareFat weight="bold" className="size-4" />
        </p>
      </div>
      {userName ? (
        <h3 className="text font-medium mt-1">{userName}</h3>
      ) : (
        <div className="h-4 w-32 mb-1 mt-1 rounded bg-slate-200 animate-pulse"></div>
      )}
      {userCode ? (
        <h3 className="text-xs opacity-50 mb-2">{userCode}</h3>
      ) : (
        <div className="h-4 w-20 rounded bg-slate-200 animate-pulse"></div>
      )}
      <div className="opacity-50 text-sm flex gap-1 items-center mt-1">
        <button
          className="w-full flex flex-col sm:flex-row text-xs justify-center items-center gap-1  rounded-full px-1 sm:px-2 py-1"
          onClick={() => handleDownload(csf)}
        >
          <DownloadSimple className="size-4" />
          Constancia fiscal
        </button>
        <div className="w-0.5 h-6 bg-neutral-300"></div>
        <button
          className="w-full flex flex-col sm:flex-row text-xs justify-center items-center gap-1  rounded-full px-1 sm:px-2 py-1"
          onClick={() => handleDownload(compliance)}
        >
          <DownloadSimple className="size-4" />
          Opinión de cumplimiento
        </button>
      </div>
    </div>
  );
};

export default FiscalProfileOverview;
