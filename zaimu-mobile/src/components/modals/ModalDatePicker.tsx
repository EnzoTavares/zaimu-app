import { useState } from  'react';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';
import React from 'react';
import {
    StyleSheet,
    View,
    Modal,
    TouchableWithoutFeedback,
    StyleProp,
    ViewStyle,
    ScrollView, TouchableOpacity, Dimensions
} from 'react-native';
import {spacing} from "@/src/themes/dimensions";
import colors from "@/src/themes/colors";
import {Image} from "expo-image";
import icons from "@/src/constants/icons";
import 'dayjs/locale/pt-br';

type ModalDatePickerProps = {
    visible: boolean;
    onRequestClose: () => void;
    style?: StyleProp<ViewStyle>;
    setValue: (date: DateType) => void;
    value: DateType;
};

export default function ModalDatePicker(props: ModalDatePickerProps) {
    const defaultStyles = useDefaultStyles();

    return(
        <Modal
            animationType="fade"
            visible={props.visible}
            onRequestClose={props.onRequestClose}
            transparent={true}
        >
            <TouchableWithoutFeedback onPress={props.onRequestClose}>
                <View style={styles.centeredView}>
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
                                <DateTimePicker
                                    mode="single"
                                    date={props.value}
                                    onChange={({ date }) =>  props.setValue(date)}
                                    styles={{
                                        today: { borderColor: colors.primary, borderWidth: 1 },
                                        selected: { backgroundColor: colors.primary, borderRadius: 8 },
                                        selected_label: { color: colors.white },
                                        calendar: styles.calendar,
                                    }}
                                    weekdaysHeight={40}
                                    locale="pt-br"

                                />
                            </ScrollView>
                        </View>
                    </TouchableWithoutFeedback>
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
        alignItems: 'center',
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
        maxHeight: windowHeight * 0.95,
    },
    modalView: {
        width: '90%',
        backgroundColor: colors.white,
        borderRadius: spacing.lg,
        padding: spacing.xx,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        gap: spacing.lg,
        alignSelf: 'center',
    },
    scrollContainer: {
        gap: spacing.lg,
    },
    calendar: {
        color: colors.black
    }
});