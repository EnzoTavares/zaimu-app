import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from "react-native";
import IconBadge from "@/src/components/icons/IconBadge";
import {spacing} from "@/src/themes/dimensions";
import TitleWithSubtitle from "@/src/components/text/TitleWithSubtitle";
import ThickFilledButton from "@/src/components/buttons/ThickFilledButton";
import CustomOtpInput from "@/src/components/inputs/OtpInput";
import {fontFamily} from "@/src/themes/typography";
import colors from "@/src/themes/colors";
import confirmEmailTexts from "@/src/constants/texts/domain/accounts/ConfirmEmail";
import {confirmEmail, deleteRequestUser, resendCode} from './service';
import {NativeStackNavigationProp, NativeStackScreenProps} from "@react-navigation/native-stack";
import {ParamList} from "@/src/domain/accounts/register/StackRegister";
import {useNavigation} from "@react-navigation/native";
import BlackChevronLeft from "@/src/components/buttons/BlackChevronLeft";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import LoadingOverlay from "@/src/components/common/LoadingOverlay";
import {HttpStatusEnum} from "@/src/constants/enums/HttpStatusEnum";
import {router} from "expo-router";

type Props = NativeStackScreenProps<ParamList, 'ConfirmEmail'>;
type NavigationProp = NativeStackNavigationProp<ParamList, 'ConfirmEmail'>;

const ScreenConfirmEmail = ({ route }: Props) => {
    const navigation = useNavigation<NavigationProp>();

    const [code, setCode] = useState("");
    const { confirmEmailParameters } = route.params;

    const [isLoading, setIsLoading] = useState(false);

    async function submitConfirmationCode(){
        setIsLoading(true);

        try {
            const response = await confirmEmail(confirmEmailParameters, code);

            if (response.status === HttpStatusEnum.FAIL) {
                Alert.alert("Falha ao confirmar email", response.message);
                return;
            }

            router.replace('/main_page')
        } catch (error) {
            console.error("Registration error:", error);
            Alert.alert("Registration Failed", "Please try again later");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleResendCode() {
        setIsLoading(true);

        try {
            const response = await resendCode(confirmEmailParameters.nickname);

            if (response.status === HttpStatusEnum.FAIL) {
                Alert.alert("Falha ao reenviar o código", response.message);
            }
        } catch (error) {
            console.error("Registration error:", error);
            Alert.alert("Registration Failed", "Please try again later");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleNavigateBack () {
        setIsLoading(true);

        try {
            const response = await deleteRequestUser(confirmEmailParameters.nickname, confirmEmailParameters.uuid);

            if (response.status === HttpStatusEnum.FAIL) {
                Alert.alert("Falha ao voltar", response.message);
                return;
            }

            navigation.goBack();
        } catch (error) {
            console.error("Registration error:", error);
            Alert.alert("Registration Failed", "Please try again later");
        } finally {
            setIsLoading(false);
        }
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
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <IconBadge
                    icon={"darkGreenMailFill"}
                    height={108}
                    width={123}
                />

                <View style={{gap: spacing.xx}}>
                    <TitleWithSubtitle
                        title={confirmEmailTexts.check}
                        subtitle={confirmEmailTexts.sentCode(confirmEmailParameters.email)}
                    />

                    <CustomOtpInput
                        numberOfDigits={6}
                        setValue={setCode}
                    />
                </View>

                <View style={styles.confirmContainer}>
                    <ThickFilledButton
                        label={confirmEmailTexts.send}
                        onPress={submitConfirmationCode}
                        style={{width: '80%'}}
                    />

                    <View style={styles.textButtonsContainer}>
                        <TouchableOpacity onPress={handleResendCode}>
                            <Text style={styles.textButtons}>
                                {confirmEmailTexts.resendCode}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleNavigateBack}>
                            <Text style={[
                                styles.textButtons,
                                {textDecorationLine: "underline"}
                            ]}>
                                {confirmEmailTexts.changeEmail}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>

            <LoadingOverlay visible={isLoading} />
        </View>
    );
}

export default ScreenConfirmEmail;

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