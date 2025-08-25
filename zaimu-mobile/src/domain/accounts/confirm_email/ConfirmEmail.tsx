import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import IconBadge from "@/src/components/icons/IconBadge";
import {spacing} from "@/src/themes/dimensions";
import TitleWithSubtitle from "@/src/components/text/TitleWithSubtitle";
import ThickFilledButton from "@/src/components/buttons/ThickFilledButton";
import CustomOtpInput from "@/src/components/inputs/OtpInput";
import {fontFamily} from "@/src/themes/typography";
import colors from "@/src/themes/colors";
import confirmEmailTexts from "@/src/constants/texts/domain/accounts/ConfirmEmail";
import {confirmEmail, resendCode} from '@/src/api/accounts/confirm_email/ConfirmEmailApi';
import {NativeStackNavigationProp, NativeStackScreenProps} from "@react-navigation/native-stack";
import {ParamList} from "@/src/domain/accounts/register/StackRegister";
import {useNavigation} from "@react-navigation/native";
import BlackChevronLeft from "@/src/components/buttons/BlackChevronLeft";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

type Props = NativeStackScreenProps<ParamList, 'ConfirmEmail'>;
type NavigationProp = NativeStackNavigationProp<ParamList, 'ConfirmEmail'>;

const ScreenConfirmEmail = ({ route }: Props) => {
    const [code, setCode] = useState("");
    const { user } = route.params;
    const navigation = useNavigation<NavigationProp>();

    async function submitConfirmationCode(){
        console.log(await confirmEmail(user, code))
    }

    async function handleResendCode() {
        console.log(await resendCode(user.nickname));
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
                contentContainerStyle={styles.scrollContainer}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={true}
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
                        subtitle={confirmEmailTexts.sentCode}
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