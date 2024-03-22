/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import api from "../setup/api";


interface FetchDataQueryKey {
    id: string;
}

const fetchData = async ({ queryKey }: QueryFunctionContext<[string, FetchDataQueryKey]>): Promise<Track> => {
    const [_, { id }] = queryKey;

    const response = await api.get(`/tracks/${id}`);

    return response.data;
};

export function useFetchTrack(id: string) {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ["tracks", { id }],
        retry: 3,
        enabled: !!id,
        staleTime: 1000 * 60 * 60,
        placeholderData: undefined,
    });

    return query
}