import { useState } from "react";

export default function useGetInstagramData(
  instagramData: any,
  isLoading: boolean
): any[] {
  //TODO: Err handling
  if (isLoading || !instagramData) {
    return [];
  }
  const instaposts: [] = instagramData?.getInstagramAccount?.posts;

  let posts: any[] = [];

  instaposts.forEach((post) => {
    const { ig_contents }: { ig_contents: [] } = post;
    const {
      owner_username,
      owner_profile_pic_url,
      owner_full_name,
      owner_followers,
      caption,
      id,
    }: {
      owner_username: string;
      owner_profile_pic_url: string;
      owner_full_name: string;
      owner_followers: number;
      caption: string | null;
      id: string;
    } = post;
    posts = [
      ...posts,
      ...ig_contents.map((content) => {
        return {
          owner_username,
          owner_profile_pic_url,
          owner_full_name,
          owner_followers,
          id,
          caption,
          ig_content: content,
        };
      }),
    ];
  });

  const instastories: [] = instagramData.getInstagramAccount.stories;
  let stories: any[] = [];

  instastories.forEach((story) => {
    const { ig_contents }: { ig_contents: [] } = story;
    const {
      owner_username,
      owner_profile_pic_url,
      owner_full_name,
      owner_followers,
      id,
    }: {
      owner_username: string;
      owner_profile_pic_url: string;
      owner_full_name: string;
      owner_followers: number;
      id: string;
    } = story;

    stories = [
      ...stories,
      ...ig_contents.map((content) => {
        return {
          owner_username,
          owner_profile_pic_url,
          owner_full_name,
          owner_followers,
          id,
          ig_content: content,
        };
      }),
    ];
  });
  const { connected, followers, full_name, id } =
    instagramData.getInstagramAccount;
  return [...stories, ...posts, ...instagramData.getInstagramAccount.reels];
}
