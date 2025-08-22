import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import colors from "@/src/themes/colors";
import {fontStyles} from "@/src/themes/typography";

type ThinFilledButtonProps = {
    label: string;
    color?: string;
    onPressed?: ()=>void;
}

const ThinFilledButton = (props: ThinFilledButtonProps) => {
    return (
        <LinearGradient
            colors={colors.backgroundFadeDarker}
            style={styles.container}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
        >
            <TouchableOpacity
                style={styles.button}
                onPress={props.onPressed}>
                <Text style={styles.label}>
                    {props.label}
                </Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}

export default ThinFilledButton;

const styles = StyleSheet.create({
    container: {
        height: 40,
        borderRadius: 5,
        width: "100%",
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        width: "100%",
        height: "100%"
    },
    label: {
        textAlignVertical: "center",
        textAlign: "center",
        ...fontStyles.assistanceRegular,
        color: colors.white
    }
})