import React, {useState} from 'react'
import {View, StyleSheet, Text, Alert} from 'react-native'
import AppIcon from '@/src/components/branding/AppIcon'
import {spacing} from "@/src/themes/dimensions";
import {fontStyles} from "@/src/themes/typography";
import brandTexts from '@/src/constants/texts/branding/Brand';
import HorizontalRule from "@/src/components/common/HorizontalRule";
import colors from "@/src/themes/colors";
import Card from "@/src/components/cards/Card";
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
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {User} from "@/src/types/User";
import LoadingOverlay from "@/src/components/common/LoadingOverlay";
import {useSafeAreaInsets} from "react-native-safe-area-context";

type NavigationProp = NativeStackNavigationProp<ParamList, 'Register'>;

const ScreenRegister = () => {
    const navigation = useNavigation<NavigationProp>();

    const [givenName, setGivenName] = useState("");
    const [familyName, setFamilyName] = useState("");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [passwordText, setPasswordText] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const insets = useSafeAreaInsets();

    async function submitRegister(){
        if (!email || !givenName || !familyName || !nickname || !passwordText) {
            Alert.alert("Error", "Please fill in all required fields");
            return;
        }

        if (passwordText !== confirmPassword) {
            Alert.alert("Error", "Passwords don't match");
            return;
        }

        setIsLoading(true);

        try {
            const response = await registerUser(email, givenName, familyName, nickname, passwordText);

            console.log(JSON.stringify(response));

            const newUser: User = {
                uuid: response.data.object.uuid,
                email: response.data.object.email,
                givenName: response.data.object.givenName,
                familyName: response.data.object.familyName,
                nickname: response.data.object.nickname,
            };

            navigation.navigate('ConfirmEmail', { user: newUser });
        } catch (error) {
            console.error("Registration error:", error);
            Alert.alert("Registration Failed", "Please try again later");
        } finally {
            setIsLoading(false);
        }
    }

    function handleNavigateToLogin () {
        navigation.replace('StackLogin');
    }

    return (
        <View style={{flex: 1}}>
            <KeyboardAwareScrollView
                contentContainerStyle={[
                    styles.container,
                    {
                        paddingTop: insets.top + spacing.xx,
                        paddingBottom: insets.bottom + spacing.xx,
                    }
                ]}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={true}
                keyboardShouldPersistTaps="handled"
            >
                <AppIcon
                    height={68}
                    width={68}
                />
                
                <Text style={styles.welcomeText}>
                    {brandTexts.welcome}
                    <Text style={styles.brandName}>
                        {brandTexts.name}
                    </Text>
                </Text>

                <HorizontalRule
                    color={colors.greyExtraLight}
                    height={spacing.xxs}
                />

                <Text style={styles.registerText}>
                    {registerTexts.register}
                </Text>

                <Card
                    shadowed={true}
                    style={{gap: spacing.lg, width: '88%'}}
                >
                    <View style={styles.firstAndLastNameInputContainer}>
                        <CustomTextInput
                            label={nameTexts.labelFirstName}
                            placeholder={nameTexts.placeholderFirstName}
                            style={styles.firstAndLastNameInput}
                            setValue={setGivenName}
                            value={givenName}
                        />

                        <CustomTextInput
                            label={nameTexts.labelLastName}
                            placeholder={nameTexts.placeholderLastName}
                            style={styles.firstAndLastNameInput}
                            setValue={setFamilyName}
                            value={familyName}
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

                    <ThinFilledButton
                        label={registerTexts.finish}
                        onPress={submitRegister}
                    />

                    <View style={styles.oAuthContainer}>
                        <OAuthButton icon={"googleLogo"}/>
                        <OAuthButton icon={"appleLogo"}/>
                        <OAuthButton icon={"facebookLogo"}/>
                    </View>

                    <OrHorizontalRule color={colors.black} />

                    <ThinOutlinedButton
                        label={registerTexts.login}
                        onPress={handleNavigateToLogin}
                    />
                </Card>
            </KeyboardAwareScrollView>

            <LoadingOverlay visible={isLoading} />
        </View>
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