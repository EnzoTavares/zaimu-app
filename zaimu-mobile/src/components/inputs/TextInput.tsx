import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import {Image} from "expo-image";
import icons from "@/src/constants/icons";
import {IconName} from "@/src/types/Icon";
import colors from "@/src/themes/colors";
import {fontStyles} from "@/src/themes/typography";
import {lineHeights, spacing} from "@/src/themes/dimensions";

type CustomTextInputProps = {
    label?: string;
    icon: IconName,
    placeholder: string;
    isPassword?: boolean;
}

const CustomTextInput = (props: CustomTextInputProps) => {
    const [text, setText] = useState('');

    return (

        <View>
            {props.label &&(
                <Text style={styles.label}>
                    {props.label}
                </Text>
            )}
            <View style={styles.inputContainer}>
                <Image
                    source={icons[props.icon]}
                    style={styles.icon}
                />
                <TextInput
                    placeholder={props.placeholder}
                    placeholderTextColor={colors.greyMiddle}
                    onChangeText={(newText: string) => setText(newText)}
                    defaultValue={text}
                    style={styles.input}
                />
                {/*{props.isPassword && (*/}
                {/*    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>*/}
                {/*        {isPasswordVisible ? <EyeSlashIcon /> : <EyeIcon />}*/}
                {/*    </TouchableOpacity>*/}
                {/*)}*/}
            </View>
        </View>


    );
};

export default CustomTextInput;

const styles = StyleSheet.create({
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
        marginBottom: spacing.xs
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
        width: "100%"
    }
});