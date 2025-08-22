export const loginUser = async (email:string, password:string) => {
    const loginData = {
        email: email,
        password: password,
    };

    try {
        const response = await fetch('http://10.14.83.142:8082/zaimu-app/service/auth/login', {
            method: 'POST',
            headers: {
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