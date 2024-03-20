import { useQuery } from "@tanstack/react-query";
import api from "../setup/api";
import { AxiosPromise } from "axios";

const fabiojr0_id = "21sgcpvydztoxlgbj7ay3u2la";

const fetchData = async (): AxiosPromise<ShowsResponse<Playlist[]>> => {
    const response = await api.get(`/users/${fabiojr0_id}/playlists`, { params: { limit: 50 } });

    return response;
};

export function useFetchPlaylists() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ["myPlaylists"],
        retry: 3,
        refetchInterval: 1000 * 60 * 60,

    });

    return query
}