import boxen from "boxen";
import { CLI_MODES, MODE_DESCRIPTIONS } from "../config/constants.js";
import { checkEnvironment } from "../config/env.js";
import chalk from "chalk";
import { printBanner } from "../ui/banner.js";
import { fmt } from "../ui/format.js";
import { select } from "@inquirer/prompts";
import type { CliMode } from "../agent/modes.js";
import { startChat } from "./chat.js";

async function runDoctor(): Promise<void> {
  await checkEnvironment();
}

function printModePanels(): void {
  for (const mode of CLI_MODES) {
    const panel = boxen(
      chalk.bold(mode.toUpperCase()) +
        "\n\n" +
        chalk.dim(MODE_DESCRIPTIONS[mode]),
      {
        padding: 1,
        borderColor:
          mode === "agent" ? "green" : mode === "ask" ? "blue" : "yellow",
      },
    );
    console.log(panel);
  }
}

export async function wakeUp(): Promise<void> {
  printBanner();
  console.log();
  try {
    await runDoctor();
  } catch (error) {
    console.error(
      fmt.error(error instanceof Error ? error.message : String(error)),
    );
    process.exit(1);
  }

  console.log();
  printModePanels();

  const mode = await select<CliMode>({
    message: "choose a mode to start:",
    choices: CLI_MODES.map((value) => ({
      name: `${value} - ${MODE_DESCRIPTIONS[value]}`,
      value,
    })),
    default: "agent",
  });

  console.log();
  await startChat({ mode });
}
