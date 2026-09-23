import ora, { type Ora } from "ora";

let activeSpinner: Ora | null = null;

export function startSpinner(text: string) {
  stopSpinner();
  activeSpinner = ora({ text, color: "cyan" }).start();
}

export function updateSpinner(text: string) {
  if (activeSpinner) activeSpinner.text = text;
}

export function stopSpinner() {
  activeSpinner?.stop();
  activeSpinner = null;
}
