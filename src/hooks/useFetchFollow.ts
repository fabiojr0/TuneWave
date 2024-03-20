/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import api from "../setup/api";
import { AxiosPromise } from "axios";


const fetchData = async ({ queryKey }): AxiosPromise<ShowsResponse<Playlist[]>> => {
    const [_, { idArray }] = queryKey;
    const ids = idArray.join(",");

    const response = await api.get(`/me/playlists`, { params: { limit: 50, ids } });
    return response;


};

export function useFetchFollowPlaylists(idArray: string[]) {
    const queryKey = ["fabiojr0-playlists", { idArray }];

    const query = useQuery({
        queryFn: fetchData,
        queryKey,
        retry: 3,
        refetchInterval: 1000 * 60 * 60,
        enabled: !!idArray && idArray.length > 0,
    });

    return query
}