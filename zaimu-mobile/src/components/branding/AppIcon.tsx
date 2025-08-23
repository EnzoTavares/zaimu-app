import React from "react";
import {StyleSheet, View, Text} from "react-native";
import {fontStyles} from "@/src/themes/typography";
import { LinearGradient } from "expo-linear-gradient";
import colors from "@/src/themes/colors";

const AppIcon = () => {
    return (
        <LinearGradient colors={colors.backgroundFadeLighter} style={styles.container}>
                <Text style={[
                    fontStyles.semiBoldCallout,
                    {lineHeight: 68, top: 4}
                ]}>Z</Text>
        </LinearGradient>
    );
}

export default AppIcon;

const styles = StyleSheet.create({
    container: {
        height: 68,
        width: 68,
        borderRadius: 15,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
});