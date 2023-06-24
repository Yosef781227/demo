import { gql } from "@apollo/client";
export const GetMeQuery = gql`
  query Query {
    me {
      id
      has_tiktok
      has_instagram
      tiktoks {
        id
        uniqueId
        connected
      }
      instagrams {
        id
        username
        connected
      }
    }
  }
`;
