package br.com.zaimu.backend.repository.impl;

import br.com.zaimu.backend.model.entity.Transaction;
import br.com.zaimu.backend.model.entity.User;
import br.com.zaimu.backend.model.exception.ZaimuGenericRepositoryException;

import br.com.zaimu.backend.repository.hibernate.TransactionRepository;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;

@Repository
public class TransactionRepositoryImpl implements TransactionRepository {

    private static final Logger logger = LoggerFactory.getLogger(TransactionRepositoryImpl.class);
    @Autowired
    private SessionFactory sessionFactory;

    private boolean defaultReadOnly;

    public Session getSession() {
        this.defaultReadOnly = false;
        Session currentSession;

        try {
            currentSession = sessionFactory.getCurrentSession();
        } catch (HibernateException e) {
            currentSession = sessionFactory.openSession();
        }
        return currentSession;
    }

    public Transaction create (Transaction transaction, Long userId) throws ZaimuGenericRepositoryException {
        try (Session session = getSession()) {
            String query = """
                        INSERT INTO zadm.user_transaction (
                            ID_USER, DS_TITLE, VL_AMOUNT, ID_CATEGORY, ID_TYPE, DT_TRANSACTION
                        ) VALUES (
                            ?, ?, ?, ?, ?, ?
                        ) RETURNING ID_TRANSACTION;
                    """;

            Long generatedId = session.doReturningWork(connection -> {
                try (PreparedStatement ps = connection.prepareStatement(query)) {
                    int parameterIndex = 1;

                    ps.setObject(parameterIndex++, userId);
                    ps.setString(parameterIndex++, transaction.getTitle());
                    ps.setBigDecimal(parameterIndex++, transaction.getAmount());
                    ps.setLong(parameterIndex++, transaction.getIdCategory());
                    ps.setLong(parameterIndex++, transaction.getIdType());
                    ps.setTimestamp(parameterIndex++, transaction.getTransactionDate());

                    try (ResultSet rs = ps.executeQuery()) {
                        return rs.next() ? rs.getLong(1) : null;
                    }
                }
            });

            if (generatedId != null) {
                transaction.setId(generatedId);
                transaction.setIdUser(userId);
                return transaction;
            } else {
                throw new ZaimuGenericRepositoryException("Failed to insert transaction.");
            }
        } catch (ZaimuGenericRepositoryException e) {
            logger.error("Error creating transaction: {}", transaction, e);
            return null;
        }
    }

    public List<Transaction> getUserTransactions(
            Long userId
    ) throws ZaimuGenericRepositoryException{
        try (Session session = getSession()) {
            NativeQuery nativeQuery = session.createNativeQuery("""
                        SELECT *
                        FROM zadm.user_transaction
                        WHERE ID_USER = :ID_USER;
                    """, Transaction.class);
            nativeQuery.setParameter("ID_USER", userId);

            return nativeQuery.getResultList();
        } catch (ZaimuGenericRepositoryException e) {
            logger.error("Could not fetch transactions for user id: {}", userId, e);
            throw new ZaimuGenericRepositoryException("Não foi possível buscar as transações do usuário.");
        }
    }
}
