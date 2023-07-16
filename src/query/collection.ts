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
export const RenameCollection = gql`
mutation Mutation($jsonInput: String!) {
  renameCollection(json_input: $jsonInput) {
    data
    message
    success
  }
}
`;

export const GetCollection = gql`
  query GetCollection($jsonInput: String!) {
    getCollection(json_input: $jsonInput) {
      name
      id
      stories {
        id
        mentions
        usage_right
        owner_username
        owner_full_name
        owner_profile_pic_url
        owner_followers
        owner_verified
        ig_contents {
          id
          url
          width
          height
          has_audio
          duration
          display_url
          taken_at
          is_video
        }
      }
      posts {
        caption
        link
        ig_contents {
          duration
          display_url
          has_audio
          id
          height
          is_video
          taken_at
          url
          width
        }
        id
        mentions
        owner_followers
        owner_full_name
        owner_profile_pic_url
        owner_verified
        owner_username
        usage_right
      }
      reels {
        caption
        link
        id
        ig_content {
          height
          duration
          has_audio
          display_url
          id
          is_video
          taken_at
          url
          width
        }
        mentions
        owner_followers
        owner_full_name
        owner_profile_pic_url
        owner_username
        owner_verified
        usage_right
      }
      videos {
        caption
        link
        display_url
        height
        duration
        id
        owner {
          profileUrl
          nickname
          heartCount
          id
          followingCount
          followerCount
          bio
          uniqueId
          videoCount
        }
        t_id
        timestamp
        url
        usage_right
        width
      }
    }
  }
`;
