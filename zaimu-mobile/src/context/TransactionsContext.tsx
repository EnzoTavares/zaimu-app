// src/context/TransactionsContext.tsx
import React, { createContext, useContext, useState } from 'react';
import {Transaction} from "@/src/types/Transaction";

type TransactionsContextType = {
    transactions: Transaction[];
    setTransactions: (txs: Transaction[]) => void;
};

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

export const TransactionsProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    return (
        <TransactionsContext.Provider value={{ transactions, setTransactions }}>
            {children}
        </TransactionsContext.Provider>
    );
};

export const useTransactions = () => {
    const context = useContext(TransactionsContext);
    if (!context) throw new Error('useTransactions must be used within TransactionsProvider');
    return context;
};
