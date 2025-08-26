import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import colors from "@/src/themes/colors";
import {fontStyles} from "@/src/themes/typography";

type ThinOutlinedButtonProps = {
    label: string;
    color?: string;
    onPress: ()=>void;
}

const ThinOutlinedButton = (props: ThinOutlinedButtonProps) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={props.onPress}>
            <Text style={styles.label}>
                {props.label}
            </Text>
        </TouchableOpacity>
    );
}

export default ThinOutlinedButton;

const styles = StyleSheet.create({
    container: {
        height: 40,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.darkGrey,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
    },
    label: {
        textAlignVertical: "center",
        textAlign: "center",
        ...fontStyles.assistanceRegular,
        color: colors.darkGrey
    }
})