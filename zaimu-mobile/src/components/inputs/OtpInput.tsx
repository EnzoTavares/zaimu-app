import React from 'react';
import {StyleSheet} from "react-native";
import {OtpInput} from "react-native-otp-entry";
import colors from "@/src/themes/colors";
import {fontSizes} from "@/src/themes/dimensions";

type CustomOtpInputProps = {
    numberOfDigits: number;
    setValue: (text: string) => void;
}

const CustomOtpInput = (props: CustomOtpInputProps) => {
    return(
        <OtpInput
            numberOfDigits={props.numberOfDigits}
            focusColor={colors.primary}
            onTextChange={(text) => text}
            onFilled={(text) => props.setValue(text)}
            theme={{
                containerStyle: styles.container,
                pinCodeContainerStyle: styles.pinCodeContainer,
                pinCodeTextStyle: styles.pinCodeText,
                focusedPinCodeContainerStyle: styles.activePinCodeContainer,
            }}
            autoFocus={false}
        />
    );
}

export default CustomOtpInput;

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    pinCodeContainer: {
        width: 45,
        height: 70,
        borderWidth: 1,
        borderColor: colors.greyLight,
        borderRadius: 12,
        backgroundColor: colors.greyExtraExtraLight,
    },
    pinCodeText: {
        color: colors.black,
        fontSize: fontSizes.lg,
    },
    activePinCodeContainer: {
        borderColor: colors.primary
    }
})