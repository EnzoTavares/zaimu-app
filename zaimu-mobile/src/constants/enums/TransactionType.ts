export enum TransactionType {
    'Receita' = 1,
    'Despesa' = 2,
}

export const transactionTypeDropdownData = Object.entries(TransactionType)
    .filter(([key, value]) => typeof value === "number")
    .map(([label, value]) => ({
        label,
        value: value.toString(),
    }));