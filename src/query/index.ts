import { gql } from "@apollo/client";
export const FilterContent = gql`
  query FilterContents($filterContentsJsonInput2: String!) {
    filterContents(json_input: $filterContentsJsonInput2) {
      #id
      instagrams {
        followers
        following
        full_name
        id
        posts {
          caption
          id
          mentions
          owner_followers
          owner_full_name
          owner_username
          owner_profile_pic_url
          owner_verified
          usage_right
          ig_contents {
            display_url
            duration
            has_audio
            height
            id
            is_video
            url
            taken_at
            width
          }
        }
        posts_count
        reels_count
        stories_count
        username
        profile_pic_url
        reels {
          caption
          id
          ig_content {
            display_url
            duration
            has_audio
            height
            id
            is_video
            taken_at
            url
            width
          }
          owner_followers
          mentions
          owner_full_name
          owner_profile_pic_url
          owner_username
          owner_verified
          usage_right
        }
      }
      success
      message
      tiktoks {
        bio
        connected
        followerCount
        followingCount
        heartCount
        id
        nickname
        profilePic
        t_id
        uniqueId
        videoCount
        videos {
          caption
          display_url
          duration
          height
          id
          t_id
          owner {
            bio
            followerCount
            heartCount
            followingCount
            id
            nickname
            profileUrl
            uniqueId
            videoCount
          }
          timestamp
          url
          width
          usage_right
        }
      }
    }
  }
`;
