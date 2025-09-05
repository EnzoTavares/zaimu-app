import React, {useEffect} from 'react'
import {StyleSheet, View} from 'react-native'
import colors from "@/src/themes/colors";
import CustomActivityIndicator from "@/src/components/common/ActivityIndicatorCircleSnail";
import {router} from "expo-router";

export default function StartupPage() {
    // useEffect(() => {
    //     (async () => {
    //         const tokens = await getTokens()
    //         if (!tokens?.access_token) {
    //             router.replace('/access')
    //             return
    //         }
    //         const isValid = await verifyUserToken(tokens.access_token)
    //         router.replace(isValid ? '/main_page' : '/access')
    //     })()
    // }, [])

    // useEffect(() => {
    //     router.replace('/access');
    // }, []);

    useEffect(() => {
        router.replace('/main_page');
    }, []);

    return (
        <View style={[
            styles.container
        ]}>
            <CustomActivityIndicator />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundDefault,
    },
})