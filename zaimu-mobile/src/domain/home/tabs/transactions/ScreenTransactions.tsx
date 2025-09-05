import React, {useState} from 'react';
import {StyleSheet, Text} from "react-native";
import transactionsTexts from "@/src/constants/texts/domain/home/tabs/Transactions";
import {fontFamily, fontStyles} from "@/src/themes/typography";
import ActionHeader from "@/src/components/common/ActionHeader";
import {spacing} from "@/src/themes/dimensions";
import colors from "@/src/themes/colors";
import CustomTextInput from "@/src/components/inputs/TextInput";
import filterTexts from "@/src/constants/texts/inputs/Filter";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import BigTransactionCard from "@/src/components/home/transactions/BigTransactionCard";
import ModalBottom from "@/src/components/modals/ModalBottom";
import addTransactionsTexts from "@/src/constants/texts/inputs/Transaction";

const ScreenTransactions = () => {
    const [searchTransaction, setSearchTransaction] = useState('');
    const [addTransactionModalVisible, setAddTransactionModalVisible] = useState(false);
    const [filterModalVisible, setFilterModalVisible] = useState(false);

    const [newTransactionTitle, setNewTransactionTitle] = useState('');
    const [newTransactionAmount, setNewTransactionAmount] = useState('');
    const [newTransactionCategory, setNewTransactionCategory] = useState('');
    const [newTransactionDate, setNewTransactionDate] = useState('');

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={true}
            keyboardShouldPersistTaps="handled"
        >
            <ModalBottom
                visible={addTransactionModalVisible}
                onRequestClose={() => setAddTransactionModalVisible(false)}
            >
                <Text style={styles.modalTitle}>{transactionsTexts.addTransaction}</Text>

                <CustomTextInput
                    placeholder={addTransactionsTexts.placeholderTitle}
                    value={newTransactionTitle}
                    setValue={setNewTransactionTitle} />

                <CustomTextInput
                    placeholder={addTransactionsTexts.placeholderAmount}
                    value={newTransactionAmount}
                    setValue={setNewTransactionAmount} />

                <CustomTextInput
                    placeholder={addTransactionsTexts.placeholderCategory}
                    value={newTransactionCategory}
                    setValue={setNewTransactionCategory} />

                <CustomTextInput
                    placeholder={addTransactionsTexts.placeholderDate}
                    value={newTransactionDate}
                    setValue={setNewTransactionDate} />
            </ModalBottom>

            <ActionHeader
                onPress={() => setAddTransactionModalVisible(true)}
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

            <BigTransactionCard title={'Salário'} amount={12000} category={'Trabalho'} date={'12/01/2024'}/>

            <BigTransactionCard title={'Salário'} amount={-12000} category={'Trabalho'} date={'12/01/2024'}/>

            <BigTransactionCard title={'Salário'} amount={12000} category={'Trabalho'} date={'12/01/2024'}/>

            <BigTransactionCard title={'Salário'} amount={12000} category={'Trabalho'} date={'12/01/2024'}/>
        </KeyboardAwareScrollView>
    );
};

export default ScreenTransactions;

const styles = StyleSheet.create({
    container: {
        paddingVertical: spacing.xx,
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
    },
    modalTitle: {
        ...fontStyles.semiBoldCallout,
    }
})