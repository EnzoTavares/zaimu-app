package br.com.zaimu.backend.service.impl;

import br.com.zaimu.backend.model.entity.TransactionUser;
import br.com.zaimu.backend.model.security.RequestUser;
import br.com.zaimu.backend.service.TransactionService;
//import br.com.zaimu.backend.service.request.RequestScopeService;
import br.com.zaimu.backend.service.request.RequestScopeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionServiceImpl extends RequestScopeService implements TransactionService {

    private static final Logger logger = LoggerFactory.getLogger(TransactionServiceImpl.class);

    public void getUserTransactions() {

        logger.info("User token: {}", getToken());

        logger.info("User id: {}", getUserId());
    }

    public Long createTransaction(TransactionUser transactionUser) {
        if (transactionUser.getTitle().isEmpty() || transactionUser.getAmount() == null
                || transactionUser.getIdCategory() == null || transactionUser.getIdType() == null || transactionUser.getTransactionDate() == null
        ) {
//            throw new
        }
        return 2L;
    }
}
