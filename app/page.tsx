"use client";
//react imports
import React from "react";

//library imports
import { useState, useEffect } from "react";

//local imports
import { polygonResponseType } from "./polygonType";
import fetchPolygonResponse from "./fetchPolygonResponse";

//component imports
import { Center } from "@chakra-ui/react";
import Footer from "../components/Footer";
import GetEthValueFromParam from "../components/GetEthValueFromParam";

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
        <GetEthValueFromParam ethConversionRate={ethConversionRate} />
      </Center>
      <Footer />
    </>
  );
}

export default App;
