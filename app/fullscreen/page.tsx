"use client";

import queueBlocks from "../data/queue.json";
import { useSearchParams } from "next/navigation";

import Editor from "@monaco-editor/react";

const FullScreenCode = () => {
  const name = useSearchParams().get("name");

  const block = queueBlocks.find((block: any) => block.name == name);

  if (!block)
    return (
      <div className="gradient-2 flex w-screen h-screen flex-col items-center p-24 gap-5">
        <h1 className="text-4xl font-black tracking-tighter text-white">
          No block found
        </h1>
      </div>
    );

  return (
    <div className="gradient-2 flex w-screen h-screen flex-col items-center p-24 gap-5">
      <Editor
        height="100%"
        theme="vs-dark"
        defaultLanguage="C#"
        defaultValue={block.code.text || "// No code found"}
      />
    </div>
  );
};

export default FullScreenCode;
