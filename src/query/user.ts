import { gql } from "@apollo/client";
export const GetMeQuery = gql`
  query Query {
    me {
      id
      has_tiktok
      email
      name
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

export const GetUserCollection = gql`
  query GetUserCollections {
    me {
      collections {
        id
        name
      }
    }
  }
`;

export const CreateUserCollection = gql`
  mutation Mutation($jsonInput: String!) {
    createCollection(json_input: $jsonInput) {
      data
      message
      success
    }
  }
`;
