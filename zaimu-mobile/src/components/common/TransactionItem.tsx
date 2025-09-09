import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TransactionGreenArrow from '../icons/TransactionGreenArrow';
import { fontFamily } from '@/src/themes/typography';
import colors from '@/src/themes/colors';
import {TransactionType} from "@/src/constants/enums/TransactionType";

type TransactionProps = {
    title: string;
    category: string;
    amount: number;
    type: TransactionType.INCOME | TransactionType.EXPENSE;
    date: string;
}

const TransactionItem = ({ title, category, amount, type, date }: TransactionProps)=> {
    const isIncome = type === TransactionType.INCOME;
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <TransactionGreenArrow type={type} />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.category}>{category}</Text>
            </View>
            <View style={styles.rightContainer}>
                <Text style={[styles.amount, isIncome ? styles.income : styles.expense]}>
                    {isIncome ? '+' : '-'}R$ {Math.abs(amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Text>
                <Text style={styles.date}>{date}</Text>
            </View>
        </View>
    );
}
export default TransactionItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 4,
        backgroundColor: colors.white
    },
    iconContainer: {
        marginRight: 10,
        marginLeft: -14
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        fontFamily: fontFamily.medium,
        fontSize: 18,
        color: colors.black,
    },
    category: {
        fontFamily: fontFamily.regular,
        fontSize: 13,
        color: colors.greyMiddle,
        marginTop: 2,
    },
    rightContainer: {
        alignItems: 'flex-end',
        minWidth: 90,
    },
    amount: {
        fontFamily: fontFamily.bold,
        fontSize: 16,
    },
    income: {
        color: colors.greenMiddle,
    },
    expense: {
        color: colors.redMiddle,
    },
    date: {
        fontFamily: fontFamily.regular,
        fontSize: 12,
        color: colors.greyLight,
        marginTop: 2,
    },
});