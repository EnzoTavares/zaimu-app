package br.com.zaimu.backend.service;

import br.com.zaimu.backend.model.entity.Transaction;

import java.util.List;

public interface TransactionService {

    List<Transaction> getUserTransactions();

    Transaction createTransaction(Transaction transaction);
}
