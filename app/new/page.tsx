"use client";

import React, { useState, FormEvent } from "react";
const FormPage = () => {
  const [name, setName] = useState("");
  const [personName, setPersonName] = useState("");
  const [code, setCode] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      setName("");
      setPersonName("");
      setCode("");
      alert("הקוד נשלח בהצלחה");
    }
  };

  return (
    <div className="w-screen h-screen gradient-2 flex flex-col gap-20 items-center p-10">
      <h1 className="text-3xl text-white font-black tracking-tighter">
        הוספת קטע קוד חדש
      </h1>

      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-5 items-center w-full border-2 border-white rounded-lg p-10"
      >
        <input
          className="w-full text-right p-2 rounded-lg border-2 border-white"
          type="text"
          placeholder="שם הבעיה"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full text-right p-2 rounded-lg border-2 border-white"
          type="text"
          placeholder="שם המוסיף"
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
        />
        <textarea
          className="w-full text-right p-2 rounded-lg border-2 border-white"
          placeholder="קוד"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          type="submit"
          className="w-full p-2 rounded-lg text-white gradient-1 font-bold"
        >
          שלח
        </button>
      </form>
    </div>
  );
};

export default FormPage;
