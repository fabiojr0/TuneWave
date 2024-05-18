/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import api from "../../setup/api";
import { QueryKeys } from "../../utils/QueryKeys";


interface FetchDataQueryKey {
    id: string;
}

const fetchData = async ({ queryKey }: QueryFunctionContext<[string, FetchDataQueryKey]>): Promise<Track[]> => {
    const [_, { id }] = queryKey;

    const response = await api.get(`/artists/${id}/top-tracks`);

    return response.data.tracks;
};

export function useFetchArtistTopTracks(id: string) {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: [QueryKeys.ArtistTopTracks, { id }],
        retry: 3,
        enabled: !!id,
        staleTime: 1000 * 60 * 60,
        placeholderData: [...Array(10)] as Track[]
    });

    return query
}