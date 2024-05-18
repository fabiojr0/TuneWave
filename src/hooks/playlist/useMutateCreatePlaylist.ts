/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../setup/api";
import { QueryKeys } from "../../utils/QueryKeys";

const putData = async (data: {
    user_id: string, uris: string[],
    name: string,
    description: string,
    public: boolean,
}) => {
    const { user_id, uris, name, description, public: isPublic } = data;

    const response = await api.post(`/users/${user_id}/playlists`, { name, description, public: isPublic });

    const playlist_id = response.data.id;

    await api.post(`/playlists/${playlist_id}/tracks`, { uris });

    return playlist_id
};

export function useMutateCreatePlaylist() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: putData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.MePlaylists] });
        }
    });

    return mutate
}