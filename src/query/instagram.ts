import { gql } from "@apollo/client";
export const GetInstagramQuery = gql`
  query Query($jsonInput: String!) {
    getInstagramAccount(json_input: $jsonInput) {
      connected
      followers
      full_name
      id
      posts {
        owner_username
        owner_profile_pic_url
        owner_full_name
        owner_followers
        link
        id
        caption
        ig_contents {
          display_url
          id
          is_video
          url
        }
      }
      reels {
        id
        link
        caption
        owner_username
        owner_full_name
        owner_profile_pic_url
        owner_followers
        ig_content {
          display_url
          url
          is_video
          id
        }
      }
      stories {
        owner_username
        owner_profile_pic_url
        owner_full_name
        owner_followers
        id
        ig_contents {
          url
          display_url
          id
          is_video
        }
      }
    }
  }
`;
