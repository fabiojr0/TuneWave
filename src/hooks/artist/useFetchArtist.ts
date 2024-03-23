/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import api from "../../setup/api";


interface FetchDataQueryKey {
    id: string;
}

const fetchData = async ({ queryKey }: QueryFunctionContext<[string, FetchDataQueryKey]>): Promise<Artist> => {
    const [_, { id }] = queryKey;

    const response = await api.get(`/artists/${id}`);

    return response.data;
};

export function useFetchArtist(id: string) {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ["artist", { id }],
        retry: 3,
        enabled: !!id,
        staleTime: 1000 * 60 * 60,
        placeholderData: undefined,
    });

    return query
}