/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import api from "../setup/api";


interface FetchDataQueryKey {
    ids: string[];
}

const fetchData = async ({ queryKey }: QueryFunctionContext<[string, FetchDataQueryKey]>): Promise<boolean[]> => {
    const [_, { ids }] = queryKey;

    const response = await api.get(`/me/following/contains`, { params: { type: "artist", ids: ids.join(",") } });

    return response.data;
};

export function useFetchFollowArtist(ids: string[]) {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ["artist-follow", { ids }],
        retry: 3,
        refetchInterval: 1000 * 60 * 1,
        enabled: !!ids && ids.length > 0,
    });

    return query
}