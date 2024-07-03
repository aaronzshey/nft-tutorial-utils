"use client";
//react imports
import React from "react";

//library imports
import { useState, useEffect, Suspense } from "react";

//local imports
import { polygonResponseType } from "./polygonType";
import fetchPolygonResponse from "./fetchPolygonResponse";

//component imports
import { Center } from "@chakra-ui/react";
import Footer from "../components/Footer";
//import GetEthValueFromParam from "../components/GetEthValueFromParam";

import dynamic from "next/dynamic";

//i have no idea what the problem is anymore
const GetEthValueFromParam = dynamic(
  () => import("../components/GetEthValueFromParam"),
  {
    ssr: false,
  },
);

function App() {
  const [ethConversionRate, setEthConversionRate] = useState(0);

  /* these states are necessary because the polygonResponse is not immediately available.
  This stage of validation is required to avoid messy-looking errors or undefined errors
  blocking builds */

  const getEthConversionRate = async () => {
    const ethConversionRateRaw: polygonResponseType =
      await fetchPolygonResponse();

    if (!ethConversionRateRaw.results) {
      setEthConversionRate(0);
    } else {
      setEthConversionRate(ethConversionRateRaw.results[0].c);
    }
  };

  useEffect(() => {
    getEthConversionRate();
  }, []);

  return (
    <>
      <Center
        className="h-screen w-screen font-black text-6xl bg-radial-gradient"
        id="wrapper"
      >
        <Suspense>
          <GetEthValueFromParam ethConversionRate={ethConversionRate} />
        </Suspense>
      </Center>
      <Footer />
    </>
  );
}

export default App;
