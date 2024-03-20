import Axios from "axios";
import Cookies from "js-cookie";

const base_url = "https://api.spotify.com/v1";

const api = Axios.create({
    baseURL: base_url,
    headers: {
        Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
});

export default api;