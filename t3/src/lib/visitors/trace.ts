import { TraceTypeZod } from "./TraceType";

export async function CFTrace() {
  const res = await fetch(`https://www.cloudflare.com/cdn-cgi/trace`).then(
    (res) => res.text(),
  );

  const data = Object.fromEntries(
    res
      .trim()
      .split("\n")
      .map((line) => line.split("=") as [string, string]),
  );

  const output = TraceTypeZod.parse(data)

  return output
}
