import api from "@/src/lib/api/axios";
import axios from "axios";
import {HttpResponse} from "@/src/types/HttpResponse";
import {router} from "expo-router";

interface AuthResponse {
    userToken: string;
    appToken: string;
    refreshToken: string;
    user: {
        userId: string;
        uuid: string;
        email: string;
        givenName: string;
        familyName: string;
        nickname: string;
    };
}

interface LoginResult {
    success: boolean;
    data?: AuthResponse;
    message?: string;
}

export const loginUser = async (credential: string, password: string): Promise<LoginResult> => {
    const loginData = credential.includes('@')
        ? { email: credential, password: password }
        : { nickname: credential, password: password };

    try {
        const response = await api.post<HttpResponse>(`/auth/login`, loginData);

        const httpResponse = response.data;

        router.replace('/main_page')

        return {
            success: true,
            data: httpResponse.object as AuthResponse,
        };

    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const errorResponse = error.response.data as HttpResponse;

                const apiErrorMessage = errorResponse.message || 'Ocorreu um erro ao tentar fazer login.';
                console.error('Erro da API:', errorResponse);

                return { success: false, message: apiErrorMessage };
            }

            else if (axios.isAxiosError(error) && error.request) {
                console.error('Erro de rede:', error.request);
                return { success: false, message: 'Não foi possível se conectar ao servidor. Verifique sua internet.' };
            }
        }
        console.error('Erro inesperado:', error);
        return { success: false, message: 'Ocorreu um erro inesperado.' };
    }
};