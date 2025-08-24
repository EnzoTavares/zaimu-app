import React, {useState} from 'react'
import {View, ScrollView, StyleSheet, Text} from 'react-native'
import AppIcon from '@/src/components/branding/AppIcon'
import {spacing} from "@/src/themes/dimensions";
import {fontStyles} from "@/src/themes/typography";
import brandTexts from '@/src/constants/texts/branding/Brand';
import HorizontalRule from "@/src/components/common/HorizontalRule";
import colors from "@/src/themes/colors";
import Card from "@/src/components/common/Card";
import CustomTextInput from "@/src/components/inputs/TextInput";
import password from "@/src/constants/texts/inputs/Password";
import ThinFilledButton from "@/src/components/buttons/ThinFilledButton";
import OrHorizontalRule from "@/src/components/common/OrHorizontalRule";
import ThinOutlinedButton from "@/src/components/buttons/ThinOutlinedButton";
import OAuthButton from "@/src/components/buttons/OAuth";
import registerTexts from "@/src/constants/texts/domain/accounts/Register";
import nameTexts from "@/src/constants/texts/inputs/Name";
import emailTexts from "@/src/constants/texts/inputs/Email";
import { registerUser } from '@/src/api/accounts/register/RegisterApi';
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {ParamList} from "@/src/domain/accounts/register/StackRegister";
import {useNavigation} from "@react-navigation/native";

type NavigationProp = NativeStackNavigationProp<ParamList, 'Register'>;

const ScreenRegister = () => {
    const navigation = useNavigation<NavigationProp>();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [passwordText, setPasswordText] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function submitRegister(){
        console.log( await registerUser(email, firstName, lastName, nickname, passwordText));

        navigation.navigate('ConfirmEmail', {nickname: nickname});
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <AppIcon />

            <Text style={styles.welcomeText}>
                {brandTexts.welcome}
                <Text style={styles.brandName}>
                    {brandTexts.name}
                </Text>
            </Text>

            <HorizontalRule color={colors.greyExtraLight} height={spacing.xxs} />

            <Text style={styles.registerText}>
                {registerTexts.register}
            </Text>

            <Card shadowed={true} style={{gap: spacing.lg}}>
                <View style={styles.firstAndLastNameInputContainer}>
                    <CustomTextInput
                        label={nameTexts.labelFirstName}
                        placeholder={nameTexts.placeholderFirstName}
                        style={styles.firstAndLastNameInput}
                        setValue={setFirstName}
                        value={firstName}
                    />

                    <CustomTextInput
                        label={nameTexts.labelLastName}
                        placeholder={nameTexts.placeholderLastName}
                        style={styles.firstAndLastNameInput}
                        setValue={setLastName}
                        value={lastName}
                    />
                </View>

                <CustomTextInput
                    icon={'greyPersonFill'}
                    label={nameTexts.labelNickName}
                    placeholder={nameTexts.placeholderNickname}
                    setValue={setNickname}
                    value={nickname}
                />

                <CustomTextInput
                    icon={'greyEnvelopeFill'}
                    label={emailTexts.label}
                    placeholder={emailTexts.placeholder}
                    setValue={setEmail}
                    value={email}
                />

                <CustomTextInput
                    icon={'greyLockFill'}
                    label={password.label}
                    placeholder={password.placeholder}
                    isPassword={true}
                    setValue={setPasswordText}
                    value={passwordText}
                />

                <CustomTextInput
                    icon={'greyLockFill'}
                    label={password.labelConfirm}
                    placeholder={password.placeholder}
                    isPassword={true}
                    setValue={setConfirmPassword}
                    value={confirmPassword}
                />

                <ThinFilledButton label={registerTexts.finish} onPress={submitRegister}/>

                <OrHorizontalRule color={colors.black} />

                <ThinOutlinedButton label={registerTexts.login} onPress={() => navigation.replace('StackLogin')}/>

                <View style={styles.oAuthContainer}>
                    <OAuthButton icon={"googleLogo"}/>
                    <OAuthButton icon={"appleLogo"}/>
                    <OAuthButton icon={"facebookLogo"}/>
                </View>
            </Card>
        </ScrollView>
    );
}

export default ScreenRegister

const styles = StyleSheet.create({
    welcomeText: {
        ...fontStyles.lightCallout
    },
    brandName: {
        ...fontStyles.semiBoldCallout
    },
    registerText: {
        ...fontStyles.main
    },
    container: {
        flexGrow: 1,

        paddingVertical: spacing.xxxl,

        alignItems: 'center',

        gap: spacing.md,
        width: "100%",
    },
    firstAndLastNameInputContainer: {
        display: "flex",
        flexDirection: "row",
        gap: spacing.md,
    },
    firstAndLastNameInput: {
        width: undefined,
        flex: 1,
    },
    forgotPassword: {
        ...fontStyles.example,
        color: colors.darkGrey,
        textAlign: "right",
        marginVertical: spacing.md
    },
    oAuthContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: spacing.lg,
    }
})