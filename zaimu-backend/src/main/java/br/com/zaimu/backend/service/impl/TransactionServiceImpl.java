package br.com.zaimu.backend.service.impl;

import br.com.zaimu.backend.model.entity.Transaction;
import br.com.zaimu.backend.model.exception.ZaimuExecutionException;
import br.com.zaimu.backend.repository.hibernate.TransactionRepository;
import br.com.zaimu.backend.repository.hibernate.UserRepository;
import br.com.zaimu.backend.service.TransactionService;
//import br.com.zaimu.backend.service.request.RequestScopeService;
import br.com.zaimu.backend.service.request.RequestScopeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionServiceImpl extends RequestScopeService implements TransactionService {

    private static final Logger logger = LoggerFactory.getLogger(TransactionServiceImpl.class);

    @Autowired
    private TransactionRepository transactionRepository;

    public List<Transaction> getUserTransactions() {
        try {
            return transactionRepository.getUserTransactions(getUserId());
        } catch (Exception e) {
            logger.error("Error getting user transactions: {}", e.getMessage());
            throw new ZaimuExecutionException("Não foi possível buscar as transações do usuário.", e);
        }
    }

    public Long createTransaction(Transaction transaction) {
        if (transaction.getTitle().isEmpty() || transaction.getAmount() == null
                || transaction.getIdCategory() == null || transaction.getIdType() == null || transaction.getTransactionDate() == null
        ) {
//            throw new
        }
        return 2L;
    }
}
