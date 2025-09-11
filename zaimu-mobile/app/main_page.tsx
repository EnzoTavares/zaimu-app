import React from 'react'
import MainNavigator from '@/src/domain/home/MainNavigator'
import {TransactionsProvider} from "@/src/context/TransactionsContext";

export default function MainPage() {
    return (
        <TransactionsProvider>
            <MainNavigator/>
        </TransactionsProvider>
    );
}