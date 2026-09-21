import { Command } from "commander";
import { printBanner } from "./ui/banner.js";

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
    .command("banner")
    .description("show banner")
    .action(() => printBanner());

  program.action(() => {
    program.help();
  });

  return program;
}
