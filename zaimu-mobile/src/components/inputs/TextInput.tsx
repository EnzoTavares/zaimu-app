import React, {useState} from 'react';
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
    isPassword?: boolean;
    style?: StyleProp<ViewStyle>;
    value: string;
    onChangeText: (text: string) => void;
}

const CustomTextInput = (props: CustomTextInputProps) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <View style={[styles.container, props.style]}>
            {props.label &&(
                <Text style={styles.label}>
                    {props.label}
                </Text>
            )}
            <View style={styles.inputContainer}>
                {props.icon && (
                    <Image
                        source={icons[props.icon]}
                        style={styles.icon}
                    />
                )}
                <TextInput
                    placeholder={props.placeholder}
                    placeholderTextColor={colors.greyMiddle}
                    onChangeText={(newText: string) => props.onChangeText(newText)}
                    defaultValue={props.value}
                    style={[styles.input, props.isPassword && {width: "72%"}]}
                    secureTextEntry={props.isPassword && !isPasswordVisible}
                />
                {props.isPassword && (
                    <TouchableOpacity
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        style={styles.eyeIconContainer}>
                        {isPasswordVisible
                            ? <Image source={icons.greyEyeFill} style={styles.icon} />
                            : <Image source={icons.greyEyeSlashFill} style={styles.icon} />
                        }
                    </TouchableOpacity>
                )}
            </View>
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
        marginLeft: spacing.xs,
    },
    input: {
        ...fontStyles.assistanceRegular,
        color: colors.black,
        height: "100%",
        width: "85%"
    },
    eyeIconContainer: {
        marginLeft: spacing.mmd,
    }
});