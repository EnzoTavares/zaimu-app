import React, {useContext, useState} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native'
import AppIcon from '@/src/components/branding/AppIcon'
import {spacing} from "@/src/themes/dimensions";
import loginTexts from '@/src/constants/texts/domain/accounts/Login'
import brandTexts from '@/src/constants/texts/branding/Brand'
import {fontStyles} from "@/src/themes/typography";
import HorizontalRule from "@/src/components/common/HorizontalRule";
import colors from "@/src/themes/colors";
import Card from "@/src/components/common/Card";
import CustomTextInput from "@/src/components/inputs/TextInput";
import emailOrNicknameTexts from "@/src/constants/texts/inputs/EmailOrNickname";
import password from "@/src/constants/texts/inputs/Password";
import ThinFilledButton from "@/src/components/buttons/ThinFilledButton";
import OrHorizontalRule from "@/src/components/common/OrHorizontalRule";
import ThinOutlinedButton from "@/src/components/buttons/ThinOutlinedButton";
import OAuthButton from "@/src/components/buttons/OAuth";
import { loginUser } from '@/src/api/accounts/login/LoginApi';
import {useNavigation} from '@react-navigation/native';
import {ParamList} from "@/src/domain/accounts/login/StackLogin";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {AuthContext} from "@/src/domain/accounts/AuthStack";
import LoadingOverlay from "@/src/components/common/LoadingOverlay";

type NavigationProp = NativeStackNavigationProp<ParamList, 'Login'>;

const ScreenLogin = () => {
    const navigation = useNavigation<NavigationProp>();

    const [credential, setCredential] = useState("");
    const [passwordText, setPasswordText] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const { signIn } = useContext(AuthContext);

     async function submitLogin(){
         setIsLoading(true);

         try {
             const response = await loginUser(credential, passwordText);
             signIn();
         } catch (error) {
             console.error("Login error:", error);
             Alert.alert("Login Failed", "Please try again later");
         } finally {
             setIsLoading(false);
         }
    }

    function handleNavigateToResetPassword () {
        navigation.navigate('ForgotPasswordFirst')
    }

    function handleNavigateToRegister () {
        navigation.replace('StackRegister')
    }

    return (
        <View style={{flex: 1}}>
            <KeyboardAwareScrollView
                contentContainerStyle={styles.container}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={true}
                keyboardShouldPersistTaps="handled"
            >
                <AppIcon />

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

                <Text style={styles.loginText}>
                    {loginTexts.login}
                </Text>

                <Card shadowed={true} style={{gap: spacing.xx}}>
                    <CustomTextInput
                        icon={'greyPersonFill'}
                        placeholder={emailOrNicknameTexts.placeholder}
                        setValue={setCredential}
                        value={credential}
                    />

                    <View>
                        <CustomTextInput
                            icon={'greyLockFill'}
                            placeholder={password.placeholder}
                            isPassword={true}
                            setValue={setPasswordText}
                            value={passwordText}
                        />

                        <TouchableOpacity onPress={handleNavigateToResetPassword}>
                            <Text style={styles.forgotPassword}>
                                {loginTexts.forgotPassword}
                            </Text>
                        </TouchableOpacity>

                        <ThinFilledButton
                            label={loginTexts.signIn}
                            onPress={submitLogin}
                        />
                    </View>

                    <OrHorizontalRule color={colors.black}/>

                    <ThinOutlinedButton
                        label={loginTexts.signUp}
                        onPress={handleNavigateToRegister}
                    />

                    <View style={styles.oAuthContainer}>
                        <OAuthButton icon={"googleLogo"}/>
                        <OAuthButton icon={"appleLogo"}/>
                        <OAuthButton icon={"facebookLogo"}/>
                    </View>
                </Card>
            </KeyboardAwareScrollView>

            <LoadingOverlay visible={isLoading} />
        </View>
    );
}

export default ScreenLogin

const styles = StyleSheet.create({
    welcomeText: {
        ...fontStyles.lightCallout
    },
    brandName: {
        ...fontStyles.semiBoldCallout
    },
    loginText: {
        ...fontStyles.main
    },
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.md,
        width: "100%",
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