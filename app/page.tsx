"use client";
//react imports
import React from "react";

//library imports
import { useSearchParams } from "next/navigation";
import { Suspense, ChangeEvent } from "react";
import { useState, useEffect } from "react";

//local imports
import Image from "next/image";
import ethereumLogo from "../public/ethereum.svg";
import { polygonResponseType } from "./polygonType";
import fetchEthConversionRate from "./fetchEthConversionRate";

//component imports
import { Center, Text, FormControl, Input } from "@chakra-ui/react";
import Footer from "../components/Footer";

function App() {
  const [ethConversionRate, setEthConversionRate] = useState(0);
  const [ethValue, setEthValue] = useState(0.001);

  /* TODO: export this into a component */
  let ethValueRaw = useSearchParams().get("ethValue");
  if (ethValueRaw) {
    setEthValue(parseFloat(ethValueRaw));
  }

  const getEthConversionRate = async () => {
    const ethConversionRateRaw: polygonResponseType =
      await fetchEthConversionRate();
    if (!ethConversionRateRaw.results) {
      setEthConversionRate(0);
    } else {
      setEthConversionRate(ethConversionRateRaw.results[0].c);
    }
  };

  useEffect(() => {
    getEthConversionRate();
  }, []);

  //https://stackoverflow.com/a/72415437/12981681
  function handleForm(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const ethFormValue = e.currentTarget.value;
    console.log(e.currentTarget.value);

    !isNaN(+ethFormValue) ? setEthValue(+ethFormValue) : setEthValue(0);
  }
  return (
    <Suspense>
      <>
        <Center className="h-screen w-screen" id="wrapper">
          <Center className="h-screen w-screen font-black text-6xl bg-radial-gradient">
            <FormControl>
              <Input
                className="focus: outline-none text-right w-44 overflow-x-scroll border-b-2 border-black bg-transparent caret-color: currentColor;"
                defaultValue="0.001"
                onChange={handleForm}
              />
            </FormControl>
            <Image
              src={ethereumLogo}
              alt="Ethereum Logo"
              className="p-4"
              width="100"
              height="100"
            />
            <Text>= ${(ethConversionRate * ethValue).toFixed(3)}</Text>
          </Center>
        </Center>

        <Footer />
      </>
    </Suspense>
  );
}

export default App;
