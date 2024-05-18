/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import api from "../../setup/api";
import { QueryKeys } from "../../utils/QueryKeys";

const fetchData = async (): Promise<Playlist[]> => {
    const response = await api.get(`/me/playlists`, { params: { limit: 50 } });

    return response.data.items;
};

export function useFetchUserPlaylists() {

    const query = useQuery({
        queryFn: fetchData,
        queryKey: [QueryKeys.MePlaylists],
        retry: 1,
        refetchInterval: 1000 * 60 * 1,
    });

    return query
}