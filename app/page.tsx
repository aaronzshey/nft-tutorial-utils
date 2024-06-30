"use client";
import Image from "next/image";
import React from "react";
import getData from "./fetch";
import { useState, useEffect } from "react";
import { Center, Box } from "@chakra-ui/react";

function App() {
  const [data, setData] = useState("");

  const showData = async () => {
    const data = await getData();
    console.log(data.userId);
    const userId = data.userId;
    setData(userId);
  };

  useEffect(() => {
    showData();
  }, []);

  return (
    <>
      <Center className="h-screen w-screen bg-blue-100" id="wrapper">
        <Center className="border-t-2 h-1/2 w-1/2 bg-violet-300">{data}</Center>

        <Box
          id="footer"
          className="p-4 left-0 bottom-0 w-screen h-1/6 bg-purple-200 fixed"
        >
          footer
        </Box>
      </Center>
    </>
  );
}

export default App;
