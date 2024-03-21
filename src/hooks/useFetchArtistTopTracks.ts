/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import api from "../setup/api";


interface FetchDataQueryKey {
    id: string;
    limit?: number
}

const fetchData = async ({ queryKey }: QueryFunctionContext<[string, FetchDataQueryKey]>): Promise<Track[]> => {
    const [_, { id }] = queryKey;

    const response = await api.get(`/artists/${id}/top-tracks`);

    return response.data.tracks;
};

export function useFetchArtistTopTracks(id: string, limit: number = 10) {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ["artists-top-tracks", { id, limit }],
        retry: 3,
        enabled: !!id,
        refetchInterval: 1000 * 60 * 60,
        staleTime: 1000 * 60 * 60,
        placeholderData: [...Array(10)] as Track[]
    });

    return query
}