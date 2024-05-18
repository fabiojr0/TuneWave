import { useQuery } from "@tanstack/react-query";
import api from "../setup/api";
import { AxiosPromise } from "axios";
import { QueryKeys } from "../utils/QueryKeys";


const fetchData = async (): AxiosPromise<User> => {
    const response = await api.get(`/me`);
    return response;
};

export function useUserData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: [QueryKeys.UserData],
        staleTime: 1000 * 60 * 60,
        retry: 1,
        
    });

    return query
}