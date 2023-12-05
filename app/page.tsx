"use client";

import { useState } from "react";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";

export default function Home() {
  const [code, setCode] = useState("// Your initial code here");

  const downloadUnit4 = () => {
    const downloadFile = () => {
      const fileUrl = "Unit4.dll";
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = "Unit4.dll";
      link.click();
    };
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-black tracking-tighter text-white">
        Click to download Unit4.dll
      </h1>
      <br />
      <button
        onClick={() => downloadUnit4()}
        className="bg-white text-black p-4 rounded-lg shadow-lg"
      >
        Download
      </button>
      <br />
      <Editor
        height="90vh"
        defaultLanguage="C#"
        theme="vs-dark"
        defaultValue="// some comment"
      />
      ;
    </main>
  );
}
