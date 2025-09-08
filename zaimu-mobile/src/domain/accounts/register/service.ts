import api from "@/src/lib/api/axios";
import {HttpResponse} from "@/src/types/HttpResponse";
import axios from "axios";

export async function registerUser (
    email:string,givenName:string,familyName:string, nickname:string, password:string
): Promise<HttpResponse> {
    const registerData = {
        email: email,
        givenName: givenName,
        familyName: familyName,
        nickname: nickname,
        password: password,
    }

    try {
        const response = await api.post<HttpResponse>(`/auth/register`, registerData);

        return response.data.object
            ? { status: response.data.status, object: response.data.object }
            : { status: response.data.status, message: response.data.message };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const errorResponse = error.response.data as HttpResponse;

                const apiErrorMessage = errorResponse.message || 'Ocorreu um erro ao tentar fazer registro.';
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