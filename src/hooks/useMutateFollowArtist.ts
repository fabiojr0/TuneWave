/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../setup/api";

const putData = async (data: { artist_id: string, follow: boolean }) => {
    if (data.follow) {
        return await api.delete(`/me/following`, { params: { type: "artist", ids: data.artist_id } });
    }

    return await api.put(`/me/following`, null, { params: { type: "artist", ids: data.artist_id } });

};

export function useMutateFollowArtist() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: putData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["artist-follow"] });
        }
    });

    return mutate
}