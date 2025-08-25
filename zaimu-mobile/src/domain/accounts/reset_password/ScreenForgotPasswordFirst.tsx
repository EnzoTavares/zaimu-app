import React, {useState} from 'react';
import {StyleSheet, View} from "react-native";
import IconBadge from "@/src/components/icons/IconBadge";
import {spacing} from "@/src/themes/dimensions";
import TitleWithSubtitle from "@/src/components/text/TitleWithSubtitle";
import forgotPasswordTexts from "@/src/constants/texts/domain/accounts/ForgotPassword";
import CustomTextInput from "@/src/components/inputs/TextInput";
import emailOrNicknameTexts from "@/src/constants/texts/inputs/EmailOrNickname";
import ThickFilledButton from "@/src/components/buttons/ThickFilledButton";
import { resetPasswordCode } from '@/src/api/accounts/reset_password/ResetPasswordApi';
import BlackChevronLeft from "@/src/components/buttons/BlackChevronLeft";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {ParamList} from "@/src/domain/accounts/login/StackLogin";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

type NavigationProp = NativeStackNavigationProp<ParamList, 'ForgotPasswordFirst'>;

const ScreenForgotPasswordFirst = () => {
    const [credential, setCredential] = useState("");

    const navigation = useNavigation<NavigationProp>();

    async function submitResetPasswordCode() {
        console.log(await resetPasswordCode(credential))

        navigation.navigate('ForgotPasswordSecond', {credential: credential} );
    }

    function handleNavigateBackToLogin () {
        navigation.goBack();
    }

    return (
        <View style={styles.rootContainer}>
            <View style={styles.header}>
                <BlackChevronLeft
                    icon={'blackChevronLeft'}
                    onPress={handleNavigateBackToLogin}
                />
            </View>

            <KeyboardAwareScrollView
                contentContainerStyle={styles.scrollContainer}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={true}
                keyboardShouldPersistTaps="handled"
            >
                <IconBadge
                    icon={"darkGreenShieldFill"}
                    height={114}
                    width={100}
                />

                <TitleWithSubtitle
                    title={forgotPasswordTexts.reset}
                    subtitle={forgotPasswordTexts.user}
                />

                <CustomTextInput
                    icon={"greyPersonFill"}
                    placeholder={emailOrNicknameTexts.placeholder}
                    setValue={setCredential}
                    value={credential}
                />

                <ThickFilledButton
                    label={forgotPasswordTexts.send}
                    onPress={submitResetPasswordCode}
                />
            </KeyboardAwareScrollView>
        </View>
    );
}

export default ScreenForgotPasswordFirst;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: spacing.xxxl,
        left: spacing.xx,
        zIndex: 10,
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.xxl,
        width: "75%",
        marginHorizontal: "auto"
    },
})