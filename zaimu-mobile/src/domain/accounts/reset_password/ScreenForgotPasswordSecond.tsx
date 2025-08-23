import React, {useState} from 'react';
import {StyleSheet, ScrollView, View, Text, TouchableOpacity} from "react-native";
import IconBadge from "@/src/components/icons/IconBadge";
import {spacing} from "@/src/themes/dimensions";
import TitleWithSubtitle from "@/src/components/text/TitleWithSubtitle";
import forgotPasswordTexts from "@/src/constants/texts/domain/accounts/ForgotPassword";
import CustomTextInput from "@/src/components/inputs/TextInput";
import ThickFilledButton from "@/src/components/buttons/ThickFilledButton";
import password from "@/src/constants/texts/inputs/Password";
import CustomOtpInput from "@/src/components/inputs/OtpInput";
import {fontFamily} from "@/src/themes/typography";
import colors from "@/src/themes/colors";
import {resendCode, resetPassword} from '@/src/api/accounts/reset_password/ResetPasswordApi';

type ScreenForgotPasswordSecondProps = {
    credential:string
}

const ScreenForgotPasswordSecond = (props:ScreenForgotPasswordSecondProps) => {
    const [code, setCode] = useState("");
    const [newPasswordText, setNewPasswordText] = useState("");

    async function fetchResetPassword (){
        console.log(await resetPassword(props.credential, code, newPasswordText));
    }

    async function fetchResendResetPasswordCode (){
        console.log(await resendCode(props.credential));
    }

    return (
        <ScrollView contentContainerStyle={styles.container} >
            <IconBadge icon={"darkGreenShieldFill"} height={114} width={100}/>

            <View style={styles.codeContainer}>
                <TitleWithSubtitle title={forgotPasswordTexts.check} subtitle={forgotPasswordTexts.sentCode} />

                <CustomOtpInput
                    numberOfDigits={6}
                    setValue={setCode}
                />

                <View style={styles.textButtonsContainer}>
                    <TouchableOpacity onPress={fetchResendResetPasswordCode}>
                        <Text style={styles.textButtons}>
                            {forgotPasswordTexts.resendCode}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={[
                            styles.textButtons,
                            {textDecorationLine: "underline"}
                        ]}>
                            {forgotPasswordTexts.changeEmailOrNickname}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <CustomTextInput
                icon={"greyLockFill"}
                placeholder={password.placeholder}
                label={password.labelNew}
                isPassword={true}
                setValue={setNewPasswordText}
                value={newPasswordText}
            />

            <ThickFilledButton label={forgotPasswordTexts.reset} onPressed={fetchResetPassword}/>
        </ScrollView>
    );
}

export default ScreenForgotPasswordSecond;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.xxl,
        width: "75%",
        marginHorizontal: "auto"
    },
    textButtonsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    textButtons: {
        fontFamily: fontFamily.regular,
        fontSize: 16,
        color: colors.darkGreen
    },
    codeContainer: {
        width: "100%",
        gap: spacing.xx
    }
})