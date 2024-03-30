/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import api from "../../setup/api";


interface FetchDataQueryKey {
    playlist_id: string;
}


const fetchData = async ({ queryKey }: QueryFunctionContext<[string, FetchDataQueryKey]>): Promise<Playlist> => {
    const [_, { playlist_id }] = queryKey;

    const response = await api.get(`/playlists/${playlist_id}`);

    return response.data;
};

export function useFetchPlaylist(playlist_id: string) {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ["playlist", { playlist_id }],
        retry: 1,
        staleTime: 1000 * 60 * 60,
        enabled: !!playlist_id,
        placeholderData: undefined
    });

    return query
}