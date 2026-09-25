import { Command } from "commander";
import { printBanner } from "./ui/banner.js";
import { RequireApiKey } from "./config/env.js";
import chalk from "chalk";
import { runQuery } from "./agent/run-query.js";
import { parseCliMode, type CliMode } from "./agent/modes.js";
import { startChat } from "./commands/chat.js";

function parseMode(value: string): CliMode {
  const mode = parseCliMode(value);
  if (!mode) {
    throw new Error(`Invalid mode "${value}. Use ask, agent or plan`);
  }
  return mode;
}

export function createCli() {
  const program = new Command()
    .name("Commander-CLI")
    .description("An AI Agent clie")
    .version("0.1.0");

  program
    .command("hello")
    .description("greetings")
    .action(() => console.log("world"));

  program
    .command("doctor")
    .description("check if environment is set up correctly")
    .action(async () => {
      const { execa } = await import("execa");
      const { stdout } = await execa("node", ["-v"]);
      if (Number(stdout.slice(1)) < 18) {
        throw new Error("Node 18 or higher version is required");
      }
      const apikey = RequireApiKey();
      console.log(chalk.green("✔️ Node >= v18"));
      console.log(chalk.green("✔️ API Key is set"));
    });

  program
    .command("talk")
    .description("Send one shot prompt to the agent")
    .argument("<prompt>", "prompt to send the agent")
    .option("-v, --verbose", "show verbose output")
    .action(async (prompt: string, options: { verbose?: boolean }) => {
      RequireApiKey();
      await runQuery(prompt, options);
    });

  program
    .command("wakeup")
    .description("Send one shot prompt to the agent")
    .argument("<prompt>", "what to ask to the agent")
    .option("-m, --mode <mode>", "agent|ask|plan", "agent")
    .option("-v, --verbose", "show agent loop message type", false)
    .action(
      async (prompt: string, options: { mode: string; verbose?: boolean }) => {
        RequireApiKey();
        await runQuery(prompt, {
          mode: parseMode(options.mode),
          verbose: options.verbose,
        });
      },
    );

  program
    .command("chat")
    .description("start interactive chat session")
    .option("-m, --mode <mode>", "agent|ask|plan", "agent")
    .option("-v, --verbose", "show agent loop message type", false)
    .action(async (options: { mode: string; verbose: boolean }) => {
      RequireApiKey();
      await startChat({
        mode: parseMode(options.mode),
        verbose: options.verbose,
      });
    });

  program
    .command("banner")
    .description("show banner")
    .action(() => printBanner());

  program.action(() => {
    program.help();
  });

  return program;
}
