export const loginUser = async (email:string,firstName:string,lastName:string, nickname:string, password:string) => {

    const registerData = {
        email: email,
        givenName: firstName,
        familyName: lastName,
        nickname: nickname,
        password: password,

    }

    try {
        const response = await fetch('https://zaimu.com.br/zaimu-app/services/auth/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData),
        });

        if (response.ok) {
            const data = await response.json();
            return data;
            return { success: true, data: data };
        } else {
            const errorData = await response.json();
            return errorData;
            return { success: false, message: errorData.message };
        }
    } catch (error) {
        return { success: false, message: 'Nao foi possivel se conectar com o servidor' };
    }
};