"use client";

import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

import queueBlocks from "./data/queue.json";

export default function Home() {
  const newCode = () => {
    window.open("https://code-view.vercel.app/new", "_blank");
  };
  const downloadUnit4 = () => {
    window.open(
      "https://github.com/idocalm/code-view/raw/6299885ca7f91f3b239ea0415e0d7ecd9f3604e5/app/Unit4.dll",
      "_blank"
    );
  };

  return (
    <main className="gradient-2 flex w-screen h-screen flex-col items-center p-24 gap-5">
      <h1 className="text-4xl font-black tracking-tighter text-white">
        הורדה של יחידה 4
      </h1>
      <button
        onClick={() => downloadUnit4()}
        className="flex justify-center items-center text-white gradient-1 font-bold p-[0.7rem] rounded-lg scale-125 "
      >
        Download
      </button>

      <hr className="w-full" />
      <div className="w-full flex flex-row justify-center items-center border-5 border-white rounded-lg">
        <Block title="תור" blocks={queueBlocks} />
        <div className="w-1 h-full bg-white"></div>
        <Block title="רשימה" />
      </div>

      <div
        onClick={() => newCode()}
        className="absolute bottom-5 rounded-full w-5 h-5 flex justify-center scale-125 hover:scale-150 transition-all transition-150 ease-in-out items-center font-black text-2xl right-5 p-5 text-white gradient-1"
      >
        +
      </div>
    </main>
  );
}

interface BlockInterface {
  title: string;
  blocks?: Block[];
}

interface Block {
  name: string;
  code: Code;
  toggled: boolean;
}

interface Code {
  text: string;
  lastModified: string;
  uploadedBy: string;
  uploadedAt: string;
  readOnly: boolean;
}

const Block: React.FC<BlockInterface> = ({ title, blocks }) => {
  const [usefulBlocks, setUsefulBlocks] = useState(blocks || []);

  useEffect(() => {
    if (title == "Node") setUsefulBlocks([]);
  }, []);

  const toggle = (name: string) => {
    setUsefulBlocks(
      usefulBlocks.map((block) => {
        if (block.name === name) {
          return {
            ...block,
            toggled: !block.toggled,
          };
        } else {
          return block;
        }
      })
    );
  };

  const copyCode = (name: string) => {
    const block = usefulBlocks.find((block) => block.name === name);

    if (block) {
      navigator.clipboard.writeText(block.code.text);
    }

    return block;
  };

  const fullScreen = (name: string) => {
    const block = usefulBlocks.find((block) => block.name === name);

    if (block) {
      window.open(
        `https://code-view.vercel.app/fullscreen?name=${name}`,
        "_blank"
      );
    }

    return block;
  };

  return (
    <div className="w-full h-full flex flex-col  items-center container">
      <h1 className="text-4xl font-black tracking-tighter text-white">
        {title}
      </h1>

      <br />

      {usefulBlocks.map((block) => (
        <div
          key={block.name}
          className="relative w-full flex flex-col justify-center p-5 gap-3"
        >
          <h1 className="text-m font-medium tracking-tighter text-white">
            - {block.name}
          </h1>
          <div className="w-full flex flex-row gap-3 justify-between items-center ">
            <button
              onClick={() => toggle(block.name)}
              className="w-full text-white border-white border-2 font-bold p-[0.7rem] rounded-lg"
            >
              {block.toggled ? "הסתר" : "הצג"}
            </button>
            <button
              onClick={() => copyCode(block.name) && alert("Copied!")}
              className="text-white border-white border-2 font-bold p-[0.7rem] rounded-lg"
            >
              העתק
            </button>
            <button
              onClick={() => fullScreen(block.name)}
              className="text-white border-white border-2 font-bold p-[0.7rem] rounded-lg"
            >
              הגדל
            </button>
          </div>
          {block.toggled && (
            <div className={`flex w-full flex-col`}>
              <Editor
                height="25vh"
                defaultLanguage="C#"
                defaultValue={block.code.text}
                theme="vs-dark"
                options={{ readOnly: block.code.readOnly }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
