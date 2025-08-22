import React from 'react';
import {StyleSheet, ScrollView} from "react-native";
import IconBadge from "@/src/components/icons/IconBadge";
import {spacing} from "@/src/themes/dimensions";
import TitleWithSubtitle from "@/src/components/text/TitleWithSubtitle";
import forgotPasswordTexts from "@/src/constants/texts/domain/accounts/ForgotPassword";
import CustomTextInput from "@/src/components/inputs/TextInput";
import emailOrNicknameTexts from "@/src/constants/texts/inputs/EmailOrNickname";
import ThickFilledButton from "@/src/components/buttons/ThickFilledButton";

const ScreenForgotPasswordFirst = () => {

    return (
        <ScrollView contentContainerStyle={styles.container} >
            <IconBadge icon={"darkGreenShieldFill"} height={114} width={100}/>

            <TitleWithSubtitle title={forgotPasswordTexts.reset} subtitle={forgotPasswordTexts.user} />

            <CustomTextInput icon={"greyPersonFill"} placeholder={emailOrNicknameTexts.placeholder} />

            <ThickFilledButton label={forgotPasswordTexts.send} />
        </ScrollView>
    );
}

export default ScreenForgotPasswordFirst;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.xxl,
        width: "75%",
        marginHorizontal: "auto"
    }
})