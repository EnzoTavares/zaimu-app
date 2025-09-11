import api from "@/src/lib/api/axios";
import {HttpResponse} from "@/src/types/HttpResponse";
import axios from "axios";

export async function resetPasswordCode (credential:string):Promise<HttpResponse> {
    try {
        const response = await api.post<HttpResponse>(`/auth/reset-password/${credential}`);

        return response.data.object
            ? { status: response.data.status, object: response.data.object }
            : { status: response.data.status, message: response.data.message };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const errorResponse = error.response.data as HttpResponse;

                const apiErrorMessage = errorResponse.message || 'Ocorreu um erro ao enviar o código.';
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

export async function resetPassword (credential:string, confirmationCode:string, newPassword:string): Promise<HttpResponse> {
    try {
        const response = await api.post<HttpResponse>(
            `/auth/reset-password/${credential}?code=${confirmationCode}&newPassword=${newPassword}`
        );

        return response.data.object
            ? { status: response.data.status, object: response.data.object }
            : { status: response.data.status, message: response.data.message };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const errorResponse = error.response.data as HttpResponse;

                const apiErrorMessage = errorResponse.message || 'Ocorreu um erro ao redefinir a senha.';
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

export async function resendCode (credential:string): Promise<HttpResponse> {
    try {
        const response = await api.post<HttpResponse>(`/auth/reset-password/${credential}`);

        return response.data.object
            ? { status: response.data.status, object: response.data.object }
            : { status: response.data.status, message: response.data.message };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const errorResponse = error.response.data as HttpResponse;

                const apiErrorMessage = errorResponse.message || 'Ocorreu um erro ao reenviar o código.';
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