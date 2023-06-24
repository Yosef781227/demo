import { gql } from "@apollo/client";

export const GetTiktokQuery = gql`
  query Query($jsonInput: String!) {
    getTikTokAccount(json_input: $jsonInput) {
      videos {
        id
        t_id
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
