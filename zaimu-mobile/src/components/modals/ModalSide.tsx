import React from 'react';
import {
    StyleSheet,
    View,
    Modal,
    TouchableWithoutFeedback,
    StyleProp,
    ViewStyle,
    KeyboardAvoidingView,
    Platform,
    ScrollView, TouchableOpacity, Dimensions
} from 'react-native';
import {spacing} from "@/src/themes/dimensions";
import colors from "@/src/themes/colors";
import icons from "@/src/constants/icons";
import {Image} from "expo-image";

type ModalSideProps = {
    visible: boolean;
    onRequestClose: () => void;
    header: React.ReactNode;
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
};

export default function ModalSide(props: ModalSideProps) {
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




                            <View style={[styles.modalView, props.style]}>
                                {props.header && (
                                    <View style={styles.headerContainer}>
                                        {props.header}

                                        <TouchableOpacity onPress={props.onRequestClose}>
                                            <Image
                                                source={icons.blackXLg}
                                                style={styles.closeIcon}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                )}
                                <ScrollView
                                    keyboardShouldPersistTaps="handled"
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={styles.scrollContainer}
                                >
                                    {props.children}
                                </ScrollView>
                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    headerContainer: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    closeIcon: {
        width: spacing.lg,
        height: spacing.lg,
    },
    keyboardAvoidingContainer: {
        width: '100%',
        // maxHeight: windowHeight * 0.95,
    },
    modalView: {
        height: '100%',
        width: '30%',
        marginLeft: 'auto',
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
    scrollContainer: {
        gap: spacing.lg,
    }
});