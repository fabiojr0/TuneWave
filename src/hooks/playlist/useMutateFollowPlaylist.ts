/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../setup/api";
import { QueryKeys } from "../../utils/QueryKeys";

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
            queryClient.invalidateQueries({ queryKey: [QueryKeys.Playlists] });
            queryClient.invalidateQueries({ queryKey: [QueryKeys.MePlaylists] });
            queryClient.invalidateQueries({ queryKey: [QueryKeys.UserPlaylists] });
        }
    });

    return mutate
}