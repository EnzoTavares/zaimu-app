import React, {useRef, useState} from 'react';
import {StyleProp, StyleSheet, Text, TextInput, TouchableOpacity, View, ViewStyle} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import {Image} from "expo-image";
import icons from "@/src/constants/icons";
import colors from "@/src/themes/colors";
import {spacing} from "@/src/themes/dimensions";
import {fontStyles} from "@/src/themes/typography";
import {IconName} from "@/src/types/Icon";

type DropdownInputProps = {
    label?: string;
    icon?: IconName,
    placeholder?: string;
    style?: StyleProp<ViewStyle>;
    value: string;
    setValue: (text: string) => void;
    data: { label: string; value: string }[];
    searchable?: boolean;
}

const DropdownInput = (props: DropdownInputProps) => {
    const [isFocus, setIsFocus] = useState(false);
    const inputRef = useRef<any>(null);

    const renderLabel = () => {
        if (props.value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Dropdown label
                </Text>
            );
        }
        return null;
    };

    return (

        <View style={[styles.container, props.style]}>
            {props.label &&(
                <Text style={styles.label}>
                    {props.label}
                </Text>
            )}
            <TouchableOpacity
                style={styles.inputContainer}
                activeOpacity={1}
                onPress={() => inputRef.current?.focus()}
            >
                {props.icon && (
                    <Image
                        source={icons[props.icon]}
                        style={styles.icon}
                    />
                )}
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: colors.primary }]}
                    data={props.data}
                    search={props.searchable}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Selecione' : '...'}
                    searchPlaceholder="Buscar..."
                    value={props.value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        props.setValue(item.value);
                        setIsFocus(false);
                    }}
                />
            </TouchableOpacity>
        </View>


        // <View style={[styles.container, props.style]}>
        //     {props.label && (
        //         <Text style={styles.label}>{props.label}</Text>
        //     )}
        //     <View style={styles.inputWrapper}>

        //     </View>
        // </View>

    );
};

export default DropdownInput;

const styles = StyleSheet.create({
    dropdown: {
        flex: 1,
        backgroundColor: 'transparent',
        borderWidth: 0,
        height: 48,
    },
    container: {
        width: "100%",
    },
    inputContainer: {
        backgroundColor: colors.greyExtraLight,
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
        marginRight: spacing.mmd,
        marginLeft: spacing.xxs,
    },
    input: {
        ...fontStyles.assistanceRegular,
        color: colors.black,
        height: "100%",
        flex: 1,
        paddingRight: spacing.xs,
    }
});