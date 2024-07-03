"use client";
import React from "react";
import { useState, useEffect, ChangeEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { Text, HStack, VStack, FormControl, Input } from "@chakra-ui/react";

import Image from "next/image";
import ethereumLogo from "../public/ethereum.svg";
import { polygonResponseType } from "../app/polygonType";

import fetchPolygonResponse from "../app/fetchPolygonResponse";

/*

Ultimately, I had to move most of my helper functions into this file, due to this feature of Next:
https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout

Since I wanted this app to be able to copy a link to the current form value, along with updating the form's value
based on the URL, I had to move every function involving the form or the URL into this file - which turns out to be
pretty much all of them.  While I tried to modularize my code and avoid spaghetti code, I still ended up with this
monstrosity of a file.  Maybe in the future Next will remove this rather odd limitation, but for now,
this is what I have.

*/

export default function GetEthValueFromParam({ ethConversionRate }) {
  const [ethValue, setEthValue] = useState(0.001);

  //seriously what the heck is the next compiler.  useSearchParams could be null?  don't you think I already handled that?
  const p = useSearchParams() || new URLSearchParams();
  const ethValueRawFromParams = p.get("ethValue");
  //this function will only run once, on load.  if no params are present, default to 0.001
  useEffect(() => {
    if (ethValueRawFromParams) {
      setEthValue(+ethValueRawFromParams);
    }

    getMarketCloseTime();
  }, [ethValueRawFromParams]);

  /*
  While marketCloseTime doesn't need any ethValues, I did want it to be above the copy link to url text.
  So, it had to go in this file.  It's a bit of a mess, but it works.
  */
  const [marketCloseTime, setMarketCloseTime] = useState(new Date(0));
  const getMarketCloseTime = async () => {
    const marketCloseTimeRaw: polygonResponseType =
      await fetchPolygonResponse();

    if (!marketCloseTimeRaw.results) {
      setMarketCloseTime(new Date(0));
    } else {
      setMarketCloseTime(new Date(marketCloseTimeRaw.results[0].t));
    }
  };

  //https://stackoverflow.com/a/72415437/12981681
  function handleForm(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const ethFormValue = e.currentTarget.value;
    console.log(e.currentTarget.value);

    !isNaN(+ethFormValue) ? setEthValue(+ethFormValue) : setEthValue(0);
  }

  function copy(currentLink: string) {
    navigator.clipboard.writeText(currentLink);
  }

  return (
    <Suspense>
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

          <Text>= ${(ethConversionRate * ethValue).toFixed(3)}</Text>
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
    </Suspense>
  );
}
