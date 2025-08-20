import {router} from 'expo-router'
import {ActivityIndicator, StyleSheet, View} from 'react-native'
import theme from '../src/themes/theme'
import ScreenLogin from "@/src/domain/accounts/login/ScreenLogin";

export default function StartupPage() {
    // router.replace('/access')

    return (
        <ScreenLogin />

        // <View style={styles.container}>
        //     <ActivityIndicator size="large" color={theme.colors.primary}/>
        // </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
    },
})