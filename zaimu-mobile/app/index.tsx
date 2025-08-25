import {ActivityIndicator, StyleSheet, View} from 'react-native'
import themes from '@/src/themes/theme'
import {SafeAreaProvider} from "react-native-safe-area-context";
import AuthStack from "@/src/domain/accounts/AccessStack";

export default function StartupPage() {
    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                {/*<ActivityIndicator size="large" color={themes.colors.primary}/>*/}
                <AuthStack />
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