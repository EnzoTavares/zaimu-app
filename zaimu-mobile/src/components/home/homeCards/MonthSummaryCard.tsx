import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Card from '@/src/components/cards/Card'
import ProgressBar from '@/src/components/common/ProgressBar'
import { fontFamily } from "@/src/themes/typography"
import { fontSizes, spacing } from "@/src/themes/dimensions"
import colors from "@/src/themes/colors"

type MonthSummaryCardProps = {
    summary: {
        income: number
        expense: number
        percentUsed: number
    }
    label?: string
}

const MonthSummaryCard = ({ summary, label = 'Resumo de Agosto' }: MonthSummaryCardProps) => (
    <Card shadowed={false} style={styles.card}>
        <Text style={styles.title}>{label}</Text>
        <View style={styles.row}>
            <Text style={styles.dotIncome}>●</Text>
            <Text style={styles.text}>Receitas</Text>
            <Text style={styles.income}>R$ {summary.income.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.dotExpense}>●</Text>
            <Text style={styles.text}>Despesas</Text>
            <Text style={styles.expense}>R$ {summary.expense.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
        </View>
        <ProgressBar percent={summary.percentUsed} />
        <Text style={styles.percentLabel}>{summary.percentUsed}% do orçamento usado</Text>
    </Card>
)

export default MonthSummaryCard

const styles = StyleSheet.create({
    card: {
        width: '88%',
        marginBottom: spacing.md
    },
    title: {
        fontFamily: fontFamily.semiBold,
        fontSize: 22,
        marginBottom: spacing.lg,
        marginTop: -10,
        marginLeft: -14,
        color: colors.black
    },
    row: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    dotIncome: { color: colors.greenMiddle, marginRight: 11, fontWeight: '700', fontSize: 10, marginLeft: -20 },
    dotExpense: { color: colors.redMiddle, marginRight: 11, fontWeight: '700', fontSize: 10, marginLeft: -20 },
    text: {
        fontFamily: fontFamily.medium,
        fontSize: 18,
        flex: 1,
        color: colors.black
    },
    income: {
        fontFamily: fontFamily.bold,
        fontSize: fontSizes.md,
        color: colors.greenMiddle
    },
    expense: {
        fontFamily: fontFamily.bold,
        fontSize: fontSizes.md,
        color: colors.redMiddle
    },
    percentLabel: {
        fontFamily: fontFamily.regular,
        fontSize: fontSizes.sm,
        marginTop: 5,
        marginBottom: -12,
        color: colors.greyMiddle
    },
})