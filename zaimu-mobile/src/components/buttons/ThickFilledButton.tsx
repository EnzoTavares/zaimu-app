import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import colors from "@/src/themes/colors";

type ThickFilledButtonProps = {
    label: string;
    color?: string;
}

const ThickFilledButton = (props: ThickFilledButtonProps) => {
    return (
        <LinearGradient colors={colors.backgroundFadeDarker}>
            <TouchableOpacity
                style={[styles.button, props.color ? {backgroundColor: props.color} : null]}
                onPress={() => {/* login */
                }}>
                <Text style={styles.filledText}>
                    {props.label}
                </Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}

export default ThickFilledButton;

const styles = StyleSheet.create({
    button: {
        height: 40,
        flex: 1,
        borderRadius: 5,

    }
})