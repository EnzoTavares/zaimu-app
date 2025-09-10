import axios from 'axios'
import {API_URL} from "@/src/config/env";
import {getTokens} from "@/src/lib/token/token";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000
})

api.interceptors.request.use(
    async (config) => {
        const tokens = await getTokens();
        if (tokens && tokens.accessToken) {
            config.headers.Authorization = `Bearer ${tokens.accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api