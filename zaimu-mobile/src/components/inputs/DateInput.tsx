import React, {useRef, useState} from 'react';
import {View, TextInput, StyleSheet, Text, StyleProp, ViewStyle, TouchableOpacity} from 'react-native';
import {Image} from "expo-image";
import icons from "@/src/constants/icons";
import colors from "@/src/themes/colors";
import {fontStyles} from "@/src/themes/typography";
import {spacing} from "@/src/themes/dimensions";
import ModalDatePicker from "@/src/components/modals/ModalDatePicker";
import {DateType} from "react-native-ui-datepicker";

type DateInputProps = {
    label?: string;
    placeholder: string;
    style?: StyleProp<ViewStyle>;
    value?: DateType;
    setValue: (date: DateType) => void;
}

const DateInput = (props: DateInputProps) => {
    const inputRef = useRef<TextInput>(null);

    const [showDatePicker, setShowDatePicker] = useState(false);

    const formatDate = (date?: DateType) => {
        if (!date) return '';
        const d = date instanceof Date ? date : new Date(date);
        return d.toLocaleDateString('pt-BR');
    };

    const displayDate = formatDate(props.value) || formatDate(new Date());

    return (
        <View style={[styles.container, props.style]}>
            {props.label &&(
                <Text style={styles.label}>
                    {props.label}
                </Text>
            )}
            <View style={styles.calendarRow}>
                <TouchableOpacity
                    style={styles.inputContainer}
                    activeOpacity={1}
                    onPress={() => setShowDatePicker(true)}
                >
                    <TextInput
                        ref={inputRef}
                        onPress={() => setShowDatePicker(true)}
                        placeholder={props.placeholder}
                        placeholderTextColor={colors.greyMiddle}
                        value={displayDate}
                        style={styles.input}
                        autoFocus={false}
                        editable={false}
                        caretHidden
                        showSoftInputOnFocus={false}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                >
                    <Image
                        source={icons.calendarOutlined}
                        style={styles.icon}
                        tintColor={colors.darkGrey}
                    />
                </TouchableOpacity>
            </View>

            <ModalDatePicker
                visible={showDatePicker}
                onRequestClose={() => setShowDatePicker(false)}
                setValue={props.setValue}
                value={props.value || new Date()}
            />
        </View>
    );
};

export default DateInput;

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    calendarRow: {
        flexDirection: 'row',
        alignItems: "center",
        gap: spacing.sm
    },
    inputContainer: {
        backgroundColor: colors.greyExtraLight,
        flex: 1,
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: spacing.md,
        borderRadius: 13,
        height: 55
    },
    label: {
        ...fontStyles.assistanceRegular,
        color: colors.black,
        marginBottom: spacing.sm
    },
    icon: {
        height: 18,
        width: 18,
    },
    input: {
        ...fontStyles.assistanceRegular,
        color: colors.black,
        height: "100%",
        flex: 1,
        paddingRight: spacing.xs,
    }
});