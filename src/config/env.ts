import chalk from "chalk";
import "dotenv/config";
import { execa } from "execa";

export function RequireApiKey(): string {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not set");
  }
  return apiKey;
}

export async function checkEnvironment(): Promise<void> {
  const { stdout } = await execa("node", ["-v"]);
  const major = parseInt(
    stdout.trim().replace(/^v/, "").split(".")[0] ?? "0",
    10,
  );
  if (major < 18) {
    throw new Error(`Node.js 18+ required (found ${stdout.trim()})`);
  }

  RequireApiKey();
  console.log(chalk.green("✓ Node.js is >= 18"));
  console.log(chalk.green("✓ ANTHROPIC_API_KEY is set"));
}
