import chalk from "chalk";
import boxen from "boxen";
import figlet from "figlet";

export function printBanner() {
  const title = figlet.textSync("Commandr");
  const panel = boxen(
    chalk.cyan("Welcome to Commandr CLI\n") + chalk.dim("The Agentic cli"),
    { padding: 1, borderColor: "cyan" },
  );

  console.log(title);
  console.log(panel);
}
