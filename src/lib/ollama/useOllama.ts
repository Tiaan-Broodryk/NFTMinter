import { useState } from "react";
import { z } from "zod";

export type OllamaChat = {
  ai_reply: string;
  prompt: string;
  messages: { role: "user" | "assistant"; content: string }[];
};

export function useOllama(props: { messages: OllamaChat["messages"] }) {
  const [state, setState] = useState<OllamaChat>({
    ai_reply: "",
    prompt: "",
    messages: props.messages ?? [],
  });

  // https://github.com/ollama/ollama/blob/main/docs/api.md#generate-a-chat-completion
  //   const bres = await toDataURL(props.imageurl);

  const messages: OllamaChat["messages"] = [
    ...state.messages,
    { role: "user", content: state.prompt },
  ];

  async function send() {
    setState((p) => ({ ...p, ai_reply: "", messages, prompt: "" }));

    const result = await fetch("https://ollama.netron.co.za/api/chat", {
      body: JSON.stringify({
        model: "llama3.2",
        //   prompt: state.prompt,
        //   images: [bres],
        messages: messages,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).catch(async (e) => {
      console.log(e);

      await fetch("https://ollama.netron.co.za/api/pull", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model: "llama3.2" }),
      });
    });

    if (!result?.ok) {
      // throw new Error(await result?.text());
      console.log("ERROR: ", await result?.text());
    }

    if (result) {
      const reader = result.body?.getReader();
      // const chunks = [];

      if (!reader) {
        // throw new Error("No reader");
        console.log("No reader");
      }

      if (reader) {
        let done, decodedval;
        while (!done) {
          const data = await reader.read();

          decodedval = data.value;
          done = data.done;
          if (done) {
            console.log("DONE!");

            // DONE

            setState((p) => ({
              ...p,
              ai_reply: "",
              messages: [
                ...p.messages,
                { role: "assistant", content: p.ai_reply },
              ],
            }));

            return;
          }
          const decoded = new TextDecoder().decode(decodedval);
          // console.log({ decoded });

          const entries = decoded.trim().split("\n");

          for (const entry of entries) {
            const decodedjson = JSON.parse(entry.trim()) as unknown;

            //   console.log(decodedjson);

            const parsed = z
              .strictObject({
                model: z.string(),
                created_at: z.coerce.date(),
                response: z.string().optional(),
                done: z.boolean().optional(),
                message: z.strictObject({
                  role: z.string(),
                  content: z.string(),
                }),
                context: z.unknown().optional(),
                total_duration: z.number().optional(),
                prompt_eval_count: z.number().optional(),
                prompt_eval_duration: z.number().optional(),
                eval_count: z.number().optional(),
                eval_duration: z.number().optional(),
                load_duration: z.number().optional(),
                done_reason: z.string().optional(),
              })
              .parse(decodedjson);

            //   console.log(parsed.message.content);

            //   const ai_reply = `${state.ai_reply}${parsed.message.content}`;
            setState((p) => ({
              ...p,
              ai_reply: `${p.ai_reply}${parsed.message.content}`,
            }));
          }
          // chunks.push(decodedval);
          ///////////////////////////////////////////////////////////
        }
      }
    }
  }

  function setStatePartial(partial: Partial<OllamaChat>) {
    setState((p) => ({ ...p, ...partial }));
  }

  return {
    ai_reply: state.ai_reply,
    prompt: state.prompt,
    messages: state.messages,
    setStatePartial,
    send,
  };
}
