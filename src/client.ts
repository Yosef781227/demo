import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
} from "@apollo/client";
import { BASE_URL } from "./constants";
const client = new ApolloClient({
    link: createHttpLink({
        uri: BASE_URL,
        credentials: "include",
    }),
    cache: new InMemoryCache(),
});
export default client;