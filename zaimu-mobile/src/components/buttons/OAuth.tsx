import React from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native";
import colors from "@/src/themes/colors";
import {Image} from "expo-image";
import {IconName} from "@/src/types/Icon";
import icons from "@/src/constants/icons";
import {spacing} from "@/src/themes/dimensions";

type OAuthButtonProps = {
    icon: IconName,
}

const OAuthButton = (props: OAuthButtonProps) => {

    return (
        <TouchableOpacity style={styles.oAuthContainer}>
            <Image
                source={icons[props.icon]}
                style={styles.icon}
            />
        </TouchableOpacity>
    );
}

export default OAuthButton;

const styles = StyleSheet.create({
    oAuthContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: 35,
        height: 35,
        borderRadius: 7,
        borderWidth: 0.5,
        borderColor: colors.greyLight,
    },
    icon: {
        height: spacing.lg,
        width: spacing.lg
    }
});