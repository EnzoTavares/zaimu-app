import React, {useEffect, useState} from 'react'
import {ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import BalanceCard from '@/src/components/home/homeCards/BalanceCard'
import IncomeExpenseCard from '@/src/components/home/homeCards/IncomeExpenseCard'
import MonthSummaryCard from '@/src/components/home/homeCards/MonthSummaryCard'
import TransactionItem from '@/src/components/common/TransactionItem'
// import GoalItem from '@/src/components/common/GoalItem'
import homeTexts from '@/src/constants/texts/domain/home/tabs/home/homeTexts'
import {lineHeights, spacing} from "@/src/themes/dimensions"
import colors from "@/src/themes/colors"
import {fontFamily, fontStyles} from "@/src/themes/typography"
import { TransactionType } from '@/src/constants/enums/TransactionType'
import {useTransactions} from "@/src/context/TransactionsContext";
import * as transactionsService from "../transactions/service";
import {HttpStatusEnum} from "@/src/constants/enums/HttpStatusEnum";
import LoadingOverlay from "@/src/components/common/LoadingOverlay";
import ThickFilledButton from "@/src/components/buttons/ThickFilledButton";
import {router} from "expo-router";
import {useNavigation} from "@react-navigation/native";
import ThinFilledButton from "@/src/components/buttons/ThinFilledButton";
import GradientIconButton from "@/src/components/buttons/GradientIconButton";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";

type TabParamList = {
    Home: undefined;
    Transactions: undefined;
};

type HomeScreenNavigationProp = BottomTabNavigationProp<TabParamList, 'Home'>;

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
        { title: 'Salário', category: 'Trabalho', amount: 12540, type: TransactionType.Receita, date: '20/8/2025' },
        { title: 'Hambúrguer', category: 'Alimentação', amount: 42, type: TransactionType.Despesa, date: '20/8/2025' },
        { title: 'SSD 1tb', category: 'Itens', amount: 540, type: TransactionType.Despesa, date: '19/8/2025' },
        { title: 'Freelance', category: 'Trabalho', amount: 1900, type: TransactionType.Receita, date: '19/8/2025' },
        { title: 'Aluguel do Apartamento', category: 'Casa', amount: 2200, type: TransactionType.Despesa, date: '19/8/2025' },
    ],
    // goals: [
    //     { title: 'Viagem para a Estônia', percent: 72, saved: 10944, target: 15200 },
    //     { title: 'NVIDIA GeForce RTX 4090', percent: 50, saved: 10200, target: 20200 },
    //     { title: 'FIAT Palio 2009', percent: 63, saved: 11466, target: 18200 },
    // ],
}

const ScreenHome = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const [isLoading, setIsLoading] = useState(false);
    const { transactions, setTransactions } = useTransactions();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await transactionsService.fetchUserTransactions();

                if (response.status === HttpStatusEnum.FAIL) {
                    Alert.alert("Falha ao buscar transações", response.message);
                    return;
                }

                setTransactions(response.object);
            } catch (error) {
                console.error("Login error: ", error);
                Alert.alert("Login Failed", "Please try again later");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (transactions.length === 0) {
        return(
            <View style={[styles.contentContainer, { flex: 1, justifyContent: 'center', width: '100%' }]}>
                <BalanceCard value={0} label={homeTexts.accountBalance} />

                <View style={styles.addTransactionPromptContainer}>
                    <Text style={styles.addTransactionPrompt}>Oops... Nenhuma transação encontrada!</Text>
                    <GradientIconButton
                        icon={'whitePlusLg'}
                        onClick={() => navigation.navigate('Transactions')}
                    />
                </View>

                <LoadingOverlay visible={isLoading} />
            </View>
        );
    }

    else {
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {/* Saldo atual */}
                <BalanceCard value={data.balance} label={homeTexts.accountBalance} />

                {/* Entrada e Saída */}
                <View style={styles.row}>
                    <IncomeExpenseCard
                        type={TransactionType.Receita}
                        value={data.income}
                        label={homeTexts.income}
                    />
                    <IncomeExpenseCard
                        type={TransactionType.Despesa}
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

                <LoadingOverlay visible={isLoading} />
            </ScrollView>
        );
    }
}

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
    addTransactionPromptContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        width: '70%',
        gap: spacing.md
    },
    addTransactionPrompt: {
        ...fontStyles.main,
        textAlign: 'center',
        lineHeight: 35,
    }
})