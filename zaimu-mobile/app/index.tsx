import {ActivityIndicator, StyleSheet, View} from 'react-native'
import themes from '@/src/themes/theme'
import {NavigationContainer} from "@react-navigation/native";
import StackLogin from "@/src/domain/accounts/login/StackLogin";

export default function StartupPage() {

    return (
        <View style={styles.container}>
            {/*<ActivityIndicator size="large" color={themes.colors.primary}/>*/}


            <StackLogin />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themes.colors.backgroundDefault,
    },
})