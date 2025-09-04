import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";
import {fontSizes, spacing, lineHeights} from "@/src/themes/dimensions";
import {fontFamily} from "@/src/themes/typography";
import colors from "@/src/themes/colors";

type TitleWithSubtitleProps = {
    title: string,
    subtitle: string,
}

const TitleWithSubtitle = (props: TitleWithSubtitleProps) => {
    return(
        <View style={styles.container}>
            <Text style={[
                styles.title,
                props.titleStyle,
            ]}
            >
                {props.title}
            </Text>
            <Text style={styles.subtitle}>
                {props.subtitle}
            </Text>
        </View>
    );
}

export default TitleWithSubtitle;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "flex-start",
    },
    title: {
        fontSize: fontSizes.md,
        fontFamily: fontFamily.medium,
        marginBottom: spacing.md,
    },
    subtitle: {
        fontSize: fontSizes.md,
        fontFamily: fontFamily.regular,
        color: colors.grey,
        lineHeight: lineHeights.relaxed
    }
})