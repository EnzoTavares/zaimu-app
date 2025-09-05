import React from 'react';
// 1. Importe KeyboardAvoidingView, ScrollView e Platform
import {
    StyleSheet,
    View,
    Modal,
    TouchableWithoutFeedback,
    StyleProp,
    ViewStyle,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import {spacing} from "@/src/themes/dimensions";
import colors from "@/src/themes/colors";

type ModalBottomProps = {
    visible: boolean;
    onRequestClose: () => void;
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
};

export default function ModalBottom(props: ModalBottomProps) {
    return(
        <Modal
            animationType="fade"
            visible={props.visible}
            onRequestClose={props.onRequestClose}
            transparent={true}
        >
            <TouchableWithoutFeedback onPress={props.onRequestClose}>
                <View style={styles.centeredView}>
                    <KeyboardAvoidingView
                        style={styles.keyboardAvoidingContainer}
                        behavior={Platform.OS === "ios" ? "padding" : "height"}



                    >
                        <TouchableWithoutFeedback>
                            {/* A View do modal agora não tem altura fixa */}
                            <View style={[styles.modalView, props.style]}>
                                {/* 3. Usamos um ScrollView normal caso o conteúdo seja maior que a tela */}
                                {/*<ScrollView*/}
                                {/*    keyboardShouldPersistTaps="handled"*/}
                                {/*    showsVerticalScrollIndicator={false}*/}
                                {/*    style={{gap: 30}}*/}
                                {/*>*/}
                                    {props.children}
                                {/*</ScrollView>*/}
                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    keyboardAvoidingContainer: {
        width: '100%',
    },
    modalView: {
        width: '100%',
        backgroundColor: colors.white,
        borderTopLeftRadius: spacing.lg,
        borderTopRightRadius: spacing.lg,
        padding: spacing.xx,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        gap: spacing.lg,
    },
});