import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Card from "@/src/components/cards/Card";
import {Image} from "expo-image";
import {spacing} from "@/src/themes/dimensions";
import icons from "@/src/constants/icons";
import {fontStyles} from "@/src/themes/typography";
import colors from "@/src/themes/colors";
import {formatCurrencyBRL} from "@/src/utils/hooks/formatNumbers";
import { format } from 'date-fns';
import {TransactionType} from "@/src/constants/enums/TransactionType";

type BigTransactionCardProps = {
    title: string;
    amount: number;
    category: string;
    date: string;
    type: number;
}

const BigTransactionCard = (props: BigTransactionCardProps) => {
    const sign = props.type === TransactionType.Receita ? '+' : '-';
    const formattedAmount = formatCurrencyBRL(Math.abs(props.amount));
    const label = sign + " " + formattedAmount;

    const dateObject = new Date(props.date);

    const formattedDate = format(dateObject, 'dd/MM/yyyy');

    return (
        <Card shadowed={true} style={styles.transactionCard}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>
                    {props.title}
                </Text>
                <View style={styles.iconsTopContainer}>
                    <TouchableOpacity
                        onPress={() => {}}
                    >
                        <Image
                            source={icons.greyPencilSquare}
                            style={styles.iconsTop}
                        />
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={() => {}}
                    >
                        <Image
                            source={icons.greyTrash}
                            style={styles.iconsTop}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={props.type === TransactionType.Receita ? styles.income : styles.expense}>
                {label}
            </Text>
            <View style={styles.bottomContainer}>
                <View style={styles.categoryContainer}>
                    <Image
                        source={icons.greyArrowOutlined}
                        style={styles.iconsBottom}
                    />

                    <Text style={styles.bottomText}>
                        {props.category}
                    </Text>
                </View>

                <View style={styles.dateContainer}>
                    <Image
                        source={icons.greyCalendarOutlined}
                        style={styles.iconsBottom}
                    />

                    <Text style={styles.bottomText}>
                        {formattedDate}
                    </Text>
                </View>
            </View>
        </Card>
    );
}

export default BigTransactionCard;

const styles = StyleSheet.create({
    transactionCard: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        gap: spacing.md,
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleText: {
        ...fontStyles.assistanceMedium,
        color: colors.black,
    },
    iconsTop: {
        width: 22,
        height: 22,
    },
    iconsBottom: {
        width: 16,
        height: 16,
    },
    iconsTopContainer: {
        flexDirection: 'row',
        gap: spacing.mmd,
    },
    categoryContainer: {
        flexDirection: 'row',
        gap: spacing.sm,
        alignItems: 'center',
    },
    dateContainer: {
        flexDirection: 'row',
        gap: spacing.sm,
        alignItems: 'center',
    },
    bottomText: {
        ...fontStyles.assistanceRegular,
        color: colors.lighterDarkGrey
    },
    income: {
        ...fontStyles.main,
        color: colors.income,
        textAlignVertical: 'center',
    },
    expense: {
        ...fontStyles.main,
        color: colors.expense,
        textAlignVertical: 'center',
    },
})