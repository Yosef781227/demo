export const ModifyInstagramData = (instagramData: any, isLoading: boolean): any[] => {
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
            link,
            caption,
            id,
        }: {
            owner_username: string;
            owner_profile_pic_url: string;
            owner_full_name: string;
            owner_followers: number;
            link: string;
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
                    link,
                    type: "post",
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
                    type: "story",
                    ig_content: content,
                };
            }),
        ];
    });
    let reels: any[] = [];
    if (instagramData.getInstagramAccount.reels != null) {
        instagramData.getInstagramAccount.reels.forEach((reel: any) => {
            reels = [
                ...reels,
                {
                    ...reel,
                    type: "reel"
                }
            ]
        })
    }
    return [...stories, ...posts, ...reels];
}

export const ModifyTikTokData = (data: any, isLoading: boolean): any[] => {
    //TODO: Err handling
    if (isLoading || !data) {
        return [];
    }
    return data?.getTikTokAccount?.videos ?? [];
}

export const ModifyFilterInstagramData = (instagrams: any): any[] => {
    return instagrams?.map((instagram: any, i: any) => {
        const instaposts: [] = instagram.posts == 0 ? [] : instagram.posts;

        let posts: any[] = [];

        instaposts.forEach((post) => {
            const { ig_contents }: { ig_contents: [] } = post;
            const {
                owner_username,
                owner_profile_pic_url,
                owner_full_name,
                owner_followers,
                link,
                caption,
                id,
            }: {
                owner_username: string;
                owner_profile_pic_url: string;
                owner_full_name: string;
                owner_followers: number;
                link: string;
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
                        link,
                        type: "post",
                        ig_content: content,
                    };
                }),
            ];
        });

        const instastories: [] = instagram.stories == null ? [] : instagram.stories;
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
                        type: "story",
                        ig_content: content,
                    };
                }),
            ];
        });
        let reels: any[] = [];
        if (instagram.reels != null) {
            instagram.reels.forEach((reel: any) => {
                reels = [
                    ...reels,
                    {
                        ...reel,
                        type: "reel"
                    }
                ]
            })
        }
        return [...stories, ...posts, ...reels];
    });
}

export const ModifyFilterTikTokData = (tiktoks: any[]): any[] => {
    let videos: any[] = [];
    tiktoks.forEach((tiktok) => {
        videos = [
            ...videos,
            ...tiktok.videos
        ]
    });
    return videos;
}

