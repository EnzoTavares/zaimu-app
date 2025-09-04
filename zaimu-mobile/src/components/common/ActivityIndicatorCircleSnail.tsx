import React from 'react';
import {StyleSheet, View} from "react-native";
import colors from "@/src/themes/colors";
import * as Progress from "react-native-progress";
import {spacing} from "@/src/themes/dimensions";

const CustomActivityIndicator = () => {
    return (
        <View style={styles.container}>
            <Progress.CircleSnail
                size={spacing.xxxl}
                thickness={spacing.xs}
                color={[colors.primaryActive]}
                duration={700}
            />
        </View>
    );
}

export default CustomActivityIndicator;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
})