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
          taken_at
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
          taken_at
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
          taken_at
        }
      }
    }
  }
`;

const AddPostToCollection = gql`
  mutation Mutation($jsonInput: String!) {
    addPostToCollection(json_input: $jsonInput) {
      data
      message
      success
    }
  }
`;

const RemovePostFromCollection = gql`
  mutation Mutation($jsonInput: String!) {
    removePostFromCollection(json_input: $jsonInput) {
      data
      message
      success
    }
  }
`;

const AddReelToCollection = gql`
  mutation Mutation($jsonInput: String!) {
    addReelToCollection(json_input: $jsonInput) {
      success
      message
      data
    }
  }
`;

const RemoveReelFromCollection = gql`
  mutation Mutation($jsonInput: String!) {
    removeReelFromCollection(json_input: $jsonInput) {
      success
      message
      data
    }
  }
`

export const AddStoryToCollection = gql`
  mutation Mutation($jsonInput: String!) {
    addStoryToCollection(json_input: $jsonInput) {
      success
      message
      data
    }
  }
`;

export const RemoveStoryFromCollection = gql`
  mutation Mutation($jsonInput: String!) {
    removeStoryFromCollection(json_input: $jsonInput) {
      success
      message
      data
    }
  }
`

export const InstagramCollectionMutation = {
  addPostToCollection: AddPostToCollection,
  removePostFromCollection: RemovePostFromCollection,
  addReelToCollection: AddReelToCollection,
  removeReelFromCollection: RemoveReelFromCollection,
  addStoryToCollection: AddStoryToCollection,
  removeStoryFromCollection: RemoveStoryFromCollection,
}
