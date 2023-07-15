export const ModifyInstagramData = (instagramData: any, isLoading: boolean): any[] => {
    //TODO: Err handling
    if (isLoading || !instagramData) {
        return [];
    }
    const instaposts: [] = instagramData?.posts || [];

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

    const instastories: [] = instagramData?.stories || [];
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
    if (instagramData?.reels != null) {
        instagramData.reels.forEach((reel: any) => {
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
        const instaposts: [] = instagram.posts == null ? [] : instagram.posts;

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

export const ModifyCollectionInstaContents = (collection: any, isLoading: boolean): any[] => {
    if (isLoading || !collection) {
        return [];
    }
    const instaposts: [] = collection?.posts || [];

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

    const instastories: [] = collection?.stories || [];
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
    if (collection?.reels != null) {
        collection.reels.forEach((reel: any) => {
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

export const ModifyCollectionTikTokContents = (collection: any, isLoading: boolean): any[] => {
    console.log(collection);
    if (isLoading || !collection) {
        return [];
    }

    return collection?.videos ?? [];
}

export const shortenNumber = (num: number): string => {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num + '';
}

export const timeAgo = (date: Date): string => {

    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    const intervals: { name: string, value: number }[] = [
        { name: 'year', value: 31536000 },
        { name: 'month', value: 2592000 },
        { name: 'day', value: 86400 },
        { name: 'hour', value: 3600 },
        { name: 'minute', value: 60 },
        { name: 'second', value: 1 }
    ];

    for (const interval of intervals) {
        const intervalValue = Math.floor(seconds / interval.value);
        if (intervalValue > 0) {
            return `${intervalValue} ${interval.name}${intervalValue > 1 ? 's' : ''} ago`;
        }
    }
    return 'Just now';
}
