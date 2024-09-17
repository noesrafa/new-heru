import MainLayoutV2 from "../../layouts/MainLayoutV2";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
interface ApiResponse {
  assistantResponse: any;
  usage: any;
}

const Documents = () => {
  const [userInput, setUserInput] = useState("soy uber");
  const [apiResponse, setApiResponse] = useState<ApiResponse>({
    assistantResponse: "",
    usage: "",
  });
  const [assistantLatestQuestion, setAssistantLatestQuestion] = useState(
    `
Bienvenido a Heru. Mi nombre es Sam, especialista de atención al cliente, y es un placer saludarle hoy. En Heru estamos comprometidos con simplificar el cumplimiento de sus obligaciones fiscales, permitiéndole enfocarse en lo que realmente importa: sus ingresos. Para empezar, por favor cuénteme un poco sobre su situación fiscal, sus actividades económicas actuales y qué tipo de servicio está buscando con Heru.`
  );
  const [userCurrentData, setUserCurrentData] = useState({
    rfc: null,
    regimesCodeArray: null,
    economicActivity: null,
    economicActivityDetail: null,
    averageIncome: null,
    hasPresentedTaxes: null,
    hasSatPortalSignature: null,
    hasSatPortalPassword: null,
    userNeeds: null,
    sourceChannel: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const callSamanthaAPI = async (userMessage: string) => {
    try {
      const filteredUserCurrentData = Object.fromEntries(
        Object.entries(userCurrentData).filter(
          ([_, value]) => value !== "<UNKNOWN>"
        )
      );

      

      const response = await fetch(
        "http://localhost:88/api/v1/heru-ai-service/samantha/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: "Usnavi",
            userId: 1234,
            userMessage: userMessage,
            assistantLatestQuestion,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error calling Samantha API:", error);
      throw error;
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await callSamanthaAPI(userInput);
      setUserInput("");
      setApiResponse(response);
      setAssistantLatestQuestion(
        response.assistantResponse.assistant_feedback_question
      );
      setUserCurrentData(response.assistantResponse);
    } catch (error) {
      console.error("Error handling submission:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("apiResponse", apiResponse.assistantResponse);
  }, [apiResponse]);

  return (
    <MainLayoutV2>
      <Header />
      <p className="mt-10 mb-6">{assistantLatestQuestion}</p>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full p-3 my-3"
          type="text"
          placeholder="Escribe tu respuesta aquí"
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
        />
        <button
          className="w-full p-3 bg-blue-500 text-white rounded-lg"
          type="submit"
        >
          {isLoading ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </MainLayoutV2>
  );
};

export default Documents;
