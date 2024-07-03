"use client";
import React from "react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { Text } from "@chakra-ui/react";

export default function GetEthValueFromParam({
  ethValueInput,
  ethConversionRate,
}) {
  const [ethValue, setEthValue] = useState(0.001);

  const ethValueRawFromParams = useSearchParams().get("ethValue");

  //this function will only run once, on load.  if no params are present, default to 0.001
  useEffect(() => {
    if (ethValueRawFromParams) {
      setEthValue(+ethValueRawFromParams);
    } else {
      setEthValue(ethValueInput);
    }
  }, [ethValueRawFromParams, ethValueInput]);

  return (
    <Suspense>
      <Text>= ${(ethConversionRate * ethValue).toFixed(3)}</Text>
    </Suspense>
  );
}
