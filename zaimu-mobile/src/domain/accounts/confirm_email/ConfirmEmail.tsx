import React, {useState} from 'react';
import {StyleSheet, ScrollView, View, Text, TouchableOpacity} from "react-native";
import IconBadge from "@/src/components/icons/IconBadge";
import {spacing} from "@/src/themes/dimensions";
import TitleWithSubtitle from "@/src/components/text/TitleWithSubtitle";
import ThickFilledButton from "@/src/components/buttons/ThickFilledButton";
import CustomOtpInput from "@/src/components/inputs/OtpInput";
import {fontFamily} from "@/src/themes/typography";
import colors from "@/src/themes/colors";
import confirmEmailTexts from "@/src/constants/texts/domain/accounts/ConfirmEmail";
import { confirmEmail } from '@/src/api/accounts/confirm_email/ConfirmEmailApi';
import {resetPasswordCode} from "@/src/api/accounts/reset_password/ResetPasswordApi";

type ConfirmEmailProps = {
    nickname:string
}

const ScreenConfirmEmail = (props:ConfirmEmailProps) => {
    const [code, setCode] = useState("");

    async function submitConfirmationCode(){
    console.log(await confirmEmail(props.nickname, code))
}
    async function handleResendCode() {
        console.log(await resetPasswordCode(props.nickname));
    }

    return (
        <ScrollView contentContainerStyle={styles.container} >
            <IconBadge icon={"darkGreenMailFill"} height={108} width={123}/>

            <View style={{gap: spacing.xx}}>
                <TitleWithSubtitle title={confirmEmailTexts.check} subtitle={confirmEmailTexts.sentCode} />

                <CustomOtpInput
                    numberOfDigits={6}
                    setValue={setCode}
                />
            </View>

            <View style={styles.confirmContainer}>
                <ThickFilledButton label={confirmEmailTexts.send} onPress={submitConfirmationCode}/>

                <View style={styles.textButtonsContainer}>
                    <TouchableOpacity>
                        <Text style={styles.textButtons}>
                            {confirmEmailTexts.resendCode}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={[
                            styles.textButtons,
                            {textDecorationLine: "underline"}
                        ]}>
                            {confirmEmailTexts.changeEmail}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

export default ScreenConfirmEmail;

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
        gap: spacing.xxl,
    },
    textButtons: {
        fontFamily: fontFamily.regular,
        fontSize: 16,
        color: colors.darkGreen
    },
    confirmContainer: {
        width: "100%",
        gap: spacing.xx,
        alignItems: "center",
    }
})