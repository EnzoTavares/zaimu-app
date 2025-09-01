import api from "@/src/lib/api/axios";
import {router} from "expo-router";

export const resetPasswordCode = async (credential:string) => {
    try {
        const response = await api.post(`/auth/reset-password/${credential}`);

        if (response.status === 200) {
            const data = await response.data;
            return { success: true, data: data };
        } else {
            const errorData = await response.data;
            return { success: false, message: errorData.message };
        }
    } catch (error) {
        return { success: false, message: 'Nao foi possivel se conectar com o servidor' };
    }
};

export const resetPassword = async (credential:string, confirmationCode:string, newPassword:string) => {

    try {
        const response = await api.post(
            `/auth/reset-password/${credential}?code=${confirmationCode}&newPassword=${newPassword}`
        );

        if (response.status === 200) {
            const data = await response.data;
            return { success: true, data: data };
        } else {
            const errorData = await response.data;
            return { success: false, message: errorData.message };
        }
    } catch (error) {
        return { success: false, message: 'Nao foi possivel se conectar com o servidor' };
    }
};

export const resendCode = async (credential:string) => {
    try {
        const response = await api.post(`/auth/reset-password/${credential}`);

        if (response.status === 200) {
            const data = await response.data;
            return { success: true, data: data };
        } else {
            const errorData = await response.data;
            return { success: false, message: errorData.message };
        }
    } catch (error) {
        return { success: false, message: 'Nao foi possivel se conectar com o servidor' };
    }
};