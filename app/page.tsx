"use client";
//react imports
import React from "react";

//library imports
import { useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";
import { useState, useEffect } from "react";

//local imports
import Image from "next/image";
import ethereumLogo from "../public/ethereum.svg";
import { polygonResponseType } from "./polygonType";
import fetchPolygonResponse from "./fetchPolygonResponse";

//component imports
import {
  Center,
  Text,
  FormControl,
  Input,
  VStack,
  HStack,
} from "@chakra-ui/react";
import Footer from "../components/Footer";

import GetEthValueFromParam from "../components/GetEthValueFromParam";

function App() {
  const [ethConversionRate, setEthConversionRate] = useState(0);
  const [marketCloseTime, setMarketCloseTime] = useState(new Date(0));
  const [ethValue, setEthValue] = useState(0.001);

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

  const getMarketCloseTime = async () => {
    const marketCloseTimeRaw: polygonResponseType =
      await fetchPolygonResponse();

    if (!marketCloseTimeRaw.results) {
      setMarketCloseTime(new Date(0));
    } else {
      setMarketCloseTime(new Date(marketCloseTimeRaw.results[0].t));
    }
  };

  useEffect(() => {
    getEthConversionRate();
    getMarketCloseTime();
  }, []);

  //https://stackoverflow.com/a/72415437/12981681
  function handleForm(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const ethFormValue = e.currentTarget.value;
    console.log(e.currentTarget.value);

    !isNaN(+ethFormValue) ? setEthValue(+ethFormValue) : setEthValue(0);
  }

  function copy(currentLink) {
    navigator.clipboard.writeText(currentLink);
  }

  return (
    <>
      <Center
        className="h-screen w-screen font-black text-6xl bg-radial-gradient"
        id="wrapper"
      >
        {/* this vstack makes it easy to put subtext under the main data area */}
        <VStack>
          {/* this hstack contains the main data area */}
          <HStack>
            <FormControl>
              <Input
                className="focus: outline-none text-right w-44 overflow-x-scroll border-b-2 border-black bg-transparent caret-color: currentColor;"
                defaultValue={ethValue}
                onChange={handleForm}
              />
            </FormControl>
            <Image
              src={ethereumLogo}
              alt="Ethereum Logo"
              className="p-2"
              width="100"
              height="100"
            />

            <GetEthValueFromParam
              ethValueInput={ethValue}
              ethConversionRate={ethConversionRate}
            />
          </HStack>

          <Text className="font-light text-sm">
            Conversion rate from closing price on{" "}
            {marketCloseTime.toLocaleDateString()},{" "}
            {marketCloseTime.toLocaleTimeString()},{" "}
            {marketCloseTime.toString().match(/\(.*\)/g)}.
          </Text>
          <Text
            className="font-light text-xs cursor-copy hover:underline"
            onClick={() =>
              copy("eth-tutorial-utils.vercel.app/?ethValue=" + ethValue)
            }
          >
            Click here to copy a share link to the current value.
          </Text>
        </VStack>
      </Center>

      <Footer />
    </>
  );
}

export default App;
