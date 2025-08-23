export const confirmEmail = async (credential:string, code:string) => {

    try {
        const response = await fetch(`https://zaimu.com.br/zaimu-app/services/auth/confirm-email/${credential}/${code}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json'
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
        return { success: false, message: 'Nao foi possivel se conectar com o servidor' };
    }
};
export const resendCode = async (nickname:string) => {
    try {
        const response = await fetch(`https://zaimu.com.br/zaimu-app/services/auth/resend-code/${nickname}`, {
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