import {router} from 'expo-router'
import {ActivityIndicator, StyleSheet, View} from 'react-native'
import themes from '@/src/themes/theme'
import ScreenLogin from "@/src/domain/accounts/login/ScreenLogin";

export default function StartupPage() {
    router.replace('/access')

    return (


        <View style={styles.container}>
            {/*<ActivityIndicator size="large" color={theme.colors.primary}/>*/}
            <ScreenLogin />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themes.colors.backgroundDefault,
    },
})