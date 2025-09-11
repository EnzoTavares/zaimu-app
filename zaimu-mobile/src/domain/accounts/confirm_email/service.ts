import api from "@/src/lib/api/axios";
import {ConfirmEmailParameters} from "@/src/types/ConfirmEmailParameters";
import {HttpResponse} from "@/src/types/HttpResponse";
import axios from "axios";

export async function confirmEmail (
    confirmEmailParameters:ConfirmEmailParameters, code:string
): Promise<HttpResponse> {
    const confirmEmailData = {
        uuid: confirmEmailParameters.uuid,
        email: confirmEmailParameters.email,
        givenName: confirmEmailParameters.givenName,
        familyName: confirmEmailParameters.familyName,
        nickname: confirmEmailParameters.nickname,
        password: confirmEmailParameters.password,
    }

    try {
        const response = await api.post<HttpResponse>(`/auth/confirm-email/${code}`, confirmEmailData);

        return response.data.object
            ? { status: response.data.status, object: response.data.object }
            : { status: response.data.status, message: response.data.message };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const errorResponse = error.response.data as HttpResponse;

                const apiErrorMessage = errorResponse.message || 'Ocorreu um erro ao confirmar o email.';
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

export async function resendCode  (nickname:string): Promise<HttpResponse> {
    try {
        const response = await api.post<HttpResponse>(`/auth/resend-code/${nickname}`);

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

export async function deleteRequestUser (nickname:string, uuid:string): Promise<HttpResponse> {
    try {
        const response = await api.delete<HttpResponse>(`/auth/delete-request-user/${nickname}/${uuid}`);

        return response.data.object
            ? { status: response.data.status, object: response.data.object }
            : { status: response.data.status, message: response.data.message };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const errorResponse = error.response.data as HttpResponse;

                const apiErrorMessage = errorResponse.message || 'Ocorreu um erro ao alterar o email.';
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