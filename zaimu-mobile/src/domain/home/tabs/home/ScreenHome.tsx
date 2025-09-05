import React from 'react'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import BalanceCard from '@/src/components/home/homeCards/BalanceCard'
import IncomeExpenseCard from '@/src/components/home/homeCards/IncomeExpenseCard'
import MonthSummaryCard from '@/src/components/home/homeCards/MonthSummaryCard'
import TransactionItem from '@/src/components/common/TransactionItem'
// import GoalItem from '@/src/components/common/GoalItem'
import homeTexts from '@/src/constants/texts/domain/home/tabs/home/homeTexts'
import { spacing } from "@/src/themes/dimensions"
import colors from "@/src/themes/colors"
import { fontFamily } from "@/src/themes/typography"
import { TransactionType } from '@/src/constants/enums/TransactionType'


const data = {
    balance: 110420.42,
    income: 150540.74,
    expense: 40120.32,
    summary: {
        income: 12540,
        expense: 4291,
        percentUsed: 34.21,
    },
    transactions: [
        { title: 'Salário', category: 'Trabalho', amount: 12540, type: TransactionType.INCOME, date: '20/8/2025' },
        { title: 'Hambúrguer', category: 'Alimentação', amount: 42, type: TransactionType.EXPENSE, date: '20/8/2025' },
        { title: 'SSD 1tb', category: 'Itens', amount: 540, type: TransactionType.EXPENSE, date: '19/8/2025' },
        { title: 'Freelance', category: 'Trabalho', amount: 1900, type: TransactionType.INCOME, date: '19/8/2025' },
        { title: 'Aluguel do Apartamento', category: 'Casa', amount: 2200, type: TransactionType.EXPENSE, date: '19/8/2025' },
    ],
    // goals: [
    //     { title: 'Viagem para a Estônia', percent: 72, saved: 10944, target: 15200 },
    //     { title: 'NVIDIA GeForce RTX 4090', percent: 50, saved: 10200, target: 20200 },
    //     { title: 'FIAT Palio 2009', percent: 63, saved: 11466, target: 18200 },
    // ],
}

const ScreenHome = () => (
    <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Saldo atual */}
        <BalanceCard value={data.balance} label={homeTexts.accountBalance} />

        {/* Entrada e Saída */}
        <View style={styles.row}>
            <IncomeExpenseCard
                type={TransactionType.INCOME}
                value={data.income}
                label={homeTexts.income}
            />
            <IncomeExpenseCard
                type={TransactionType.EXPENSE}
                value={data.expense}
                label={homeTexts.expenses}
            />
        </View>

        {/* Resumo de Agosto */}
        <MonthSummaryCard summary={data.summary} />

        {/* Transações Recentes */}
        <View style={styles.listCard}>
            <View style={styles.listHeader}>
                <Text style={styles.sectionTitle}>{homeTexts.recentTransactions}</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAll}>Ver todas</Text>
                </TouchableOpacity>
            </View>
            <View style={{gap: spacing.sm}}>
                {data.transactions.map((tx, idx) => (
                    <TransactionItem key={idx} {...tx} />
                ))}
            </View>
        </View>

        {/*/!* Suas metas *!/*/}
        {/*<View style={styles.listCard}>*/}
        {/*    <View style={styles.listHeader}>*/}
        {/*        <Text style={styles.sectionTitle}>{homeTexts.goals}</Text>*/}
        {/*        <TouchableOpacity>*/}
        {/*            <Text style={styles.seeAll}>Ver todas</Text>*/}
        {/*        </TouchableOpacity>*/}
        {/*    </View>*/}
        {/*    <View style={{gap: spacing.sm}}>*/}
        {/*        {data.goals.map((goal, idx) => (*/}
        {/*            <GoalItem key={idx} {...goal} />*/}
        {/*        ))}*/}
        {/*    </View>*/}
        {/*</View>*/}
    </ScrollView>
)

export default ScreenHome

const styles = StyleSheet.create({
    contentContainer: { alignItems: 'center', paddingBottom: spacing.xl, marginTop: spacing.lg },
    row: { flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginBottom: spacing.md },
    listCard: { width: '88%', marginBottom: spacing.xxs, paddingVertical: spacing.md, paddingHorizontal: spacing.lg, backgroundColor: colors.white, borderRadius: 16 },
    listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xxs },
    sectionTitle: {
        fontFamily: fontFamily.bold,
        fontSize: 22,
        color: colors.black,
        marginBottom: spacing.md,
        marginTop: 6,
        marginLeft: -4
    },
    seeAll: {
        fontFamily: fontFamily.medium,
        fontSize: 15,
        color: colors.darkGrey,
        fontWeight: '500',
        marginBottom: spacing.md,
        marginTop: 6,

    },
})