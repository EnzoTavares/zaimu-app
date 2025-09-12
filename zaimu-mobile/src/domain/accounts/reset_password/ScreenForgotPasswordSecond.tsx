import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from "react-native";
import IconBadge from "@/src/components/icons/IconBadge";
import {spacing} from "@/src/themes/dimensions";
import TitleWithSubtitle from "@/src/components/text/TitleWithSubtitle";
import forgotPasswordTexts from "@/src/constants/texts/domain/accounts/ForgotPassword";
import ThickFilledButton from "@/src/components/buttons/ThickFilledButton";
import password from "@/src/constants/texts/inputs/Password";
import CustomOtpInput from "@/src/components/inputs/OtpInput";
import {fontFamily} from "@/src/themes/typography";
import colors from "@/src/themes/colors";
import {resendCode, resetPassword} from './service';
import {NativeStackNavigationProp, NativeStackScreenProps} from "@react-navigation/native-stack";
import {ParamList} from "@/src/domain/accounts/login/StackLogin";
import BlackChevronLeft from "@/src/components/buttons/BlackChevronLeft";
import {useNavigation} from "@react-navigation/native";
import {
    KeyboardAwareScrollView,
    KeyboardToolbar
} from "react-native-keyboard-controller";
import LoadingOverlay from "@/src/components/common/LoadingOverlay";
import {HttpStatusEnum} from "@/src/constants/enums/HttpStatusEnum";
import PasswordInput from "@/src/components/inputs/PasswordInput";

type Props = NativeStackScreenProps<ParamList, 'ForgotPasswordSecond'>;
type NavigationProp = NativeStackNavigationProp<ParamList, 'ForgotPasswordSecond'>;

export function ScreenForgotPasswordSecond ({ route }: Props) {
    const navigation = useNavigation<NavigationProp>();

    const [code, setCode] = useState("");
    const [newPasswordText, setNewPasswordText] = useState("");
    const { credential } = route.params;

    const [isLoading, setIsLoading] = useState(false);

    async function submitResetPassword (){
        setIsLoading(true);

        try {
            const response = await resetPassword(credential, code, newPasswordText);

            if (response.status === HttpStatusEnum.FAIL) {
                Alert.alert("Falha ao redefinir a senha", response.message);
                return;
            }

            navigation.popToTop();
        } catch (error) {
            console.error("MENSAGEM!:", error);
            Alert.alert("Login Failed", "Please try again later");
        } finally {
            setIsLoading(false);
        }
    }

    async function submitResendResetPasswordCode (){
        setIsLoading(true);

        try {
            const response = await resendCode(credential);

            if (response.status === HttpStatusEnum.FAIL) {
                Alert.alert("Falha ao reenviar o código", response.message);
                return;
            }
        } catch (error) {
            console.error("Falha ao reenviar o código: ", error);
            Alert.alert("Login Failed", "Please try again later");
        } finally {
            setIsLoading(false);
        }
    }

    function handleNavigateBack () {
        navigation.goBack();
    }

    return (
        <View style={styles.rootContainer}>
            <View style={styles.header}>
                <BlackChevronLeft
                    icon={'blackChevronLeft'}
                    onPress={handleNavigateBack}
                />
            </View>

            <KeyboardAwareScrollView
                bottomOffset={62}
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <IconBadge
                    icon={"darkGreenShieldFill"}
                    height={114}
                    width={100}
                />

                <View style={styles.codeContainer}>
                    <TitleWithSubtitle
                        title={forgotPasswordTexts.check}
                        subtitle={forgotPasswordTexts.sentCode}
                    />

                    <CustomOtpInput
                        numberOfDigits={6}
                        setValue={setCode}
                    />

                    <View style={styles.textButtonsContainer}>
                        <TouchableOpacity onPress={submitResendResetPasswordCode}>
                            <Text style={styles.textButtons}>
                                {forgotPasswordTexts.resendCode}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleNavigateBack}>
                            <Text style={[
                                styles.textButtons,
                                {textDecorationLine: "underline"}
                            ]}>
                                {forgotPasswordTexts.changeEmailOrNickname}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <PasswordInput
                    icon={"greyLockFill"}
                    placeholder={password.placeholder}
                    label={password.labelNew}
                    setValue={setNewPasswordText}
                    value={newPasswordText}
                />

                <ThickFilledButton
                    label={forgotPasswordTexts.reset}
                    onPress={submitResetPassword}
                    style={{width: '80%'}}
                />
            </KeyboardAwareScrollView>

            <KeyboardToolbar
                doneText={'Concluído'}
            />

            <LoadingOverlay visible={isLoading} />
        </View>
    );
}

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
        flex: 1,
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