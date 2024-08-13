import OpenAI from "openai";
import { Message } from "openai/resources/beta/threads/messages.mjs";
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
  const [messages, setMessages] = useState(initialMessages);

  const handleRequiresAction = async (run) => {
    if (
      run.required_action &&
      run.required_action.submit_tool_outputs &&
      run.required_action.submit_tool_outputs.tool_calls
    ) {
      const toolOutputs =
        run.required_action.submit_tool_outputs.tool_calls.map((tool) => {
          if (tool.function.name === "getCurrentTemperature") {
            return {
              tool_call_id: tool.id,
              output: "57",
            };
          } else if (tool.function.name === "getRainProbability") {
            return {
              tool_call_id: tool.id,
              output: "0.06",
            };
          }
        });

      if (toolOutputs.length > 0) {
        run = await openai.beta.threads.runs.submitToolOutputsAndPoll(
          threadId,
          run.id,
          { tool_outputs: toolOutputs }
        );
      } else {
        console.log("No tool outputs to submit.");
      }

      return runManager(run);
    }
  };

  const runManager = async ({ run }) => {
    if (run.status === "completed") {
      const messages = await openai.beta.threads.messages.list(run.thread_id);
      return messages.data;
    } else if (run.status === "requires_action") {
      console.log(run.status);
      return await handleRequiresAction(run);
    } else {
      console.error("Run did not complete:", run);
    }
  };

  const createMessage = async ({ message }) => {
    setMessages((prev) => [...prev, { message, role: "user" }]);
    let localThreadId = threadId;
    const assistantByCategory = {
      accountant: import.meta.env.VITE_OPENAI_HERU_AI_ASSISTANT_ID,
      support: import.meta.env.VITE_OPENAI_HERU_AI_ASSISTANT_ID,
      heru: import.meta.env.VITE_OPENAI_HERU_AI_ASSISTANT_ID,
    };

    const categorized = await categorizeUserMessage({ userMessage: message });

    if (categorized.category === "no-related") {
      setTimeout(() => {
        setMessages((prev) => prev.slice(0, -1));
        setMessages((prev) => [
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
        setMessages((prev) => prev.slice(0, -1));
        setMessages((prev) => [
          ...prev,
          {
            message: "Hola, ¿en qué puedo ayudarte?",
            role: "assistant",
          },
        ]);
      }, 1000);
      return;
    }

    if (!localThreadId) {
      const thread = await openai.beta.threads.create();
      setThreadId(thread.id);
      localThreadId = thread.id;
    }

    console.log("Creating message", message, localThreadId);

    const messageCreated = await openai.beta.threads.messages.create(
      localThreadId,
      {
        role: "user",
        content: message,
      }
    );

    let run = await openai.beta.threads.runs.createAndPoll(localThreadId, {
      assistant_id: assistantByCategory[categorized.category],
    });

    await runManager({ run });

    return messageCreated;
  };

  async function categorizeUserMessage({ userMessage }) {
    setMessages((prev) => [
      ...prev,
      { message: "...", role: "current-action" },
    ]);

    setIsLoading({ ...isLoading, categorizeUserMessage: true });
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
          Categoriza la duda del usuario y para la descripción parafrasea la duda en máximo 5 palabras.
            - accountant: dudas fiscales, declaraciones, errores en el calculo, tramites fiscales.
            - support: ayuda con los pagos, información desactualizada.
            - heru: heru, constancia fiscal, opinion de cumplimiento, actualizar perfil de heru, vincular.
            - no-related: cualquier otra cosa.
            - greeting: saludo, despedida, agradecimiento.

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

    setMessages((prev) => prev.slice(0, -1));
    setMessages((prev) => [
      ...prev,
      { message: `${resume}`, role: "current-action" },
    ]);

    setIsLoading({ ...isLoading, categorizeUserMessage: false });
    return JSON.parse(category);
  }

  return {
    createMessage,
    categorizeUserMessage,
    isLoading,
    messages,
  };
}

export default useOpenAI;
