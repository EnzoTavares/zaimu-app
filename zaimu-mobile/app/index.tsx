import {router} from 'expo-router'
import {ActivityIndicator, StyleSheet, View} from 'react-native'
import themes from '@/src/themes/theme'
import ScreenLogin from "@/src/domain/accounts/login/ScreenLogin";
import ScreenForgotPasswordFirst from "@/src/domain/accounts/reset_password/ScreenForgotPasswordFirst";
import ScreenForgotPasswordSecond from "@/src/domain/accounts/reset_password/ScreenForgotPasswordSecond";
import ScreenRegister from "@/src/domain/accounts/register/ScreenRegister";
import ScreenConfirmEmail from "@/src/domain/accounts/confirm_email/ConfirmEmail";

export default function StartupPage() {
    // router.replace('/access')

    return (


        <View style={styles.container}>
            {/*<ActivityIndicator size="large" color={theme.colors.primary}/>*/}
            <ScreenLogin />
            {/*<ScreenForgotPasswordFirst/>*/}
            {/*<ScreenForgotPasswordSecond />*/}
            {/*<ScreenRegister />*/}
            {/*<ScreenConfirmEmail />*/}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themes.colors.backgroundDefault,
    },
})