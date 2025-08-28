import React, {useState} from 'react';
import {StyleSheet, View, Text} from "react-native";
import transactionsTexts from "@/src/constants/texts/domain/home/tabs/Transactions";
import {fontFamily, fontStyles} from "@/src/themes/typography";
import IconAndTextButton from "@/src/components/buttons/IconAndTextButton";
import ActionHeader from "@/src/components/common/ActionHeader";
import {fontSizes, spacing} from "@/src/themes/dimensions";
import colors from "@/src/themes/colors";
import {IconName} from "@/src/types/Icon";
import CustomTextInput from "@/src/components/inputs/TextInput";
import filterTexts from "@/src/constants/texts/inputs/Filter";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import BigTransactionCard from "@/src/components/home/transactions/BigTransactionCard";

const ScreenTransactions = () => {
    const [searchTransaction, setSearchTransaction] = useState('');

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={true}
            keyboardShouldPersistTaps="handled"
        >
            <ActionHeader
                onPress={() => {}}
                buttonIcon={'whitePlusLg'}
                buttonText={transactionsTexts.add}
            >

                <Text style={styles.transactionsText}>
                    {transactionsTexts.transactions}
                </Text>
                <Text style={styles.subtitle}>
                    {transactionsTexts.manage}
                </Text>


            </ActionHeader>

            <ActionHeader
                onPress={() => {}}
                buttonIcon={'whiteFilterCircle'}
                buttonText={transactionsTexts.filter}
            >
                <CustomTextInput
                    placeholder={filterTexts.placeholderTransaction}
                    value={searchTransaction}
                    setValue={setSearchTransaction}
                />
            </ActionHeader>

            <BigTransactionCard />
        </KeyboardAwareScrollView>
    );
};

export default ScreenTransactions;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: '10%',
        width: '85%',
        alignSelf: 'center',
        gap: spacing.lg
    },
    transactionsText: {
        ...fontStyles.semiBoldCallout,
        marginBottom: 10
    },
    subtitle: {
        fontSize: 16,
        fontFamily: fontFamily.medium,
        color: colors.grey,
    }
})