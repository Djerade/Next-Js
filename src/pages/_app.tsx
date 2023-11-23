import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import themes from "../styles/theme";
import { ApolloClient,  ApolloProvider, InMemoryCache } from "@apollo/client";


const client = new ApolloClient({
  uri:'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={themes}>
          <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}