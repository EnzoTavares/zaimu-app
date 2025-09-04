import React from 'react';
import {StyleSheet, View} from "react-native";
import IconAndTextButton from "@/src/components/buttons/IconAndTextButton";
import {spacing} from "@/src/themes/dimensions";
import {IconName} from "@/src/types/Icon";

type ActionHeaderProps = {
    children?: React.ReactNode;
    onPress: () => void;
    buttonIcon: IconName;
    buttonText: string;
}

const ActionHeader = (props: ActionHeaderProps) => {
    return(
        <View style={styles.container}>

            <View style={styles.left}>
                {props.children}
            </View>

            <IconAndTextButton
                onPress={props.onPress}
                text={props.buttonText}
                icon={props.buttonIcon}
            />
        </View>
    );
}

export default ActionHeader;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        gap: spacing.md
    },
    left: {
        flex: 1,
        // marginRight: 20,
    }
})