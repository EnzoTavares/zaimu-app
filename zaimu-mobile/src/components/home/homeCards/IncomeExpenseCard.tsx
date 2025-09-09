import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Card from '@/src/components/cards/Card'
import TransactionGreenArrow from '@/src/components/icons/TransactionGreenArrow'
import { fontFamily } from "@/src/themes/typography"
import { spacing } from "@/src/themes/dimensions"
import colors from "@/src/themes/colors"

type IncomeExpenseCardProps = {
    type: 'income' | 'expense'
    label: string
    value: number
}

const IncomeExpenseCard = ({ type, label, value }: IncomeExpenseCardProps) => (
    <Card shadowed={false} style={styles.card}>
        <View style={styles.header}>
            <Text style={[styles.label, type === 'income' ? styles.incomeLabel : styles.expenseLabel]}>
                {label}
            </Text>
            <TransactionGreenArrow type={type} size={20}/>
        </View>
        <Text style={type === 'income' ? styles.incomeValue : styles.expenseValue}>
            {(type === 'income' ? '+' : '-') + 'R$ ' + value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </Text>
    </Card>
)

export default IncomeExpenseCard

const styles = StyleSheet.create({
    card: {
        flex: 1,
        marginHorizontal: 6,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.md,
        borderRadius: spacing.lg,
        justifyContent: 'center',
        backgroundColor: colors.white,
        alignItems: 'flex-start',
        gap: spacing.sm,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    label: {
        fontFamily: fontFamily.semiBold,
        fontSize: 20,
        color: colors.black,
        textAlign: 'left',
    },
    incomeLabel: {},
    expenseLabel: {},
    incomeValue: {
        fontFamily: fontFamily.bold,
        fontSize: 20,
        color: colors.greenMiddle,
        marginTop: spacing.xxs
    },
    expenseValue: {
        fontFamily: fontFamily.bold,
        fontSize: 20,
        color: colors.redMiddle,
        marginTop: spacing.xxs
    },
})