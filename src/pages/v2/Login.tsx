import { CaretRight, SealCheck } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [otp, setOtp] = useState("");

  const cellphoneRef = useRef<HTMLInputElement>(null);
  const otpRef = useRef<HTMLInputElement>(null);
  const formPhoneRef = useRef<HTMLFormElement>(null);
  const formOTPRef = useRef<HTMLFormElement>(null);

  const sendOTP = (e: React.FormEvent<HTMLFormElement>) => {
    if (!phone) return;
    e.preventDefault();
    setIsLoading(true);
    fetch("https://api2.heru.app/signin/send-otp?platform=android", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        send_by: "sms",
        cellphone: phone,
        country_code: "+52",
        heru_pal: false,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setStep("otp");
        otpRef.current?.focus();
      })
      .catch((error) => {
        alert("Hubo un error, intenta de nuevo");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const verifyOTP = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    fetch("https://api2.heru.app/signin/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: otp,
        cellphone: phone,
        country_code: "+52",
        acquisition_channel_id: 5,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        const data = response.resource;

        const token = data.access_token.access_token;
        const refreshToken = data.refresh_token.refresh_token;

        localStorage.setItem("access_token", token);
        localStorage.setItem("refresh_token", refreshToken);

        const userInfo = {
          id: data.id,
          complete_name: `${data.first_name} ${data.father_surname}`,
          email: data.email,
          phone: data.cellphone,
          country_code: data.country_code,
        };

        localStorage.setItem("user_info", JSON.stringify(userInfo));

        setIsLoading(false);
        window.location.reload();
      })
      .catch((error) => {
        alert("Hubo un error, intenta de nuevo");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    cellphoneRef.current?.focus();
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <div className="flex flex-col items-center justify-center gap-2 bg-white/80 px-6 py-8 rounded-xl">
        <h1 className="text-4xl font-medium text-center text-blue-500 z-10">
          heru
        </h1>
        <h4 className="text-lg sm:text-2xl text-center opacity-70 z-10 text-neutral-500 font-light">
          Tus impuestos sin complicaciones{" "}
          <SealCheck className="inline-block" />
        </h4>

        {step === "phone" && (
          <form
            className="max-w-[400px] mt-6 mx-auto relative z-10 w-full flex gap-2 flex-col"
            onSubmit={sendOTP}
            ref={formPhoneRef}
          >
            <input
              type="tel"
              placeholder="Número de teléfono"
              className="p-2 rounded-xl  text-center bg-white border border-neutral-200 w-full h-12"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              ref={cellphoneRef}
            />
            <button
              disabled={isLoading}
              type="submit"
              className="bg-blue-50 disabled:opacity-50 text-blue-500 flex gap-1 h-12 items-center justify-center rounded-xl border-2 border-white/50 text-nowrap px-3 py-2 border-blue-300"
            >
              {isLoading ? "Enviando" : "Enviar"}
              <CaretRight className="inline-block" weight="bold" />
            </button>
          </form>
        )}
        {step === "otp" && (
          <form
            className="max-w-[400px] mt-6 mx-auto relative z-10 w-full flex gap-2 flex-col"
            onSubmit={verifyOTP}
            ref={formOTPRef}
          >
            <input
              type="text"
              placeholder="Código de verificación"
              className="p-2 rounded-xl  text-center bg-white border border-neutral-200 w-full h-12"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              ref={otpRef}
            />

            <button
              disabled={isLoading}
              type="submit"
              className="bg-blue-50 disabled:opacity-50 text-blue-500 flex gap-1 h-12 items-center justify-center rounded-xl border-2 border-white/50 text-nowrap px-3 py-2 border-blue-300"
            >
              {isLoading ? "Verificando" : "Verificar"}
              <CaretRight className="inline-block" weight="bold" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
