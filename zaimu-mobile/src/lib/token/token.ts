import * as Keychain from 'react-native-keychain';

export async function storeTokens(tokens: {idToken: '...', accessToken: '...', refreshToken: '...' }) {
    try {
        await Keychain.setGenericPassword(
            'tokens',
            JSON.stringify(tokens)
        );
        console.log('Tokens armazenados com sucesso!');
    } catch (error) {
        console.error('Erro ao armazenar os tokens:', error);
    }
}

export async function getTokens() {
    try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
            return JSON.parse(credentials.password);
        }
        return null;
    } catch (error) {
        console.error('Erro ao recuperar os tokens: ', error);
        return null;
    }
}

export async function clearTokens() {
    try {
        await Keychain.resetGenericPassword();
    } catch (error) {
        console.error('Erro ao limpar os tokens:', error);
    }
}