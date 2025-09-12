import React, {useState} from 'react';
import {Alert, Keyboard, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import transactionsTexts from "@/src/constants/texts/domain/home/tabs/Transactions";
import {fontFamily, fontStyles} from "@/src/themes/typography";
import ActionHeader from "@/src/components/common/ActionHeader";
import {spacing} from "@/src/themes/dimensions";
import colors from "@/src/themes/colors";
import CustomTextInput from "@/src/components/inputs/TextInput";
import filterTexts from "@/src/constants/texts/inputs/Filter";
import {
    KeyboardAwareScrollView,
    KeyboardToolbar
} from "react-native-keyboard-controller";
import BigTransactionCard from "@/src/components/home/transactions/BigTransactionCard";
import ModalBottom from "@/src/components/modals/ModalBottom";
import transactionsInputTexts from "@/src/constants/texts/inputs/Transaction";
import ThickFilledButton from "@/src/components/buttons/ThickFilledButton";
import DecimalInput from "@/src/components/inputs/DecimalInput";
import {useTransactions} from "@/src/context/TransactionsContext";
import GradientIconButton from "@/src/components/buttons/GradientIconButton";
import DropdownInput from "@/src/components/inputs/DropdownInput";
import {Category, categoryDropdownData} from "@/src/constants/enums/Category";
import {transactionTypeDropdownData} from "@/src/constants/enums/TransactionType";
import {Transaction} from "@/src/types/Transaction";
import * as transactionsService from "../transactions/service";
import {HttpStatusEnum} from "@/src/constants/enums/HttpStatusEnum";
import { parse } from "date-fns";
import LoadingOverlay from "@/src/components/common/LoadingOverlay";
import DateInput from "@/src/components/inputs/DateInput";

const ScreenTransactions = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { transactions, setTransactions } = useTransactions();

    const [searchTransaction, setSearchTransaction] = useState('');
    const [addTransactionModalVisible, setAddTransactionModalVisible] = useState(false);
    const [filterModalVisible, setFilterModalVisible] = useState(false);

    const [newTransactionTitle, setNewTransactionTitle] = useState('');
    const [newTransactionAmount, setNewTransactionAmount] = useState('');
    const [newTransactionCategory, setNewTransactionCategory] = useState('');
    const [newTransactionDate, setNewTransactionDate] = useState(new Date());
    const [newTransactionType, setNewTransactionType] = useState('');

    const [categoryFilter, setCategoryFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [minAmountFilter, setMinAmountFilter] = useState('');
    const [maxAmountFilter, setMaxAmountFilter] = useState('');

    function handleCloseAddTransactionModal() {
        setAddTransactionModalVisible(false);
    }

    function handleOpenAddTransactionModal() {
        setAddTransactionModalVisible(true);
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
                        setNewTransactionDate(new Date());
                        setNewTransactionType('');
                    },
                }
            ]
        )
    }

    function handleCloseFilterModal() {
        setFilterModalVisible(false);
    }

    function handleOpenFilterModal() {
        setFilterModalVisible(true);
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

    async function submitNewTransaction() {
        setIsLoading(true);

        const amount = newTransactionAmount === '' ? 0 : Number(newTransactionAmount);

        if (
            newTransactionTitle === '' ||
            amount === 0 ||
            newTransactionCategory === '' ||
            newTransactionType === ''
        ) {
            Alert.alert('Erro', 'Preencha todos os campos para adicionar uma nova transação.');
            return;
        }

        const dateObject = newTransactionDate;

        if (!(dateObject instanceof Date) || isNaN(dateObject.getTime())) {
            Alert.alert('Data Inválida', 'Por favor, selecione uma data válida.');
            return;
        }

        const newTransaction:Transaction = {
            title: newTransactionTitle,
            amount: amount,
            idCategory: Number(newTransactionCategory),
            idType: Number(newTransactionType),
            transactionDate: dateObject.getTime(),
        }

        try {
            const response = await transactionsService.createUserTransactions(newTransaction)

            if (response.status === HttpStatusEnum.FAIL) {
                Alert.alert("Falha ao criar a transação", response.message);
                return;
            }

            setTransactions([...transactions, response.object]);
            setNewTransactionTitle('');
            setNewTransactionAmount('');
            setNewTransactionCategory('');
            setNewTransactionDate(new Date());
            setNewTransactionType('');

            setAddTransactionModalVisible(false);
        } catch (e) {
            console.error("Create transaction error: ", e);
            Alert.alert("Erro", "Tente novamente mais tarde");
        } finally {
            setIsLoading(false);
        }
    }

    function submitFilter() {

    }

    const handleInputFocusLoss = () => {
        Keyboard.dismiss();
    };

    const transactionCards = transactions.map((transaction, index) => (
        <BigTransactionCard
            key={transaction.id || index}
            title={transaction.title}
            amount={transaction.amount}
            category={Category[transaction.idCategory]}
            date={transaction.transactionDate ? transaction.transactionDate.toString() : ''}
            type={transaction.idType}
        />
    ));

    const addTransactionPrompt = [
        <View style={[styles.addTransactionPromptContainer, { justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }]} key="addTransactionPrompt">
            <Text style={styles.addTransactionPrompt}>Cadastre suas transações!</Text>
            <GradientIconButton
                icon={'whitePlusLg'}
                onClick={() => {setAddTransactionModalVisible(true);}}
            />
        </View>
    ];

    const elementToShow = transactions.length === 0
        ? addTransactionPrompt
        : transactionCards;

    return (
        <View style={{flex: 1}}>
            <KeyboardAwareScrollView
                contentContainerStyle={[
                    styles.container,
                    transactions.length === 0 && {flex: 1}
                ]}
                keyboardShouldPersistTaps="handled"
            >
                <ActionHeader
                    onPress={handleOpenAddTransactionModal}
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
                    onPress={handleOpenFilterModal}
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
                            <DateInput
                                label={transactionsInputTexts.labelDate}
                                placeholder={transactionsInputTexts.placeholderDate}
                                value={newTransactionDate}
                                setValue={setNewTransactionDate} />
                        </View>
                    </View>

                    <View style={styles.twoInputsContainer}>
                        <View style={{ flex: 1 }}>
                            <DropdownInput
                                onOpenRequest={handleInputFocusLoss}
                                label={transactionsInputTexts.labelCategory}
                                value={newTransactionCategory}
                                setValue={setNewTransactionCategory}
                                data={categoryDropdownData}
                                position={'top'}
                                searchable={false}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <DropdownInput
                                onOpenRequest={handleInputFocusLoss}
                                label={transactionsInputTexts.labelType}
                                value={newTransactionType}
                                setValue={setNewTransactionType}
                                data={transactionTypeDropdownData}
                                searchable={false}
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
                {elementToShow}
            </KeyboardAwareScrollView>

            <LoadingOverlay visible={isLoading} />
        </View>
    );

}

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