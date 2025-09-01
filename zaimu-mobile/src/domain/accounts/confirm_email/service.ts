import {User} from "@/src/types/User";
import api from "@/src/lib/api/axios";
import {router} from "expo-router";

export const confirmEmail = async (user:User, code:string) => {
    try {
        const confirmEmailData = {
            uuid: user.uuid,
            email: user.email,
            givenName: user.givenName,
            familyName: user.familyName,
            nickname: user.nickname
        }

        const response = await api.post(`/auth/confirm-email/${code}`, confirmEmailData);

        if (response.status === 200) {
            const data = await response.data;
            router.replace('/main_page')
            return { success: true, data: data };
        } else {
            const errorData = await response.data;
            return { success: false, message: errorData.message };
        }
    } catch (error) {
        return { success: false, message: 'Nao foi possivel se conectar com o servidor' };
    }
};

export const resendCode = async (nickname:string) => {
    try {
        const response = await api.post(`/auth/resend-code/${nickname}`);

        if (response.status === 200) {
            const data = await response.data;
            return { success: true, data: data };
        } else {
            const errorData = await response.data;
            return { success: false, message: errorData.message };
        }
    } catch (error) {
        return { success: false, message: `Nao foi possivel se conectar com o servidor: ${error}` };
    }
};

export async function deleteRequestUser (nickname:string, uuid:string) {
    try {
        const response = await api.delete(`/auth/delete-request-user/${nickname}/${uuid}`);

        if (response.status === 200) {
            const data = await response.data;
            return { success: true, data: data };
        } else {
            const errorData = await response.data;
            return { success: false, message: errorData.message };
        }
    } catch (error) {
        return { success: false, message: `Nao foi possivel se conectar com o servidor: ${error}` };
    }
}