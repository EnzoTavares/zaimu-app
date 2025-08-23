import login from "@/src/constants/texts/domain/accounts/Login";

export const loginUser = async (credential:string, password:string) => {
    const loginData = {
        credential
        email: email,
        password: password,
    };

    try {
        console.log(password);
        const response = await fetch('https://zaimu.com.br/zaimu-app/services/auth/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
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