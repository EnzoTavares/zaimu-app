import React from 'react'
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native'
import {spacing} from "@/src/themes/dimensions";
import colors from "@/src/themes/colors";

type CardProps = {
    shadowed: boolean;
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

const Card = (props: CardProps) => {
    return (
        <View style={[
            styles.card,
            props.shadowed && styles.cardShadow,
            props.style,
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
        padding: spacing.xx
    },
    cardShadow: {
        shadowColor: colors.shadow,

        // Android
        elevation: spacing.sm,

        // IOS
        shadowOpacity: 0.5,
        shadowRadius: 8,
    },

})