import { query } from "@anthropic-ai/claude-agent-sdk";
import chalk from "chalk";
import {
  handleMessage,
  type MessageHandlerOptions,
} from "./message-handler.js";

export async function runQuery(
  prompt: string,
  options: MessageHandlerOptions = {},
) {
  try {
    const { verbose = false } = options;
    for await (const message of query({
      prompt,
      options: {
        model: "claude-haiku-4-5",
        allowedTools: ["Read", "Glob", "Grep"],
        maxTurns: 10,
        permissionMode: "acceptEdits",
      },
    }))
      handleMessage(message, options);
  } catch (error) {
    console.log(chalk.red(`Error: ${error}`));
  }
}
