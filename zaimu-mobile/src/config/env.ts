import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig?.extra?.apiUrl;

if (typeof apiUrl !== 'string' || apiUrl.length === 0) {
    throw new Error('A variável de ambiente API_URL não está definida. Verifique seus arquivos .env e app.config.js');
}

export const API_URL = apiUrl;

const env = {
    API_URL,
};

export default env;