export interface SpotifyTracksSearchResult {
    tracks: {
        href: string;
        limit: number;
        next: string;
        offset: number;
        previous: string;
        total: number;
        items: SpotifyItem[];
    };
}
export interface SpotifyItem {
    album: SpotifyAlbum;
    artists: SpotifyArtist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: SpotifyExternalIds;
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    is_playable: boolean;
    linked_from?: any;
    restrictions: SpotifyRestrictions;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
}
export interface SpotifyAlbum {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions: SpotifyRestrictions;
    type: string;
    uri: string;
    artists: SpotifyArtist[];
}
export interface SpotifyArtist {
    external_urls: SpotifyExternalUrls;
    followers?: SpotifyFollowers;
    genres?: string[];
    href: string;
    id: string;
    images?: SpotifyImage[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}
export interface SpotifyExternalUrls {
    spotify: string;
}
export interface SpotifyImage {
    url: string;
    height: number;
    width: number;
}
export interface SpotifyRestrictions {
    reason: string;
}
export interface SpotifyExternalIds {
    isrc?: string;
    ean?: string;
    upc?: string;
}
export interface SpotifyFollowers {
    href?: string;
    total: number;
}
export interface TrackData {
    audioFeatures: AudioFeatures | TrackDataDetailed;
    track: SpotifyItem;
}
export interface TrackDataDetailed {
    meta: {
        analyzer_version: string;
        platform: string;
        detailed_status: string;
        status_code: number;
        timestamp: number;
        analysis_time: number;
        input_process: string;
    };
    track: TrackDetails;
    bars: Bar[];
    beats: Beat[];
    sections: Section[];
    segments: Segment[];
    tatums: Tatum[];
}
export interface TrackDetails {
    num_samples: number;
    duration: number;
    sample_md5: string;
    offset_seconds: number;
    window_seconds: number;
    analysis_sample_rate: number;
    analysis_channels: number;
    end_of_fade_in: number;
    start_of_fade_out: number;
    loudness: number;
    tempo: number;
    tempo_confidence: number;
    time_signature: number;
    time_signature_confidence: number;
    key: number;
    key_confidence: number;
    mode: number;
    mode_confidence: number;
    codestring: string;
    code_version: number;
    echoprintstring: string;
    echoprint_version: number;
    synchstring: string;
    synch_version: number;
    rhythmstring: string;
    rhythm_version: number;
}
export interface Bar {
    start: number;
    duration: number;
    confidence: number;
}
export interface Beat {
    start: number;
    duration: number;
    confidence: number;
}
export interface Section {
    start: number;
    duration: number;
    confidence: number;
    loudness: number;
    tempo: number;
    tempo_confidence: number;
    key: number;
    key_confidence: number;
    mode: number;
    mode_confidence: number;
    time_signature: number;
    time_signature_confidence: number;
}
export interface Tatum {
    start: number;
    duration: number;
    confidence: number;
}
export interface Segment {
    start: number;
    duration: number;
    confidence: number;
    loudness_start: number;
    loudness_max: number;
    loudness_max_time: number;
    loudness_end: number;
    pitches: number[];
    timbre: number[];
}
export interface AudioFeatures {
    acousticness: number;
    analysis_url: string;
    danceability: number;
    duration_ms: number;
    energy: number;
    id: string;
    instrumentalness: number;
    key: number;
    liveness: number;
    loudness: number;
    mode: number;
    speechiness: number;
    tempo: number;
    time_signature: number;
    track_href: string;
    type: string;
    uri: string;
    valence: number;
}
export declare const genres: {
    genres: string[];
};
export interface RandomTrack {
    tracks: [
        {
            album: SpotifyAlbum;
            artists: SpotifyArtist[];
            available_markets: string[];
            disc_number: number | null;
            duration_ms: number | null;
            explicit: boolean;
            external_ids: string[];
            external_urls: {
                spotify: string | null;
            };
            href: string | null;
            id: string | null;
            is_local: boolean;
            name: string | null;
            popularity: number | null;
            preview_url: string | null;
            track_number: number | null;
            type: string | null;
            uri: string | null;
        }
    ];
    seeds: SpotifySeed[];
}
export interface SpotifySeed {
    initialPoolSize: number | null;
    afterFilteringSize: number | null;
    afterRelinkingSize: number | null;
    id: string | null;
    type: string | null;
    href: null | string;
}
