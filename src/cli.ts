import { Command } from "commander";

export function createCli() {
  const program = new Command()
    .name("Commander-CLI")
    .description("An AI Agent clie")
    .version("0.1.0");

  program
    .command("hello")
    .description("greetings")
    .action(() => console.log("world"));

  program.action(() => {
    program.help();
  });

  return program;
}
