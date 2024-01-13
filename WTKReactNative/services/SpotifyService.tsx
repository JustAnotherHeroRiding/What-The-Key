import { SpotifyTracksSearchResult } from "../utils/spotify-types";

interface SearchProps {
    queryString: string;
}


const useSpotifyService = () => {

    const searchTracks = async ({ queryString }: SearchProps): Promise<SpotifyTracksSearchResult> => {
        const response = await fetch(
            `https://what-the-key.vercel.app/api/spotify/search?query=${queryString}`
        );

        const data: SpotifyTracksSearchResult = await response.json()

        return data
    }

    const fetchRandomTrack = async () => {
        const response = await fetch(
            "https://what-the-key.vercel.app/api/spotify/random-guitar-track"
        );
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error fetching track");
        }
        const responseExtended = await fetch(
            `https://what-the-key.vercel.app/api/spotify/track/${data.tracks[0].id}`
        );
        const dataExtended = await responseExtended.json();

        if (!responseExtended.ok) {
            throw new Error(dataExtended.message || "Error fetching track");
        }

        return dataExtended
    };

    return {
        searchTracks,
        fetchRandomTrack
    };
}


export default useSpotifyService
