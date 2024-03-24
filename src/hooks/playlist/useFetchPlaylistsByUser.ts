/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import api from "../../setup/api";


interface FetchDataQueryKey {
    user_id: string;
}


const fetchData = async ({ queryKey }: QueryFunctionContext<[string, FetchDataQueryKey]>): Promise<Playlist[]> => {
    const [_, { user_id }] = queryKey;

    const response = await api.get(`/users/${user_id}/playlists`, { params: { limit: 50 } });
    
    return response.data.items;
};

export function useFetchPlaylistsByUser(user_id: string) {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ["my-playlists", { user_id }],
        retry: 1,
        staleTime: 1000 * 60 * 60,
        enabled: !!user_id,
        placeholderData: [...Array(10)] as Playlist[],
    });

    return query
}