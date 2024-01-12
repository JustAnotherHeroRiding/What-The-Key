// services/trackService.js
import { useContext } from 'react';
import { SessionContext } from '../utils/Context/Session/SessionContext';
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-root-toast';



export interface addTrackProps {
    trackId: string;
    source: string;
}
export interface TrackConnection {
    id: string;
    libraryUserId: number;
    recycleBinUserId: number;
}

const useTrackService = () => {
    const session = useContext(SessionContext);

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

    const { mutate: addTrackMut } = useMutation({
        mutationFn: addTrack,
        onSuccess: () => {
            Toast.show('Track successfully added to the library', {
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
            Toast.show(error instanceof Error ? error.message : "An Unknown error occured.", {
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

    const fetchTracks = async (location: string) => {
        // Implementation
    };

    const deleteTrack = async (trackId: string, location: string) => {
        // Implementation
    };

    // More track-related functions

    return {
        addTrackMut,
        fetchTracks,
        deleteTrack,
        // Export other functions
    };
};

export default useTrackService;
