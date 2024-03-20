type RouteInfo = {
    title: string;
    icon: JSX.Element;
};

type ShowsResponse<T> = {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: T;
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

type Artist = {
    external_urls: ExternalUrls;
    followers?: {
        href: null | string;
        total: number;
    };
    genres?: string[];
    href: string;
    id: string;
    images?: Image[];
    name: string;
    popularity?: number;
    type: string;
    uri: string;
};

type Album = {
    album_type: string;
    artists: Artist[];
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
};

type Track = {
    album: Album;
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
        isrc: string;
    };
    external_urls: ExternalUrls;
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
};


type Playlist = {
    collaborative: boolean;
    description: string;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    owner: User;
    primary_color: null; // Assumindo que não há mais informações sobre o tipo de dado
    public: boolean;
    snapshot_id: string;
    tracks: {
        href: string;
        total: number;
    };
    type: string;
    uri: string;
    followed?: boolean;
};

type TimeRange = 'short_term' | 'medium_term' | 'long_term';
