/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../setup/api";

const putData = async (playlist_id: string) => {
    return await api.put(`/playlists/${playlist_id}/followers`, {
        "public": false
    });
};

export function useMutateFollowPlaylists() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: putData,
        onSuccess: () => {
            queryClient.invalidateQueries(["fabiojr0-playlists"]);
        }
    });

    return mutate
}