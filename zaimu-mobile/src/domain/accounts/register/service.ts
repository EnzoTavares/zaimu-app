import api from "@/src/lib/api/axios";

export const registerUser = async (email:string,givenName:string,familyName:string, nickname:string, password:string) => {

    const registerData = {
        email: email,
        givenName: givenName,
        familyName: familyName,
        nickname: nickname,
        password: password,
    }

    try {
        const response = await api.post(`/auth/register`, registerData);

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