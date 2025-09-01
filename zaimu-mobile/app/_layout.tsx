import {Stack} from 'expo-router'
import {useCustomFonts} from '@/src/utils/hooks/useCustomFonts'
import {StyleSheet, View} from 'react-native'
import CustomActivityIndicator from "@/src/components/common/ActivityIndicatorCircleSnail";

export default function RootLayout() {
    const fontsLoaded = useCustomFonts()

    if (!fontsLoaded) {
        return (
            <View style={styles.loadingContainer}>
                <CustomActivityIndicator />
            </View>
        )
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="access" />
            <Stack.Screen name="main_page" />
        </Stack>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})