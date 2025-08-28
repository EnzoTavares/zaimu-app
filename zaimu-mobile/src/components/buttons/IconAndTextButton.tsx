import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {Image} from "expo-image";
import {IconName} from "@/src/types/Icon";
import icons from "@/src/constants/icons";
import {spacing} from "@/src/themes/dimensions";
import colors from "@/src/themes/colors";
import {fontFamily} from "@/src/themes/typography";

type IconAndTextButtonProps = {
    onPress: () => void;
    text: string;
    icon: IconName;
}

const IconAndTextButton = (props: IconAndTextButtonProps) => {
    return(
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.container}
        >
            <Image
                source={icons[props.icon]}
                style={styles.icon}
            />
            <Text style={styles.text}>
                {props.text}
            </Text>
        </TouchableOpacity>
    );
}

export default IconAndTextButton;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        height: 45,
        minWidth: 115,
        borderRadius: spacing.sm,
        backgroundColor: colors.black,
        paddingHorizontal: spacing.mmd,
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: spacing.mmd,
    },
    text: {
        fontFamily: fontFamily.semiBold,
        // fontSize: 14,
        color: colors.white,
    }
})