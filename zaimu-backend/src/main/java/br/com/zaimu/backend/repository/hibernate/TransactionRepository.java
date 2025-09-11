package br.com.zaimu.backend.repository.hibernate;

import br.com.zaimu.backend.model.entity.Transaction;
import br.com.zaimu.backend.model.exception.ZaimuGenericRepositoryException;
import br.com.zaimu.backend.model.to.UserView;

import java.util.List;

public interface TransactionRepository {

    Transaction create(Transaction transaction, Long userId);

    List<Transaction> getUserTransactions(
            Long userId
    ) throws ZaimuGenericRepositoryException;
}
