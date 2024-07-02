"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";
import { Suspense } from "react";
import nextLogo from "../public/next.svg";
import vercelLogo from "../public/vercel.svg";
import polygonLogo from "../public/polygon-io.svg";
import alchemyLogo from "../public/alchemy.svg";
import ethereumLogo from "../public/ethereum.svg";
import getData from "./fetch";
import { useState, useEffect } from "react";
import { Center, Box, HStack, VStack, Text } from "@chakra-ui/react";

import { polygonResponseType } from "./polygonType";

function App() {
  const [polygonResponse, setPolygonResponse] = useState(
    {} as polygonResponseType,
  );

  let ethValueRaw = useSearchParams().get("ethValue");
  let ethValue = 0.001;
  if (ethValueRaw) {
    ethValue = parseFloat(ethValueRaw);
  }

  const getPolygonResponse = async () => {
    const polygonResponse: polygonResponseType = await getData();
    setPolygonResponse(polygonResponse);
  };

  useEffect(() => {
    getPolygonResponse();
  }, []);

  let ethInUSD: number;

  if (!polygonResponse.results) {
    ethInUSD = 0;
  } else {
    ethInUSD = polygonResponse.results[0].c;
  }
  return (
    <Suspense>
      <>
        <Center className="h-screen w-screen" id="wrapper">
          <Center className="h-screen w-screen font-black text-6xl bg-radial-gradient">
            <Suspense>
              <Text className="inherit">{ethValue}</Text>
            </Suspense>
            <Image
              src={ethereumLogo}
              alt="Ethereum Logo"
              className="h-1/12 w-1/12 p-4"
            />
            = ${(ethInUSD * ethValue).toFixed(3)}
          </Center>

          <VStack
            id="footer-parent"
            spacing={0}
            align="stretch"
            className="z-0 left-0 bottom-0 w-screen h-1/12 absolute"
          >
            <Box
              id="animated-ribbon"
              className="h-px transition-all duration-1000"
              background="linear-gradient(to right, black, black, black, white, white)"
              backgroundSize="200% 200%"
              backgroundPosition="100% 100%"
            ></Box>

            <HStack
              className="z-10 left-0 bottom-0 w-screen "
              spacing="10px"
              id="footer"
              onMouseEnter={() => {
                document.getElementById(
                  "animated-ribbon",
                ).style.backgroundPosition = "0% 0%";
              }}
              onMouseLeave={() => {
                document.getElementById(
                  "animated-ribbon",
                ).style.backgroundPosition = "100% 100%";
              }}
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
          </VStack>
        </Center>
      </>
    </Suspense>
  );
}

export default App;
