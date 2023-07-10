import { gql } from "@apollo/client";

export const RenameCollectionMutation = gql`
  mutation RenameCollection($jsonInput: String!) {
    renameCollection(json_input: $jsonInput) {
      data
      message
      success
    }
  }
`;

export const DeleteCollection = gql`
  mutation DeleteCollection($jsonInput: String!) {
    deleteCollection(json_input: $jsonInput) {
      data
      message
      success
    }
  }
`;
