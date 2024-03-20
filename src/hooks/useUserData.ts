import { useQuery } from "@tanstack/react-query";
import api from "../setup/api";
import { AxiosPromise } from "axios";


const fetchMyInfos = async (): AxiosPromise<User> => {
    const response = await api.get(`/me`);
    return response;
};

export function useUserData() {
    const query = useQuery({
        queryFn: fetchMyInfos,
        queryKey: ["me"],
    });

    return query
}