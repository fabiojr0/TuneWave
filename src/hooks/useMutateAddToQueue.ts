/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import api from "../setup/api";

const postData = async (uri: string) => {
    const response = await api.post(`/me/player/queue`, {
        uri
    });
    console.log(response);

    if (response.status === 404) {
        return { response: false, message: "Device not found" };
    }
    if (response.status === 204) {
        return { response: true, message: "Track added to queue" };
    }

    return { response: false, message: "Error" };
};

export function useMutateAddToQueue() {
    const mutate = useMutation({
        mutationFn: postData,
    });

    return mutate
}