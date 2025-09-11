import React from "react";
import {StyleSheet, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {TransactionType} from "@/src/constants/enums/TransactionType";

type TransactionGreenArrowProps = {
    type: TransactionType.Receita | TransactionType.Despesa
    size?: number;
};

const TransactionGreenArrow: React.FC<TransactionGreenArrowProps> = ({ type, size = 28 }) => {
    const isIncome = type === TransactionType.Receita;
    const iconName = isIncome ? 'arrow-upward' : 'arrow-downward';
    const iconColor = isIncome ? '#7CB342' : '#EE2525';

    return (
        <View style={styles.iconContainer}>
            <View style={[
                styles.iconCircle,
                {
                    borderColor: iconColor,
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                }
            ]}>
                <MaterialIcons name={iconName} size={size * 0.65} color={iconColor} />
            </View>
        </View>
    );
}

export default TransactionGreenArrow;

const styles = StyleSheet.create({
    iconContainer: {
        marginRight: 0,
    },
    iconCircle: {
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
});