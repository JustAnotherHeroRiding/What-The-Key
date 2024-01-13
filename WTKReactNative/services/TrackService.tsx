// services/trackService.js
import { useContext } from 'react';
import { SessionContext } from '../utils/Context/Session/SessionContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-root-toast';
import { TrackData } from '../utils/spotify-types';


export type dataSource = "library" | "recycleBin";
export interface addTrackProps {
    trackId: string;
    source: dataSource
}

export interface getTracksProps {
    location: dataSource
}

export interface TrackConnection {
    id: string;
    libraryUserId: number;
    recycleBinUserId: number;
}

const useTrackService = () => {
    const session = useContext(SessionContext);
    const queryClient = useQueryClient()

    const addTrack = async ({ trackId, source }: addTrackProps): Promise<TrackConnection> => {
        const response = await fetch(
            "https://what-the-key.vercel.app/api/track/addTrack", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: session?.user.id,
                trackId,
                source
            })
        }
        );

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || "Error adding track to library");
        }

        return response.json();
    };

    const { mutate: addTrackMut, isPending: isAddingTrack } = useMutation({
        mutationFn: addTrack,
        onSuccess: (_, variables) => {
            let keysToInvalidate = [];

            if (variables.source === "recycleBin") {
                // If added to recycleBin, invalidate recycleBin and library as both lists need to be updated
                keysToInvalidate = ["recycleBin", "library"];
            } else {
                // If added elsewhere (like library), invalidate that specific cache
                keysToInvalidate = [variables.source];
            }
            keysToInvalidate.forEach(key => {
                queryClient.invalidateQueries({ queryKey: [key] });
            });
            Toast.show(`Track successfully added to the ${variables.source === 'recycleBin' ? "Deleted Tracks" : "Library"}`, {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });
        },
        onError: (error: Error) => {
            // Handle error
            Toast.show(error instanceof Error ? "Track could not be added, are you logged in?" : "An Unknown error occured.", {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
                backgroundColor: 'red'
            });
        }
    })

    const getTracks = async ({ location }: getTracksProps): Promise<TrackData[]> => {
        const queryParams = new URLSearchParams({
            userId: session?.user.id ?? "no user",
            source: location
        }).toString();

        const responseTrackIds = await fetch(
            `https://what-the-key.vercel.app/api/track/getTracks?${queryParams}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        );
        const trackIds = await responseTrackIds.json();

        if (!responseTrackIds.ok) {
            throw new Error(trackIds.message || "Error fetching track ids from database");
        }

        const trackIdsJoined = trackIds.map((track: { id: any; }) => track.id).join(',');
        const spotifyResponse = await fetch(`https://what-the-key.vercel.app/api/spotify/tracks?ids=${trackIdsJoined}
          `, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const libraryData: TrackData[] = await spotifyResponse.json()
        return libraryData

    }


    const deleteTrack = async (trackId: string) => {
        const queryParams = new URLSearchParams({
            userId: session?.user.id ?? "no user",
            trackId: trackId,
        }).toString();

        const responseTrackIds = await fetch(
            `https://what-the-key.vercel.app/api/track/deleteTrack?${queryParams}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        );
        const removedTrack = await responseTrackIds.json();

        if (!responseTrackIds.ok) {
            throw new Error(trackIds.message || "Error fetching track ids from database");
        }

        return removedTrack

    };


    return {
        addTrackMut,
        getTracks,
        deleteTrack,
        isAddingTrack
        // Export other functions
    };
};

export default useTrackService;
