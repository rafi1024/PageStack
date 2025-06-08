"use client";
import { ApolloProvider as Provider, InMemoryCache, ApolloClient } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/", // Updated GraphQL endpoint
  cache: new InMemoryCache(),
});

export default function ApolloProvider({ children }) {
  return <Provider client={client}>{children}</Provider>;
} 