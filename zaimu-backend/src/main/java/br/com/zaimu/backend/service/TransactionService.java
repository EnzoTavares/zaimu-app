package br.com.zaimu.backend.service;

import br.com.zaimu.backend.model.entity.TransactionUser;

public interface TransactionService {

    void getUserTransactions();

    Long createTransaction(TransactionUser transactionUser);
}
