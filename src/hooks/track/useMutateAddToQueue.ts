/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import api from "../../setup/api";

type mutateAddToQueueRespose = {
    response: boolean,
    message: string
}


const postData = async (uri: string): Promise<mutateAddToQueueRespose> => {
    try {
        const response = await api.post(`/me/player/queue?uri=${uri}`);

        if (response.status === 204) {
            return { response: true, message: "Track added to queue" };
        }

        return { response: false, message: "Error" };
    } catch (error: any) {
        const message = error.response.status === 404 ? "Device not found" : "Error";
        return Promise.reject({ response: false, message });
    }
};


export function useMutateAddToQueue() {
    const mutate = useMutation({
        mutationFn: postData,
    });

    return mutate
}