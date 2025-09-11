import api from "@/src/lib/api/axios";
import axios from "axios";
import {HttpResponse} from "@/src/types/HttpResponse";

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

export async function loginUser (credential: string, password: string): Promise<HttpResponse> {
    const loginData = credential.includes('@')
        ? { email: credential, password: password }
        : { nickname: credential, password: password };

    try {
        const response = await api.post<HttpResponse>(`/auth/login`, loginData);

        return response.data.object
            ? { status: response.data.status, object: response.data.object as AuthResponse }
            : { status: response.data.status, message: response.data.message };

    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const errorResponse = error.response.data as HttpResponse;

                const apiErrorMessage = errorResponse.message || 'Ocorreu um erro ao tentar fazer login.';
                console.error('Erro da API:', errorResponse);

                return {
                    status: 1,
                    message: apiErrorMessage
                };
            }

            else if (axios.isAxiosError(error) && error.request) {
                console.error('Erro de rede:', error.request);
                return {
                    status: 1,
                    message: 'Não foi possível se conectar ao servidor. Verifique sua internet.'
                };
            }
        }
        console.error('Erro inesperado:', error);
        return {
            status: 1,
            message: 'Ocorreu um erro inesperado.'
        };
    }
}

export function validateEmail(email: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

export function validateNickname(nickname: string) { return !nickname.includes('@'); }

export function validatePassword(password: string) {
    return /^(?!^ |.* $)(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\^\$\*\.\[\]\{\}\(\)\?\-!"@#%&/\\,><':;|_~`+=]).{8,}$/.test(password);
}