"use client";
import Image from "next/image";
import React from "react";
import nextLogo from "../public/next.svg";
import vercelLogo from "../public/vercel.svg";
import polygonLogo from "../public/polygon-io.svg";
import alchemyLogo from "../public/alchemy.svg";
import getData from "./fetch";
import { useState, useEffect } from "react";
import { Center, Box, HStack, StackDivider } from "@chakra-ui/react";

import { polygonResponseType, polygonData } from "./polygonType";

function App() {
  const [data, setData] = useState(0);

  const showData = async () => {
    const data: polygonResponseType = await getData();
    console.log(data.results);
    const results = data.results[0].c;
    setData(results);
  };

  useEffect(() => {
    showData();
  }, []);

  return (
    <>
      <Center className="h-screen w-screen" id="wrapper">
        <Center className="h-1/2 w-1/2 bg-slate-300">{data}</Center>

        <Box
          id="footer-parent"
          className="left-0 bottom-0 w-screen h-12 fixed bg-gradient-to-r from-black via-white to-white pt-0.5"
        >
          <HStack
            className="w-screen inline-flex inherit bg-white"
            spacing="10px"
          >
            <Image
              src={nextLogo}
              alt="Next.js Logo"
              className="h-auto  w-1/12 pl-1"
            />
            <Image
              src={vercelLogo}
              alt="Vercel Logo"
              className="h-auto w-1/12 p-4"
            />
            <Image
              src={polygonLogo}
              alt="Polygon.io Logo"
              className="h-auto w-1/12 p-4"
            />
            <Image
              src={alchemyLogo}
              alt="Alchemy Logo"
              className="max-h-full w-1/12 p-4"
            />
          </HStack>
        </Box>
      </Center>
    </>
  );
}

export default App;
