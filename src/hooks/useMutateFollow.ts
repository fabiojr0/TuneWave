/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../setup/api";

const putData = async (data: { playlist_id: string, follow: boolean }) => {
    if (data.follow) {
        return await api.delete(`/playlists/${data.playlist_id}/followers`);
    }
    return await api.put(`/playlists/${data.playlist_id}/followers`);
};

export function useMutateFollowPlaylists() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: putData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fabiojr0-playlists"] });
        }
    });

    return mutate
}