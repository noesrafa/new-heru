import OpenAI from "openai";
import React from "react";
import { useState } from "react";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const Backup = () => {
  async function runManager({ run, currentThreadId }) {
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
          threadId: currentThreadId,
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
        const newThread = await openai.beta.threads.create();

        return await createAssistantMessage({
          message: `Nombre: Vicente, mensaje: ${functionArguments.userMessage}`,
          role: "user",
          currentAssistantId: heruAIAssistantAccountantId,
          currentThreadId: newThread.id,
        });
      }

      const sendToOperations = toolCalls.find(
        (tool) => tool.function.name === "operations_agent"
      );

      if (sendToOperations) {
        const functionArguments = JSON.parse(
          sendToOperations.function.arguments
        );
        const newThread = await openai.beta.threads.create();
        return await createAssistantMessage({
          message: `Nombre: Vicente, mensaje: ${functionArguments.userMessage}`,
          role: "user",
          currentAssistantId: heruAIAssistantOperationsId,
          currentThreadId: newThread.id,
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

      return runManager({ run, currentThreadId: threadId });
    }
  }

  const handleSendMessage = async (message: string) => {
    const newThread = threadId
      ? { id: threadId }
      : await openai.beta.threads.create();

    setThreadId(newThread.id);

    const response = await createAssistantMessage({
      message,
      role: "user",
      currentThreadId: newThread.id,
    });

    console.log("\n\nRESPONSE", response);
  };

  const [currentStep, setCurrentStep] = useState("...");
  const [userMessage, setUserMessage] = useState("");
  const [threadId, setThreadId] = useState("");

  const heruAIAssistantOperationsId = import.meta.env
    .VITE_OPENAI_HERU_AI_ASSISTANT_OPERATIONS_ID;
  const heruAIAssistantId = import.meta.env.VITE_OPENAI_HERU_AI_ASSISTANT_ID;
  const heruAIAssistantAccountantId = import.meta.env
    .VITE_OPENAI_HERU_AI_ASSISTANT_ACCOUNTANT_ID;

  async function createAssistantMessage({
    message,
    role,
    currentThreadId,
    currentAssistantId,
  }: {
    message: string;
    role: "user" | "assistant";
    currentThreadId?: string;
    currentAssistantId?: string;
  }) {
    console.log("\n\nMESSAGE", message, role, currentAssistantId);
    console.log("\n\nTHREAD ID", currentThreadId);

    await openai.beta.threads.messages.create(currentThreadId, {
      role,
      content: message,
    });

    let run = await openai.beta.threads.runs.createAndPoll(currentThreadId, {
      assistant_id: currentAssistantId || heruAIAssistantId,
    });
    console.log("\n\nRUN", run);

    return runManager({ run, currentThreadId });
  }

  return <div>Backup</div>;
};

export default Backup;
