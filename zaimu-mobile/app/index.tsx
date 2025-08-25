import {ActivityIndicator, StyleSheet, View} from 'react-native'
import themes from '@/src/themes/theme'
import {SafeAreaProvider} from "react-native-safe-area-context";
import { AuthContext } from "@/src/domain/accounts/AuthStack";
import {useMemo, useState} from "react";
import AccessPage from "@/app/access";

export default function StartupPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const authContext = useMemo(() => ({
        signIn: () => {
            setIsAuthenticated(true);
        },
        signOut: () => {
            setIsAuthenticated(false);
        }
    }), []);

    return (
        <SafeAreaProvider>
            <AuthContext.Provider value={authContext}>
                <View style={styles.container}>
                    {/*{!isAuthenticated ? <AuthStack /> : null <MainNavigator />}*/}
                    <AccessPage />
                </View>
            </AuthContext.Provider>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themes.colors.backgroundDefault,
    },
})