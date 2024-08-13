import OpenAI from "openai";
import { Message } from "openai/resources/beta/threads/messages.mjs";
import { useEffect } from "react";
import { useState } from "react";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const initialMessages = [
  {
    message: "Hola, ¿en qué puedo ayudarte?",
    role: "assistant",
  },
];

function useOpenAI() {
  const [isLoading, setIsLoading] = useState({
    createMessage: false,
    categorizeUserMessage: false,
  });
  const [threadId, setThreadId] = useState<string | null>(null);
  const [messagesHistory, setMessagesHistory] = useState(initialMessages);

  useEffect(() => {
    // if last message is from the role assistant setISLoading to false
    if (messagesHistory[messagesHistory.length - 1]?.role === "assistant") {
      setIsLoading({ ...isLoading, createMessage: false });
    }
  }, [messagesHistory]);

  async function categorizeUserMessage({ userMessage }) {
    setMessagesHistory((prev) => [
      ...prev,
      { message: "...", role: "current-action" },
    ]);

    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
          Categoriza la duda, para el descripción parafrasea la duda en 5 palabras o menos.
            - accountant: dudas fiscales, declaraciones, errores en el calculo, tramites fiscales.
            - operations: ayuda con los pagos, información desactualizada.
            - heru: heru, constancia fiscal, opinion de cumplimiento, actualizar perfil de heru, vincular.
            - greeting: saludo, despedida, agradecimiento.
            - no-related: cualquier otra cosa.

            JSON:
            {
                category,
                resume,
            }
          `,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      model: "gpt-4o",
      response_format: { type: "json_object" },
    });

    const category = response?.choices?.[0]?.message?.content;
    const resume = JSON.parse(category).resume;
    console.log("CATEGORIZED", category);

    setMessagesHistory((prev) => prev.slice(0, -1));
    setMessagesHistory((prev) => [
      ...prev,
      { message: `${resume}`, role: "current-action" },
    ]);

    return JSON.parse(category);
  }

  const createMessage = async ({ message }) => {
    setIsLoading({ ...isLoading, createMessage: true });
    setMessagesHistory((prev) => [...prev, { message, role: "user" }]);
    let localThreadId = threadId;

    if (!localThreadId) {
      const thread = await openai.beta.threads.create();
      localThreadId = thread.id;
      setThreadId(localThreadId);
    }

    const assistantByCategory = {
      accountant: import.meta.env.VITE_OPENAI_HERU_AI_ASSISTANT_ACCOUNTANT_ID,
      heru: import.meta.env.VITE_OPENAI_HERU_AI_ASSISTANT_ID,
      operations: import.meta.env.VITE_OPENAI_HERU_AI_ASSISTANT_OPERATIONS_ID,
    };
    const sendingToAssistantMessage = {
      accountant: "Enviando a un contador",
      heru: "Enviando a un agente de soporte",
      operations: "Enviando a un especialista",
    };

    const lastThreeMessages = messagesHistory
      .slice(-3)
      .map((message) => `${message.role}: ${message.message}`)
      .join("\n,");

    const messageToAnalize = `context: ${lastThreeMessages}, currentMessage: ${message}`;
    console.log("INITIAL MSG", messageToAnalize);

    const categorized = await categorizeUserMessage({
      userMessage: messageToAnalize,
    });

    if (categorized.category === "no-related") {
      setTimeout(() => {
        setMessagesHistory((prev) => prev.slice(0, -1));
        setMessagesHistory((prev) => [
          ...prev,
          {
            message:
              "No tengo información sobre ese tema, ¿en qué más puedo ayudarte?",
            role: "assistant",
          },
        ]);
      }, 1000);
      return;
    }

    if (categorized.category === "greeting") {
      setTimeout(() => {
        setMessagesHistory((prev) => prev.slice(0, -1));
        setMessagesHistory((prev) => [
          ...prev,
          {
            message: "Hola, ¿en qué puedo ayudarte?",
            role: "assistant",
          },
        ]);
      }, 1000);
      return;
    }

    console.log("Creating message", message, localThreadId);

    const messageCreated = await openai.beta.threads.messages.create(
      localThreadId,
      {
        role: "user",
        content: `Vicente: ${message}`,
      }
    );

    console.log("Message created", messageCreated);

    setTimeout(() => {
      setMessagesHistory((prev) => prev.slice(0, -1));
      setMessagesHistory((prev) => [
        ...prev,
        {
          message: sendingToAssistantMessage[categorized.category],
          role: "current-action",
        },
      ]);
    }, 1000);

    let run = await openai.beta.threads.runs.createAndPoll(localThreadId, {
      assistant_id: assistantByCategory[categorized.category],
    });

    await runManager({ run, currentThreadId: localThreadId });

    return messageCreated;
  };

  const handleRequiresAction = async (run, currentThreadId) => {
    if (
      run.required_action &&
      run.required_action.submit_tool_outputs &&
      run.required_action.submit_tool_outputs.tool_calls
    ) {
      const toolOutputs = await Promise.all(
        run.required_action.submit_tool_outputs.tool_calls.map(async (tool) => {
          if (tool.function.name === "change_heru_profile_cellphone") {
            setMessagesHistory((prev) => prev.slice(0, -1));
            setMessagesHistory((prev) => [
              ...prev,
              {
                message: "Actualizando número de teléfono",
                role: "current-action",
              },
            ]);

            await new Promise((resolve) => setTimeout(resolve, 1500));

            return {
              tool_call_id: tool.id,
              output: "Número actualizado exitosamente",
            };
          }
        })
      );

      if (toolOutputs.length > 0) {
        console.log("Submitting tool outputs", toolOutputs, currentThreadId);

        setMessagesHistory((prev) => prev.slice(0, -1));
        setMessagesHistory((prev) => [
          ...prev,
          {
            message: "Finalizando...",
            role: "current-action",
          },
        ]);

        run = await openai.beta.threads.runs.submitToolOutputsAndPoll(
          currentThreadId,
          run.id,
          { tool_outputs: toolOutputs.filter(Boolean) }
        );
      } else {
        console.log("No tool outputs to submit.");
      }

      return runManager({ run, currentThreadId });
    }
  };

  const runManager = async ({ run, currentThreadId }) => {
    if (run.status === "completed") {
      const messages = await openai.beta.threads.messages.list(run.thread_id);
      const latestMessage =
        //@ts-ignore
        messages.data.reverse()[messages.data.length - 1]?.content?.[0]?.text
          ?.value;
      console.log("Message COMPLETED", messages, latestMessage);

      setMessagesHistory((prev) => prev.slice(0, -1));
      setMessagesHistory((prev) => [
        ...prev,
        { message: latestMessage, role: "assistant" },
      ]);

      return;
    } else if (run.status === "requires_action") {
      console.log(run.status);
      return await handleRequiresAction(run, currentThreadId);
    } else {
      console.error("Run did not complete:", run);
    }
  };

  return {
    createMessage,
    categorizeUserMessage,
    isLoading,
    messages: messagesHistory,
  };
}

export default useOpenAI;
