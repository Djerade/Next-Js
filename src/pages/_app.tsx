import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import themes from "../styles/theme";
import Layout from "@/component/Layout/Layoute";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={themes}>
        <Component {...pageProps} />
    </ChakraProvider>
  );
}