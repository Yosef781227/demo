import { gql } from "@apollo/client";
export const FilterContent = gql`
  query FilterContents($filterContentsJsonInput: String!) {
    filterContents(json_input: $filterContentsJsonInput) {
      success
      message
      id
      tiktoks {
        id
        uniqueId
        followerCount
        followingCount
        heartCount
        videoCount
        profilePic
        nickname
        bio
        videos {
          id
          t_id
          width
          height
          duration
          caption
          timestamp
          usage_right
          display_url
          url
          owner {
            id
            uniqueId
            followerCount
            followingCount
            heartCount
            videoCount
            profileUrl
            nickname
            bio
          }
        }
      }
      instagrams {
        id
        full_name
        username
        profile_pic_url
        followers
        following
        posts_count
        reels_count
        stories_count
        posts {
          id
          caption
          mentions
          owner_username
          owner_full_name
          owner_profile_pic_url
          owner_followers
          owner_verified
          usage_right
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
        reels {
          id
          caption
          mentions
          usage_right
          owner_username
          owner_full_name
          owner_profile_pic_url
          owner_followers
          owner_verified
          ig_content {
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
      }
    }
  }
`;
