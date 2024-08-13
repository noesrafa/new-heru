import ChatLayout from "../layouts/ChatLayout";
import { CaretLeft, Eyeglasses } from "@phosphor-icons/react";
import OpenAI from "openai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const messages = [
  {
    message: "Hola, ¿en qué puedo ayudarte?",
    role: "assistant",
  },
  {
    message: "Quiero saber mi saldo.",
    role: "user",
  },
  {
    message: "Claro, ¿me puedes proporcionar tu número de cuenta?",
    role: "assistant",
  },
  {
    message: "1234567890",
    role: "user",
  },
  {
    message: "Tu saldo actual es de $1,000.00",
    role: "assistant",
  },
  {
    message: "¡Gracias!",
    role: "user",
  },
  {
    message: "¿En qué más puedo ayudarte?",
    role: "assistant",
  },
  {
    message: "Tu saldo actual es de $1,000.00",
    role: "assistant",
  },
  {
    message: "¡Gracias!",
    role: "user",
  },
  {
    message: "¿En qué más puedo ayudarte?",
    role: "assistant",
  },
  {
    message: "Tu saldo actual es de $1,000.00",
    role: "assistant",
  },
  {
    message: "¡Gracias!",
    role: "user",
  },
  {
    message: "¿En qué más puedo ayudarte?",
    role: "assistant",
  },
  {
    message: "Tu saldo actual es de $1,000.00",
    role: "assistant",
  },
  {
    message: "¡Gracias!",
    role: "user",
  },
  {
    message: "¿En qué más puedo ayudarte?",
    role: "assistant",
  },
];

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const Chat = () => {
  const heruAIAssistantOperationsId = import.meta.env
    .VITE_OPENAI_HERU_AI_ASSISTANT_OPERATIONS_ID;
  const heruAIAssistantId = import.meta.env.VITE_OPENAI_HERU_AI_ASSISTANT_ID;
  const heruAIAssistantAccountantId = import.meta.env
    .VITE_OPENAI_HERU_AI_ASSISTANT_ACCOUNTANT_ID;

  async function createAssistantMessage({
    message,
    role,
    currentAssistantId,
  }: {
    message: string;
    role: "user" | "assistant";
    currentAssistantId?: string;
  }) {
    console.log("\n\nMESSAGE", message, role, currentAssistantId);
    const thread = await openai.beta.threads.create();
    console.log("\n\nTHREAD", thread);
    console.log("\n\nTHREAD ID", thread.id);

    await openai.beta.threads.messages.create(thread.id, {
      role,
      content: message,
    });

    let run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: currentAssistantId || heruAIAssistantId,
    });
    console.log("\n\nRUN", run);

    return runManager({ run, threadId: thread.id });
  }

  async function runManager({ run, threadId }) {
    if (run.status === "completed") {
      const messages = await openai.beta.threads.messages.list(run.thread_id);
      const message = //@ts-ignore
        messages.data.map((msg) => msg.content)?.[0]?.[0]?.text?.value;

      return {
        message,
        status: "success",
      };
    } else {
      if (run.status === "requires_action") {
        console.log("\n\nRUN REQUIRED ACTION", run);
        return await handleRequiresAction({
          run,
          threadId,
        });
      }
      return run;
    }
  }

  async function handleRequiresAction({ run, threadId }) {
    const requiredAction = run.required_action;

    if (
      requiredAction &&
      requiredAction.submit_tool_outputs &&
      requiredAction.submit_tool_outputs.tool_calls
    ) {
      const toolCalls = requiredAction.submit_tool_outputs.tool_calls;

      const sendToAccountantTool = toolCalls.find(
        (tool) => tool.function.name === "accountant_agent"
      );

      if (sendToAccountantTool) {
        const functionArguments = JSON.parse(
          sendToAccountantTool.function.arguments
        );
        return await createAssistantMessage({
          message: `Nombre: Vicente, mensaje: ${functionArguments.userMessage}`,
          role: "user",
          currentAssistantId: heruAIAssistantAccountantId,
        });
      }

      const sendToOperations = toolCalls.find(
        (tool) => tool.function.name === "operations_agent"
      );

      if (sendToOperations) {
        const functionArguments = JSON.parse(
          sendToOperations.function.arguments
        );
        return await createAssistantMessage({
          message: `Nombre: Vicente, mensaje: ${functionArguments.userMessage}`,
          role: "user",
          currentAssistantId: heruAIAssistantOperationsId,
        });
      }

      const toolOutputs = await Promise.all(
        toolCalls.map(async (tool) => {
          const functionArguments = JSON.parse(tool.function.arguments);
          const functionName = tool.function.name;

          if (functionName === "get_declaration_receipt") {
            const response = `Tu declaración de ${functionArguments?.month} 2023 está lista, puedes descargarla aquí`;

            console.log(
              "\n\nRUNNING",
              functionName,
              functionArguments,
              response
            );

            return {
              tool_call_id: tool.id,
              output: response,
            };
          }
          if (functionName === "solve_payments_error") {
            const response = `Paga en oxxo para continuar con el pago`;

            console.log(
              "\n\nRUNNING",
              functionName,
              functionArguments,
              response
            );

            return {
              tool_call_id: tool.id,
              output: response,
            };
          }
        })
      );

      if (toolOutputs.length > 0) {
        run = await openai.beta.threads.runs.submitToolOutputsAndPoll(
          threadId,
          run.id,
          { tool_outputs: toolOutputs }
        );
      } else {
        console.log("No tool outputs to submit.");
      }

      return runManager({ run, threadId });
    }
  }

  const handleSendMessage = async (message: string) => {
    const response = await createAssistantMessage({
      message,
      role: "user",
    });

    console.log("\n\nRESPONSE", response);
  };

  const navigate = useNavigate();

  return (
    <ChatLayout>
      <div className="flex gap-2 items-center p-3 sticky top-0 border-b border-neutral-100 bg-white/70 backdrop-blur-xl z-10">
        <button
          className="p-3 hover:bg-neutral-100 rounded-lg"
          onClick={() => navigate("/")}
        >
          <CaretLeft className="text-blue-600 size-4" weight="bold" />
        </button>
        <div className="size-10 bg-blue-200 rounded-lg flex items-center justify-center">
          <Eyeglasses weight="bold" />
        </div>
        <div className="ml-1">
          <h3 className="font-medium text-lg -mt-1">HeruConta</h3>
          <p className="text-xs text-blue-950/70 -mt-1">
            <span className="px-1 py-0.5 rounded text-[10px] bg-blue-950/70 text-white">
              AI
            </span>{" "}
            Bot
          </p>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-col gap-1 mb-20">
          {messages.map((message, index) => (
            <div
              className={`${
                message.role === "assistant" ? "" : "ml-auto"
              } gap-2 items-center`}
              key={`${index}-${message.role}`}
            >
              <div>
                <h4
                  className={`text-[10px] opacity-60 font-medium mb-0.5 ${
                    message.role === "assistant" ? "" : "text-right"
                  }`}
                >
                  {message.role === "assistant" ? "HeruConta" : ""}
                </h4>
              </div>
              <div
                className={`w-fit px-2 py-2 text-sm rounded-xl ${
                  message.role === "assistant"
                    ? "bg-white shadow-sm rounded-tl-none"
                    : "bg-blue-200 rounded-br-none text-blue-950"
                }`}
              >
                {message.message}
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 w-full fade-in">
          <div className="w-full flex items-center gap-1 max-w-[600px] mx-auto px-2 pt-2 pb-3 border-x border-t border-neutral-200 bg-[#f3f3f1] z-10">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              className="w-full px-4 py-2 rounded-lg bg-neutral-400/10"
            />
            <button
              onClick={() => handleSendMessage("Hola, ¿en qué puedo ayudarte?")}
              className="bg-gradient-to-b from-blue-500 to-blue-600 text-white px-3 h-10 rounded-lg text-sm"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </ChatLayout>
  );
};

export default Chat;
