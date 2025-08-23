import {ActivityIndicator, StyleSheet, View} from 'react-native'
import themes from '@/src/themes/theme'
import StackLogin from "@/src/domain/accounts/login/StackLogin";
import {SafeAreaProvider} from "react-native-safe-area-context";

export default function StartupPage() {
    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                {/*<ActivityIndicator size="large" color={themes.colors.primary}/>*/}
                <StackLogin />
            </View>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themes.colors.backgroundDefault,
    },
})