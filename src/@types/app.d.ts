type ShowsResponse<T> = {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: T[];
};

type User = {
    country: string;
    display_name: string;
    email: string;
    explicit_content: {
        filter_enabled: boolean;
        filter_locked: boolean;
    };
    external_urls: {
        spotify: string;
    };
    followers: Followers;
    href: string;
    id: string;
    images: Image[];
    product: string;
    type: string;
    uri: string;
};

type ExternalUrls = {
    spotify: string;
};

type Followers = {
    href: string;
    total: number;
};

type Image = {
    url: string;
    height: number;
    width: number;
};

type Track = {
    external_urls: ExternalUrls;
    followers: Followers;
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: 'artist';
    uri: string;
};

type TimeRange = 'short_term' | 'medium_term' | 'long_term';
