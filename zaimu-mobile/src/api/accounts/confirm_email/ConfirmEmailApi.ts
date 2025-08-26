import {API_URL} from "@/src/config/env";
import {User} from "@/src/types/User";

export const confirmEmail = async (user:User, code:string) => {
    try {
        const response = await fetch(`${API_URL}/auth/confirm-email/${code}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uuid: user.uuid,
                email: user.email,
                givenName: user.givenName,
                familyName: user.familyName,
                nickname: user.nickname,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            return { success: true, data: data };
        } else {
            const errorData = await response.json();
            return { success: false, message: errorData.message };
        }
    } catch (error) {
        return { success: false, message: 'Nao foi possivel se conectar com o servidor' };
    }
};

export const resendCode = async (nickname:string) => {
    try {
        const response = await fetch(`${API_URL}/auth/resend-code/${nickname}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            return { success: true, data: data };
        } else {
            const errorData = await response.json();
            return { success: false, message: errorData.message };
        }
    } catch (error) {
        return { success: false, message: `Nao foi possivel se conectar com o servidor: ${error}` };
    }
};