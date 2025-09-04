import React from 'react';
import {StyleSheet, View, Text} from "react-native";
import {fontSizes, spacing} from "@/src/themes/dimensions";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const ScreenHome = () => {
    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={true}
            keyboardShouldPersistTaps="handled"
        >
            <View>
                <Text style={{fontSize: fontSizes.lg}}>
                    Home
                </Text>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default ScreenHome;

const styles = StyleSheet.create({
    container: {
        paddingVertical: spacing.xx,
        width: '85%',
        alignSelf: 'center',
        gap: spacing.lg
    }
})