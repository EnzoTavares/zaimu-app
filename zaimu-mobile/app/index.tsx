import React, {useEffect, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import colors from "@/src/themes/colors";
import CustomActivityIndicator from "@/src/components/common/ActivityIndicatorCircleSnail";
import {router} from "expo-router";
import {getTokens} from "@/src/lib/token/token";

export default function StartupPage() {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     const checkAuthStatus = async () => {
    //         const tokens = await getTokens();
    //         if (tokens) {
    //             setIsLoggedIn(true);
    //             router.replace('/main_page');
    //         } else {
    //             setIsLoggedIn(false);
    //             router.replace('/access');
    //         }
    //         setIsLoading(false);
    //     };
    //
    //     checkAuthStatus();
    // }, []);



    useEffect(() => {
        router.replace('/access');
    }, []);

    // useEffect(() => {
    //     router.replace('/main_page');
    // }, []);

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