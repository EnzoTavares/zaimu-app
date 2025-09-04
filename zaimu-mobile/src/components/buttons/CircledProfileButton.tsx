import React from "react";
import {Platform, StyleSheet, Text, TouchableOpacity} from "react-native";
import {spacing} from "@/src/themes/dimensions";
import colors from "@/src/themes/colors";
import {fontFamily} from "@/src/themes/typography";

type CircledProfileButtonProps = {
    textContent: string;
    onPress: () => void;
}

const CircledProfileButton = (props: CircledProfileButtonProps) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={props.onPress}
        >
            <Text style={styles.userInitials}>{props.textContent}</Text>
        </TouchableOpacity>
    );
}

export default CircledProfileButton;

const styles = StyleSheet.create({
    container: {
        height: spacing.xl,
        width: spacing.xl,
        borderRadius: spacing.xl / 2,
        backgroundColor: colors.greyLight,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.grey,
    },
    userInitials: {
        fontFamily: fontFamily.semiBold,
        fontSize: spacing.lg,
        height: "100%",
        textAlign: 'center',
        ...Platform.select({
            ios: {
                marginTop: 25,
            },
            android: {
                textAlignVertical: 'center',
            },
        }),
    }
})