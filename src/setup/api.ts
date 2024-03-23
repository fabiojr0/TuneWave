import Axios from "axios";
import Cookies from "js-cookie";

const base_url = "https://api.spotify.com/v1";

const api = Axios.create({
    baseURL: base_url,
});

api.interceptors.request.use(
    async (config) => {
        const token = Cookies.get("access_token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        } else {
            await refreshTokens();
            config.headers["Authorization"] = `Bearer ${Cookies.get("access_token")}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;


const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

const refreshTokens = async () => {
    try {
        const refresh_token = Cookies.get("refresh_token");

        if (!refresh_token) {
            return false;
        }

        const response = await Axios.post(
            "https://accounts.spotify.com/api/token",
            {
                grant_type: "refresh_token",
                refresh_token,
                client_id: client_id,
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: "Basic " + btoa(client_id + ":" + client_secret),
                },
            }
        );

        Cookies.set("access_token", response.data.access_token, {
            expires: response.data.expires_in / 86400,
        });
        Cookies.set("refresh_token", refresh_token, {
            expires: 60,
        });

        window.location.reload();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}