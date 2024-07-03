import { Box, HStack, VStack } from "@chakra-ui/react";
import Image from "next/image";

import nextLogo from "../public/next.svg";
import vercelLogo from "../public/vercel.svg";
import polygonLogo from "../public/polygon-io.svg";
import alchemyLogo from "../public/alchemy.svg";

function Footer() {
  return (
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
          document.getElementById("animated-ribbon").style.backgroundPosition =
            "0% 0%";
        }}
        onMouseLeave={() => {
          document.getElementById("animated-ribbon").style.backgroundPosition =
            "100% 100%";
        }}
      >
        <Image
          src={nextLogo}
          alt="Next.js Logo"
          className="h-auto w-1/12 pl-4"
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
          className="h-auto w-1/12 p-4"
        />
      </HStack>
    </VStack>
  );
}

export default Footer;
