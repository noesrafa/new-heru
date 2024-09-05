import { useState } from "react";

function useBedrock() {
  const [isLoading, setIsLoading] = useState({
    createMessage: false,
  });
  const [threadId, setThreadId] = useState<string | null>(null);
  const [messagesHistory, setMessagesHistory] = useState([]);

  const createMessage = async (message: string, sessionId: string) => {
    setIsLoading({ ...isLoading, createMessage: true });

    try {
      setMessagesHistory((prev) => [...prev, { message, role: "user" }]);

      setMessagesHistory((prev) => [
        ...prev,
        { message: "Analizando...", role: "current-action" },
      ]);

      const response = await fetch(
        import.meta.env.VITE_OPENAI_HERU_AI_BEDROCK_AGENT_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: message,
            sessionId,
          }),
        }
      );

      const data = await response.json();

      if (!data.completion) {
        throw new Error("No completion");
      }

      setMessagesHistory((prev) => prev.slice(0, -1));
      setMessagesHistory((prev) => [
        ...prev,
        {
          message: data.completion,
          role: "assistant",
        },
      ]);
    } catch (error) {
      setMessagesHistory((prev) => prev.slice(0, -1));
      setMessagesHistory((prev) => [
        ...prev,
        { message: "Error al analizar", role: "assistant" },
      ]);
    } finally {
      setIsLoading({ ...isLoading, createMessage: false });
    }
  };

  return { isLoading, messages: messagesHistory, threadId, createMessage };
}

export default useBedrock;
