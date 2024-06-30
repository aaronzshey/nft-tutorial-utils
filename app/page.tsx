"use client";
import Image from "next/image";
import React from "react";
import getData from "./fetch.tsx";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState("");
  const showData = async () => {
    const data = await getData();
    setData(data);
  };

  useEffect(() => {
    showData();
  }, []);

  //convert the data into

  return (
    <>
      <div>cog is good</div>
      <div>{JSON.stringify(data, null, 2)}</div>
    </>
  );
}

export default App;
