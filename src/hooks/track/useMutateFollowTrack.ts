/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../setup/api";

const putData = async (data: { track_id: string, follow: boolean }) => {
    if (data.follow) {
        return await api.delete(`/me/tracks`, { params: { type: "artist", ids: data.track_id } });
    }

    return await api.put(`/me/tracks`, null, { params: { type: "artist", ids: data.track_id } });

};

export function useMutateFollowTrack() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: putData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tracks-follow"] });
        }
    });

    return mutate
}