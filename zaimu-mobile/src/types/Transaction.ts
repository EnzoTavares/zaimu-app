import {TransactionType} from "@/src/constants/enums/TransactionType";
import {Category} from "@expo/metro-runtime/build/error-overlay/Data/parseLogBoxLog";

export type Transaction = {
    id?: number;
    idUser?: number;
    title: string;
    amount: number;
    idCategory: number;
    idType: number;
    transactionDate: number;
}