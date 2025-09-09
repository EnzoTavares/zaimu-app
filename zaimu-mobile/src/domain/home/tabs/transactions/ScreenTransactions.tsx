import React, {useState} from 'react';
import {Alert, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
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
import transactionsInputTexts from "@/src/constants/texts/inputs/Transaction";
import ThickFilledButton from "@/src/components/buttons/ThickFilledButton";
import DecimalInput from "@/src/components/inputs/DecimalInput";

const ScreenTransactions = () => {
    const [searchTransaction, setSearchTransaction] = useState('');
    const [addTransactionModalVisible, setAddTransactionModalVisible] = useState(false);
    const [filterModalVisible, setFilterModalVisible] = useState(false);

    const [newTransactionTitle, setNewTransactionTitle] = useState('');
    const [newTransactionAmount, setNewTransactionAmount] = useState('');
    const [newTransactionCategory, setNewTransactionCategory] = useState('');
    const [newTransactionDate, setNewTransactionDate] = useState('');
    const [newTransactionType, setNewTransactionType] = useState<'income' | 'expense'>('income');

    const [categoryFilter, setCategoryFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [minAmountFilter, setMinAmountFilter] = useState('');
    const [maxAmountFilter, setMaxAmountFilter] = useState('');

    function handleCloseAddTransactionModal() {
        setAddTransactionModalVisible(false);
    }

    function handleCloseFilterModal() {
        setFilterModalVisible(false);
    }

    function submitNewTransaction() {

    }

    function submitFilter() {

    }

    function handleClearNewTransactionForm () {
        Alert.alert(
            transactionsTexts.clearForm,
            transactionsTexts.clearFormConfirmationText,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                    onPress: () => {
                        return;
                    },
                },
                {
                    text: 'Limpar',
                    onPress: () => {
                        setNewTransactionTitle('');
                        setNewTransactionAmount('');
                        setNewTransactionCategory('');
                        setNewTransactionDate('');
                        setNewTransactionType('income');
                    },
                }
            ]
        )
    }

    function handleClearFilterForm () {
        Alert.alert(
            transactionsTexts.clearForm,
            transactionsTexts.clearFormConfirmationText,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                    onPress: () => {
                        return;
                    },
                },
                {
                    text: 'Limpar',
                    onPress: () => {
                        setCategoryFilter('');
                        setTypeFilter('');
                        setDateFilter('');
                        setMinAmountFilter('');
                        setMaxAmountFilter('');
                    },
                }
            ]
        )
    }

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
        >
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
                onPress={() => setFilterModalVisible(true)}
                buttonIcon={'whiteFilterCircle'}
                buttonText={transactionsTexts.filter}
            >
                <CustomTextInput
                    placeholder={filterTexts.placeholderTransaction}
                    value={searchTransaction}
                    setValue={setSearchTransaction}
                />
            </ActionHeader>

            <ModalBottom
                visible={addTransactionModalVisible}
                onRequestClose={handleCloseAddTransactionModal}
                header={
                    <Text style={styles.modalTitle}>{transactionsTexts.addTransaction}</Text>
                }
            >
                <CustomTextInput
                    label={transactionsInputTexts.labelTitle}
                    placeholder={transactionsInputTexts.placeholderTitle}
                    value={newTransactionTitle}
                    setValue={setNewTransactionTitle} />

                <View style={styles.twoInputsContainer}>
                    <View style={{ flex: 1 }}>
                        <DecimalInput
                            label={transactionsInputTexts.labelAmount}
                            placeholder={transactionsInputTexts.placeholderAmount}
                            value={newTransactionAmount}
                            setValue={setNewTransactionAmount}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <CustomTextInput
                            label={transactionsInputTexts.labelCategory}
                            placeholder={transactionsInputTexts.placeholderCategory}
                            value={newTransactionCategory}
                            setValue={setNewTransactionCategory}
                        />
                    </View>
                </View>

                <View style={styles.twoInputsContainer}>
                    <View style={{ flex: 1 }}>
                        <CustomTextInput
                            label={transactionsInputTexts.labelDate}
                            placeholder={transactionsInputTexts.placeholderDate}
                            value={newTransactionDate}
                            setValue={setNewTransactionDate} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <CustomTextInput
                            label={transactionsInputTexts.labelType}
                            placeholder={transactionsInputTexts.placeholderType}
                            value={newTransactionType}
                            setValue={(text) => setNewTransactionType(text as 'income' | 'expense')}
                        />
                    </View>
                </View>

                <View style={styles.clearButtonRow}>
                    <TouchableOpacity onPress={handleClearNewTransactionForm}>
                        <Text style={styles.clearFormText}>
                            {transactionsTexts.clearForm}
                        </Text>
                    </TouchableOpacity>
                </View>

                <ThickFilledButton
                    label={transactionsInputTexts.labelConfirmButton}
                    onPress={submitNewTransaction}
                />
            </ModalBottom>

            <ModalBottom
                visible={filterModalVisible}
                onRequestClose={handleCloseFilterModal}
                header={
                    <Text style={styles.modalTitle}>{transactionsTexts.filter}</Text>
                }
            >
                <View style={styles.twoInputsContainer}>
                    <View style={{ flex: 1 }}>
                        <CustomTextInput
                            label={transactionsInputTexts.labelCategory}
                            placeholder={transactionsInputTexts.placeholderCategory}
                            value={categoryFilter}
                            setValue={setCategoryFilter}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <CustomTextInput
                            label={transactionsInputTexts.labelType}
                            placeholder={transactionsInputTexts.placeholderType}
                            value={typeFilter}
                            setValue={setTypeFilter}
                        />
                    </View>
                </View>

                <View style={styles.twoInputsContainer}>
                    <View style={{ flex: 1 }}>
                        <DecimalInput
                            label={transactionsInputTexts.labelMinAmount}
                            placeholder={transactionsInputTexts.placeholderMinAmount}
                            value={minAmountFilter}
                            setValue={setMinAmountFilter}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <DecimalInput
                            label={transactionsInputTexts.labelMaxAmount}
                            placeholder={transactionsInputTexts.placeholderMaxAmount}
                            value={maxAmountFilter}
                            setValue={setMaxAmountFilter}
                        />
                    </View>
                </View>

                <View style={styles.clearButtonRow}>
                    <TouchableOpacity onPress={handleClearFilterForm}>
                        <Text style={styles.clearFormText}>
                            {transactionsTexts.clearForm}
                        </Text>
                    </TouchableOpacity>
                </View>

                <ThickFilledButton
                    label={transactionsInputTexts.labelFilterButton}
                    onPress={submitFilter}
                />
            </ModalBottom>

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
    },
    twoInputsContainer: {
        display: "flex",
        flexDirection: "row",
        gap: spacing.lg,
    },
    clearButtonRow: {
        flexDirection: 'row'
    },
    clearFormText: {
        fontFamily: fontFamily.regular,
        fontSize: 16,
        color: colors.darkGreen,
        textDecorationLine: "underline",
    },
})