import React from 'react'
import { Text, StyleSheet } from 'react-native'
import Card from '@/src/components/cards/Card'
import { fontStyles } from "@/src/themes/typography"
import { spacing } from "@/src/themes/dimensions"
import colors from "@/src/themes/colors"

type BalanceCardProps = {
    value: number
    label: string
}

const BalanceCard = ({ value, label }: BalanceCardProps) => (
    <Card shadowed={false} style={styles.card}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>
            <Text style={styles.currency}>R$ </Text>
            {value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </Text>
    </Card>
)

export default BalanceCard

const styles = StyleSheet.create({
    card: {
        width: '88%',
        marginBottom: spacing.md,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: 20
    },
    label: {
        ...fontStyles.assistanceMedium,
        fontSize: 18,
        color: colors.black,
        marginBottom: 15
    },
    currency: {
        ...fontStyles.semiBoldCallout,
        fontSize: 20,
        color: colors.black,
        marginBottom: -6
    },
    value: {
        ...fontStyles.semiBoldCallout,
        fontSize: 40,
        color: colors.black,
        marginBottom: -10
    }
})