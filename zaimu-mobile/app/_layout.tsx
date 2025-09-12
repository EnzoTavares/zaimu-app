import {Stack} from 'expo-router'
import {useCustomFonts} from '@/src/utils/hooks/useCustomFonts'
import {StyleSheet, View} from 'react-native'
import CustomActivityIndicator from "@/src/components/common/ActivityIndicatorCircleSnail";
import {KeyboardProvider} from "react-native-keyboard-controller";
import * as SplashScreen from 'expo-splash-screen'
import {useEffect} from "react";

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const fontsLoaded = useCustomFonts()

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync()
        }
    }, [fontsLoaded])

    if (!fontsLoaded) {
        return (
            <View style={styles.loadingContainer}>
                <CustomActivityIndicator />
            </View>
        )
    }

    return (
        <KeyboardProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="access" />
                <Stack.Screen name="main_page" />
            </Stack>
        </KeyboardProvider>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})