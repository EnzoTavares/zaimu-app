import React from 'react';
import {IconName} from "@/src/types/Icon";
import {LinearGradient} from "expo-linear-gradient";
import colors from "@/src/themes/colors";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {Image} from "expo-image";
import icons from "@/src/constants/icons";
import {spacing} from "@/src/themes/dimensions";

type GradientIconButtonProps = {
    icon: IconName;
    onClick: () => void;
    size?: number;
    gradientColors?: [string, string];
};

export function GradientIconButton (props: GradientIconButtonProps) {
    return (
        <LinearGradient
            colors={colors.backgroundFadeDarker}
            style={styles.container}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
        >
            <TouchableOpacity
                style={styles.button}
                onPress={props.onClick}>
                <Image
                    source={icons[props.icon]}
                    style={styles.icons}
                />
            </TouchableOpacity>
        </LinearGradient>
    );
}

export default GradientIconButton;

const styles = StyleSheet.create({
    container: {
        height: 50,
        borderRadius: 10,
        width: spacing.xxxl
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        width: "100%",
        height: "100%"
    },
    icons: {
        height: spacing.lg,
        width: spacing.lg
    }
})