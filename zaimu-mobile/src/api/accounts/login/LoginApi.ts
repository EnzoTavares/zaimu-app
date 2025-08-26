import { API_URL } from "@/src/config/env";

export const loginUser = async (credential:string, password:string) => {
    let loginData;

    credential.includes('@') ? loginData = {
        email: credential,
        password: password,
    } : loginData = {
        nickname: credential,
        password: password,
    };

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
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