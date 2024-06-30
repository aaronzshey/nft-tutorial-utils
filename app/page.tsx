"use client";
import Image from "next/image";
import React from "react";
import nextLogo from "../public/next.svg";
import vercelLogo from "../public/vercel.svg";
import polygonLogo from "../public/polygon-io.svg";
import getData from "./fetch";
import { useState, useEffect } from "react";
import { Center, Box } from "@chakra-ui/react";

function App() {
  const [data, setData] = useState(0);

  const showData = async () => {
    const data: { userId: number; id: number; title: string; body: string } =
      await getData();
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
          className="p-4 left-0 bottom-0 w-screen h-12 bg-purple-200 fixed inline-flex"
        >
          <Image
            src={nextLogo}
            alt="Next.js Logo"
            className="max-h-full w-1/12"
          />
          <Image
            src={vercelLogo}
            alt="Vercel Logo"
            className="max-h-full w-1/12"
          />
          <Image
            src={polygonLogo}
            alt="Polygon.io Logo"
            className="max-h-full w-1/12"
          />
        </Box>
      </Center>
    </>
  );
}

export default App;
