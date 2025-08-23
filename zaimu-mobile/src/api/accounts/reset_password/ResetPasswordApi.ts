export const resetPasswordCode = async (credential:string) => {

    try {
        const response = await fetch(`https://zaimu.com.br/zaimu-app/services/auth/reset-password/${credential}`, {
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

export const resetPassword = async (credential:string, confirmationCode:string, newPassword:string) => {

    try {
        const response = await fetch(`https://zaimu.com.br/zaimu-app/services/auth/reset-password/${credential}?code=${confirmationCode}&newPassword=${newPassword}`, {
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
        return { success: false, message: 'Nao foi possivel se conectar com o servidor' };
    }
};