import { useQueries } from "@tanstack/react-query";
import api from "../../setup/api";
import { QueryKeys } from "../../utils/QueryKeys";

const fetchData = async (ids: string[]): Promise<boolean[]> => {
    const response = await api.get(`/me/tracks/contains`, { params: { ids: ids.join(",") } });
    return response.data;
};

export const useFetchFollowTracks = (ids: string[]) => {
    const idsChunks = [];
    for (let i = 0; i < ids.length; i += 50) {
        idsChunks.push(ids.slice(i, i + 50));
    }

    const results = useQueries({
        queries: idsChunks.map((chunk) => ({
            queryKey: [QueryKeys.TracksFollow, chunk],
            queryFn: () => fetchData(chunk),
            retry: 3,
            refetchInterval: 1000 * 60 * 1,
            enabled: !!chunk.length,
        })),
    });

    const data = results.flatMap(result => result.data || []);

    return { data, isLoading: results.some(result => result.isLoading) };
};
