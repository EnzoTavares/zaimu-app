import {Slot} from 'expo-router'
import {useCustomFonts} from '@/src/utils/hooks/useCustomFonts'
import {ActivityIndicator, StyleSheet, View} from 'react-native'

export default function RootLayout() {
    const fontsLoaded = useCustomFonts()

    if (!fontsLoaded) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large"/>
            </View>
        )
    }
    return <Slot/>
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})