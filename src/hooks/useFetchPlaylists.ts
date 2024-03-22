import { useQuery } from "@tanstack/react-query";
import api from "../setup/api";

const fabiojr0_id = "21sgcpvydztoxlgbj7ay3u2la";

const fetchData = async (): Promise<Playlist[]> => {
    const response = await api.get(`/users/${fabiojr0_id}/playlists`, { params: { limit: 50 } });
    
    return response.data.items;
};

export function useFetchPlaylists() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ["my-playlists"],
        retry: 3,
        staleTime: 1000 * 60 * 60,
        placeholderData: [...Array(10)] as Playlist[]
    });

    return query
}