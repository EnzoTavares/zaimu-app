import React, {useRef} from 'react';
import {View, TextInput, StyleSheet, Text, StyleProp, ViewStyle, TouchableOpacity} from 'react-native';
import {Image} from "expo-image";
import icons from "@/src/constants/icons";
import {IconName} from "@/src/types/Icon";
import colors from "@/src/themes/colors";
import {fontStyles} from "@/src/themes/typography";
import {spacing} from "@/src/themes/dimensions";

type CustomTextInputProps = {
    label?: string;
    icon?: IconName,
    placeholder: string;
    style?: StyleProp<ViewStyle>;
    value: string;
    setValue: (text: string) => void;
}

const CustomTextInput = (props: CustomTextInputProps) => {
    const inputRef = useRef<TextInput>(null);

    return (
        <View style={[styles.container, props.style]}>
            {props.label &&(
                <Text style={styles.label}>
                    {props.label}
                </Text>
            )}
            <TouchableOpacity
                style={styles.inputContainer}
                activeOpacity={1}
                onPress={() => inputRef.current?.focus()}
            >
                {props.icon && (
                    <Image
                        source={icons[props.icon]}
                        style={styles.icon}
                    />
                )}
                <TextInput
                    ref={inputRef}
                    placeholder={props.placeholder}
                    placeholderTextColor={colors.greyMiddle}
                    onChangeText={(newText: string) => props.setValue(newText)}
                    defaultValue={props.value}
                    style={styles.input}
                />
            </TouchableOpacity>
        </View>
    );
};

export default CustomTextInput;

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    inputContainer: {
        backgroundColor: colors.greyExtraLight,
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: spacing.md,
        borderRadius: 13,
        height: 55
    },
    label: {
        ...fontStyles.assistanceRegular,
        color: colors.black,
        marginBottom: spacing.sm
    },
    icon: {
        height: 18,
        width: 18,
        marginRight: spacing.mmd,
        marginLeft: spacing.xxs,
    },
    input: {
        ...fontStyles.assistanceRegular,
        color: colors.black,
        height: "100%",
        flex: 1,
        paddingRight: spacing.xs,
    }
});