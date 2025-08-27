import {ActivityIndicator, StyleSheet, View} from 'react-native'
import colors from "@/src/themes/colors";
import {SafeAreaProvider, useSafeAreaInsets} from "react-native-safe-area-context";
import { AuthContext } from "@/src/domain/accounts/AuthStack";
import {useMemo, useState} from "react";
import AccessPage from "@/app/access";
import CustomActivityIndicator from "@/src/components/common/ActivityIndicatorCircleSnail";
import MainNavigator from "@/src/domain/home/MainNavigator";

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
                    {/*<AccessPage />*/}
                    <MainNavigator />
                </View>
            </AuthContext.Provider>

        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundDefault,
    },
})