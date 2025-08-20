import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import colors from "@/themes/colors";
import fonts from "@/themes/fonts";

type BigFilledButtonProps = {
    label: string;
    color?: string;
};

function BigFilledButton (props: BigFilledButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.filledButton, props.color ? {backgroundColor: props.color} : null]}
    onPress={() => {/* login */}} >
    <Text style={styles.filledText}>
        {props.label}
        </Text>
        </TouchableOpacity>
);

}

export default BigFilledButton;

const styles = StyleSheet.create({
    filledButton: {
        flex: 1,
        paddingVertical: 8,
        backgroundColor: colors.primary,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    filledText: {
        color: '#fff',
        fontFamily: fonts.family.medium,
        fontSize: fonts.text.main.size,
    }
});