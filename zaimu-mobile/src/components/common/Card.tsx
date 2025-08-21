import React from 'react'
import {View, StyleSheet} from 'react-native'
import {spacing} from "@/src/themes/dimensions";
import colors from "@/src/themes/colors";

type CardProps = {
    shadowed: boolean;
    children?: React.ReactNode;
}

const Card = (props: CardProps) => {

    return (
        <View style={[
            styles.card,
            props.shadowed && styles.cardShadow,
        ]}>
            {props.children}
        </View>
    );
}

export default Card

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: spacing.md,
        width: "88%",
        height: "50%",
        paddingHorizontal: spacing.xx,
        paddingVertical: spacing.xxl,
    },
    cardShadow: {
        shadowColor: colors.shadow,

        // Android
        elevation: spacing.sm,

        // IOS
        shadowOpacity: 0.5,
        shadowRadius: 8,
    }
})