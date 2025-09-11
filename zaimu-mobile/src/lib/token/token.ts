import * as SecureStore from 'expo-secure-store';

type tokens = {
    idToken: string;
    accessToken: string;
    refreshToken: string;
}

export async function storeTokens(tokens: tokens) {
    await SecureStore.setItemAsync('idToken', tokens.idToken);
    await SecureStore.setItemAsync('accessToken', tokens.accessToken);
    await SecureStore.setItemAsync('refreshToken', tokens.refreshToken);
}

export async function getTokens() {
    let result = {
        idToken: await SecureStore.getItemAsync('idToken'),
        accessToken: await SecureStore.getItemAsync('accessToken'),
        refreshToken: await SecureStore.getItemAsync('refreshToken')
    };

    if (result) {
        return result;
    } else {
        alert('No tokens stored.');
        return;
    }
}

export async function clearTokens() {
    try {
        await SecureStore.deleteItemAsync('idToken');
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');
        console.log('Tokens removidos com sucesso');
    } catch (error) {
        console.error('Erro ao limpar os tokens: ', error);
    }
}