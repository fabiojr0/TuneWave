import { useQuery } from "@tanstack/react-query";
import api from "../setup/api";
import { AxiosPromise } from "axios";


const fetchData = async (): AxiosPromise<User> => {
    const response = await api.get(`/me`);
    return response;
};

export function useUserData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ["me"],
        staleTime: 1000 * 60 * 60,

    });

    return query
}