import React, {useRef, useState} from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle, Keyboard, Text, TextInput} from 'react-native';
import {Dropdown, IDropdownRef} from 'react-native-element-dropdown';
import icons from "@/src/constants/icons";
import {Image} from 'expo-image'
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
    position?: 'auto' | 'top' | 'bottom';
    onOpenRequest?: () => void;
}

const DropdownInput = (props: DropdownInputProps) => {
    const [isFocus, setIsFocus] = useState(false);
    const dropdownRef = useRef<IDropdownRef>(null);

    const handleOpenDropdown = () => {
        if (Keyboard.isVisible()) {
            props.onOpenRequest?.();
            const sub = Keyboard.addListener("keyboardDidHide", () => {
                setIsFocus(true);
                dropdownRef.current?.open();
                sub.remove();
            });
        } else {
            props.onOpenRequest?.();
            setIsFocus(true);
            dropdownRef.current?.open();
        }
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
                onPress={handleOpenDropdown}
            >
                {props.icon && (
                    <Image
                        source={icons[props.icon]}
                        style={styles.icon}
                    />
                )}
                <Dropdown
                    ref={dropdownRef}
                    style={styles.dropdown}
                    data={props.data}
                    dropdownPosition={props.position || 'auto'}
                    search={props.searchable}
                    renderInputSearch={!props.searchable ? () => null : undefined}

                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Selecione' : '...'}
                    searchPlaceholder="Buscar..."
                    value={props.value}
                    pointerEvents="none"
                    onBlur={() => {
                        setIsFocus(false)
                    }}
                    onChange={item => {
                        props.setValue(item.value);
                        setIsFocus(false);
                    }}
                />
            </TouchableOpacity>
        </View>
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