import { gql } from "@apollo/client";

export const GetTiktokQuery = gql`
  query Query($jsonInput: String!) {
    getTikTokAccount(json_input: $jsonInput) {
      videos {
        id
        t_id
        link
        timestamp
        width
        height
        duration
        display_url
        url
        usage_right
        caption
        owner {
          id
          uniqueId
          nickname
          profileUrl
          followerCount
          followingCount
          bio
          videoCount
          heartCount
        }
      }
    }
  }
`;

export const AddVideoToCollection = gql`
  mutation Mutation($jsonInput: String!) {
    addPostToCollection(json_input: $jsonInput) {
      success
      message
      data
    }
  }
`;

export const RemoveVideoFromCollection = gql`
  mutation Mutation($jsonInput: String!) {
    removePostFromCollection(json_input: $jsonInput) {
      success
      message
      data
    }
  }
`

