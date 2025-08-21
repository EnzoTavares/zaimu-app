import React from 'react'
import {View, ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native'
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

const ScreenLogin = () => {

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}} >
            <View style={styles.container}>
                <AppIcon />

                <Text style={styles.welcomeText}>
                    {brandTexts.welcome}
                    <Text style={styles.brandName}>
                        {brandTexts.name}
                    </Text>
                </Text>

                <HorizontalRule color={colors.greyExtraLight} height={spacing.xxs} />

                <Text style={styles.loginText}>
                    {loginTexts.login}
                </Text>

                <Card shadowed={true}>
                    <CustomTextInput
                        icon={'greyPersonFill'}
                        placeholder={emailOrNicknameTexts.placeholder}
                    />

                    <View style={styles.box}></View>

                    <CustomTextInput icon={'greyLockFill'} placeholder={password.placeholder} />

                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>
                            {loginTexts.forgotPassword}
                        </Text>
                    </TouchableOpacity>

                    <ThinFilledButton label={loginTexts.signIn}/>

                    <OrHorizontalRule color={colors.black} height={spacing.xxs} />

                    <ThinOutlinedButton label={loginTexts.signUp} />

                    <View style={styles.box}></View>

                    <View style={styles.oAuthContainer}>
                        <OAuthButton icon={"googleLogo"}/>
                        <OAuthButton icon={"appleLogo"}/>
                        <OAuthButton icon={"facebookLogo"}/>
                    </View>

                </Card>
            </View>
        </ScrollView>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: spacing.md,
        width: "100%",
    },
    forgotPassword: {
        ...fontStyles.example,
        color: colors.darkGrey,
        textAlign: "right",
        marginVertical: spacing.md
    },
    box: {
        marginVertical: spacing.md
    },
    oAuthContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: spacing.lg,
    }
})