/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import api from "../../setup/api";
import { QueryKeys } from "../../utils/QueryKeys";


interface FetchDataQueryKey {
    seed_genres: string[] | null;
    seed_artists: string[] | null;
    seed_tracks: string[] | null;
    limit?: number;
}

const fetchData = async ({ queryKey }: QueryFunctionContext<[string, FetchDataQueryKey]>): Promise<Track[]> => {
    const [_, { seed_genres, seed_artists, seed_tracks, limit }] = queryKey;

    const response = await api.get(`/recommendations`, {
        params: {
            limit,
            seed_artists: seed_artists?.join(",") || null,
            seed_genres: seed_genres?.join(",") || null,
            seed_tracks: seed_tracks?.join(",") || null,
        },
    });

    return response.data.tracks;
};

export function useFetchRecommendations(seed_genres: string[] | null,
    seed_artists: string[] | null,
    seed_tracks: string[] | null,
    limit: number = 50) {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: [QueryKeys.Reccomendations, { seed_genres, seed_artists, seed_tracks, limit }],
        placeholderData: [...Array(10)] as Track[],
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        enabled: !!seed_genres || !!seed_artists || !!seed_tracks,
        refetchOnReconnect: false,
    });

    return query
}