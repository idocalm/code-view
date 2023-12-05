// components/CodeEditor.js
import React, { useRef, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";

const CodeEditor = ({ code, onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    // Set up editor options
    const options = {
      selectOnLineNumbers: true,
    };

    // Initialize Monaco Editor
    editorRef.current = monaco.editor.create(
      document.getElementById("editor-container"),
      {
        value: code,
        language: "javascript", // Set the initial language
        theme: "vs-dark", // Set the initial theme
        automaticLayout: true,
        ...options,
      }
    );

    // Set up editor change event
    editorRef.current.onDidChangeModelContent(() => {
      if (onChange) {
        onChange(editorRef.current.getValue());
      }
    });

    // Cleanup function
    return () => {
      editorRef.current.dispose();
    };
  }, [code, onChange]);

  return <div id="editor-container" style={{ height: "100vh" }} />;
};

export default CodeEditor;
