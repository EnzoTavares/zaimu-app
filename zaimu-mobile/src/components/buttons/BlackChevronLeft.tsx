import React from "react";
import icons from "@/src/constants/icons";
import {IconName} from "@/src/types/Icon";
import {Image} from "expo-image";
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from "react-native";
import {spacing} from "@/src/themes/dimensions";

type BlackChevronLeftProps = {
    icon: IconName,
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

const BlackChevronLeft = (props: BlackChevronLeftProps) => {
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <Image
                source={icons[props.icon]}
                style={[styles.chevronLeft, props.style]}
                contentFit="contain"
            />
        </TouchableOpacity>
    );
}

export default BlackChevronLeft;

const styles = StyleSheet.create({
    container: {
        width: spacing.lg,
        height: spacing.lg,
    },
    chevronLeft: {
        width: spacing.lg,
        height: spacing.lg,
    }
})