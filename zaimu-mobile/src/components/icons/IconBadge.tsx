import React from 'react';
import {StyleSheet, View} from "react-native";
import colors from "@/src/themes/colors";
import icons from "@/src/constants/icons";
import {IconName} from "@/src/types/Icon";
import {Image} from "expo-image";
import {spacing} from "@/src/themes/dimensions";

type IconBadgeProps = {
    icon: IconName,
    height?: number,
    width?: number,
}

const IconBadge = (props: IconBadgeProps) => {
    return(
        <View style={styles.container}>
            <Image source={icons[props.icon]} style={{height: props.height, width: props.width}}/>
        </View>
    );
}

export default IconBadge;

const styles = StyleSheet.create({
    container: {
        height: 150,
        width: 183,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: spacing.xl,
    }
})