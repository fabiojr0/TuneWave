/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import api from "../setup/api";


interface FetchDataQueryKey {
    seed_genres: string[] | null;
    seed_artists: string[] | null;
    seed_tracks: string[] | null;
}

const fetchData = async ({ queryKey }: QueryFunctionContext<[string, FetchDataQueryKey]>): Promise<Track[]> => {
    const [_, { seed_genres, seed_artists, seed_tracks }] = queryKey;

    const response = await api.get(`/recommendations`, {
        params: {
            limit: 50,
            seed_artists: seed_artists?.join(",") || null,
            seed_genres: seed_genres?.join(",") || null,
            seed_tracks: seed_tracks?.join(",") || null,
        },
    });
    console.log(response.data);

    return response.data.tracks;
};

export function useFetchRecommendations(seed_genres: string[] | null,
    seed_artists: string[] | null,
    seed_tracks: string[] | null) {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ["reccomendations", { seed_genres, seed_artists, seed_tracks }],
        retry: 3,
        refetchInterval: 1000 * 60 * 60,
        placeholderData: [...Array(10)] as Track[]
    });

    return query
}