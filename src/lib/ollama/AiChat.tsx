import { Button, cn, H1, Input, TextArea } from "~/atoms";
import { z } from "zod";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LiveProvider, LiveEditor, LivePreview } from "react-live";
import { FaArrowUp } from "react-icons/fa6";
import { OllamaChat, useOllama } from "./useOllama";
import { useTimer } from "~/hooks/useTimer";
import React from "react";
export function AiChatOld() {
  return (
    <div>
      AI CHat
      <div>
        <label className="sr-only">Message</label>
        <textarea
          required
          placeholder="We need an online store for our business. Can you help? Please provide a quote."
          className="block w-full rounded-md border-2 border-gray-200 p-3 focus:border-cyan-200 focus:ring-cyan-200 sm:text-sm dark:border-black dark:bg-black/50 dark:focus:border-neutral-600 dark:focus:outline-none dark:focus:ring-cyan-800"
          rows={6}
        />
      </div>
      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-lg font-semibold text-white shadow-sm transition-all duration-300 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Get in touch
        </button>
      </div>
    </div>
  );
}

function AiChatMessage(props: { message: OllamaChat["messages"][0] }) {
  const { message } = props;
  return (
    <div className="my-5 flex w-full flex-row">
      {/* <div className="flex-0 w-[60px]">{message.role}:</div> */}

      {props.message.role === "user" && <div className="w-full flex-1" />}

      <div
        className={cn(
          "",
          props.message.role === "user"
            ? "ml-auto w-[50vw] rounded bg-green-500/20 px-5 py-2"
            : "container mx-auto max-w-5xl rounded px-5 py-2",
        )}
      >
        <div className={cn("w-full flex-1 text-neutral-900")}>
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              code: (c) => {
                return (
                  <div className="w-full">
                    <LiveProvider
                      code={(c.children as unknown as string)
                        .split("\n")
                        .map((l) => {
                          if (l.trim().startsWith("import ")) {
                            return "";
                          }

                          if (l.trim().startsWith("export default ")) {
                            return "";
                          }

                          return l;
                        })
                        .join("\n")}
                      scope={{ ...React, ...global }}
                    >
                      <div className="grid w-full grid-cols-2 gap-4">
                        <LiveEditor className="font-mono" />
                        <LivePreview />
                      </div>
                    </LiveProvider>
                    {/* <pre>{JSON.stringify(props., null, 2)}</pre> */}
                  </div>
                );
              },
            }}
          >
            {message.content}
          </Markdown>
        </div>
      </div>
    </div>
  );
}

export function AiChat() {
  const [state, setState] = useState({ loaded: false });

  const ollama = useOllama({
    messages: [
      // {
      //   role: "user" as "user" | "assistant",
      //   content:
      //     "can you make code for a react function component that has a like button that you can click using setstate to increment the likes? please respond with only the final react component code and use inline tailwind please. do not write const functionaname = () => instead write out function FName() { etc.. make sure to have an onlick to setState",
      // },
      // {
      //   role: "assistant",
      //   content:
      //     '```jsx\nimport React, { useState } from \'react\';\n\nfunction LikeButton() {\n  const [likes, setLikes] = useState(0);\n\n  return (\n    <div className="flex items-center space-x-2">\n      <p>Like: {likes}</p>\n      <button\n        onClick={() => setLikes((prevLikes) => prevLikes + 1)}\n        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"\n      >\n        Like\n      </button>\n    </div>\n  );\n}\n\nexport default LikeButton;\n```',
      // },
      {
        role: "user",
        content:
          "you are a vehicle make model and variant finder a user types a make model or variant or a combination of all 3 and you give bach in jason a make model and variant",
      },
      {
        role: "user",
        content: "mustang gt",
      },
      {
        role: "assistant",
        content: "\n\n**Make:** Ford\n**Model:** Mustang\n**Variant:** GT ",
      },
      {
        role: "user",
        content: "ranger wildtrak",
      },
      {
        role: "assistant",
        content: "**Make:** Ford\n**Model:** Ranger\n**Variant:** Wildtrak",
      },
      {
        role: "user",
        content: "hilux d4d",
      },
      {
        role: "assistant",
        content: "**Make:** Toyota\n**Model:** Hilux\n**Variant:** D-4D",
      },
    ],
  });

  useEffect(() => {
    if (!state.loaded) {
      // ollama.send();
      setState({ loaded: true });
    }
  }, []);

  if (!state.loaded) {
    return <div>loading...</div>;
  }

  return (
    <section className="flex flex-col gap-5 bg-white px-10 pb-20 pt-10">
      <center>
        <H1>AI User Interface Demo</H1>
      </center>
      <pre>{JSON.stringify(ollama, null, 2)}</pre>
      <div className="w-full">
        <div className="w-full overflow-y-auto text-xs">
          {ollama.messages.slice(1).map((message, i) => (
            <AiChatMessage key={i} message={message} />
          ))}
        </div>

        <div className="prose prose-sm prose-invert">
          <Markdown remarkPlugins={[remarkGfm]}>{ollama.ai_reply}</Markdown>
        </div>

        <div
          className={cn(
            "mx-auto mt-20 flex w-full max-w-xl gap-5",
            "rounded-full bg-neutral-200",
          )}
        >
          <Input
            value={ollama.prompt}
            onChange={(e) => ollama.setStatePartial({ prompt: e.target.value })}
            placeholder="Enter your message"
            // rows={4}
            className="w-full"
            onKeyDown={async (e) => {
              console.log(e.key);
              if (e.key === "Enter") {
                e.preventDefault();
                await ollama.send();
              }
            }}
          />

          <Button
            className="m-1 aspect-square rounded-full px-2.5"
            onClick={async () => ollama.send()}
          >
            <FaArrowUp />
          </Button>
        </div>
      </div>
    </section>
  );
}
