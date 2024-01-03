package com.example.whatthekey.model

data class SpotifyTracksSearchResult(
    val tracks: Tracks
)

data class Tracks(
    val href: String,
    val limit: Int,
    val next: String,
    val offset: Int,
    val previous: String,
    val total: Int,
    val items: List<SpotifyItem>
)

data class SpotifyItem(
    val album: SpotifyAlbum,
    val artists: List<SpotifyArtist>,
    val available_markets: List<String>,
    val disc_number: Int,
    val duration_ms: Int,
    val explicit: Boolean,
    val external_ids: SpotifyExternalIds,
    val external_urls: SpotifyExternalUrls,
    val href: String,
    val id: String,
    val is_playable: Boolean,
    val linked_from: Any?, // Replace 'Any' with a more specific type if needed
    val restrictions: SpotifyRestrictions,
    val name: String,
    val popularity: Int,
    val preview_url: String,
    val track_number: Int,
    val type: String,
    val uri: String,
    val is_local: Boolean
)

data class SpotifyAlbum(
    val album_type: String,
    val total_tracks: Int,
    val available_markets: List<String>,
    val external_urls: SpotifyExternalUrls,
    val href: String,
    val id: String,
    val images: List<SpotifyImage>,
    val name: String,
    val release_date: String,
    val release_date_precision: String,
    val restrictions: SpotifyRestrictions,
    val type: String,
    val uri: String,
    val artists: List<SpotifyArtist>
)

data class SpotifyArtist(
    val external_urls: SpotifyExternalUrls,
    val followers: SpotifyFollowers?,
    val genres: List<String>?,
    val href: String,
    val id: String,
    val images: List<SpotifyImage>?,
    val name: String,
    val popularity: Int,
    val type: String,
    val uri: String
)

data class SpotifyExternalUrls(
    val spotify: String
)

data class SpotifyImage(
    val url: String,
    val height: Int,
    val width: Int
)

data class SpotifyRestrictions(
    val reason: String
)

data class SpotifyExternalIds(
    val isrc: String?,
    val ean: String?,
    val upc: String?
)

data class SpotifyFollowers(
    val href: String?,
    val total: Int
)

data class AudioFeatures(
    val acousticness: Double,
    val analysis_url: String,
    val danceability: Double,
    val duration_ms: Int,
    val energy: Double,
    val id: String,
    val instrumentalness: Double,
    val key: Int,
    val liveness: Double,
    val loudness: Double,
    val mode: Int,
    val speechiness: Double,
    val tempo: Double,
    val time_signature: Int,
    val track_href: String,
    val type: String,
    val uri: String,
    val valence: Double
)


data class RandomTrack(
    val tracks: List<Track>,
    val seeds: List<SpotifySeed>
)

data class Track(
    val album: SpotifyAlbum,
    val artists: List<SpotifyArtist>,
    val available_markets: List<String>,
    val disc_number: Int?, // Assuming this is nullable
    val duration_ms: Int?,
    val explicit: Boolean,
    val external_ids: ExternalIds,
    val external_urls: ExternalUrls,
    val href: String?,
    val id: String?,
    val is_local: Boolean,
    val name: String?,
    val popularity: Int?,
    val preview_url: String?,
    val track_number: Int?,
    val type: String?,
    val uri: String?
)
data class ExternalUrls(
    val spotify: String?
)
data class ExternalIds(
    val isrc: String?
)
data class SpotifySeed(
    val initialPoolSize: Int?,
    val afterFilteringSize: Int?,
    val afterRelinkingSize: Int?,
    val id: String?,
    val type: String?,
    val href: String?
)
