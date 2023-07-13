import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { BASE_URL } from "./constants";
import theme from "./constants/theme";
const client = new ApolloClient({
  link: createHttpLink({
    uri: BASE_URL,
    credentials: "include",
  }),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ChakraProvider theme={theme}>
    <GoogleOAuthProvider clientId="124937104161-ep6gdt00m2gd7rkshdk9u7bf86js5aaq.apps.googleusercontent.com">
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </GoogleOAuthProvider>
  </ChakraProvider>
);
