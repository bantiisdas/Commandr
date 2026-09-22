import { Command } from "commander";
import { printBanner } from "./ui/banner.js";
import { RequireApiKey } from "./config/env.js";
import chalk from "chalk";
import { runQuery } from "./agent/run-query.js";

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
    .action(async (prompt: string) => {
      RequireApiKey();
      await runQuery(prompt);
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
