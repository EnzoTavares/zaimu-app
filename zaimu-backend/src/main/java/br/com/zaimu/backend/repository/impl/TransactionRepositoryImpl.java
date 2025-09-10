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

    public Long create (Transaction transaction) throws ZaimuGenericRepositoryException {
//        try (Session session = getSession()) {
//            String query = """
//                        INSERT INTO zadm.user (
//                            ID_USER, CD_COGNITO_SUB, DS_EMAIL, NM_GIVEN_NAME, NM_FAMILY_NAME, CD_NICKNAME, DT_CREATED, FL_STATUS
//                        ) VALUES (
//                            nextval('zadm.sq_user_id'), ?, ?, ?, ?, ?, ?, 'A'
//                        ) RETURNING ID_USER;
//                    """;
//
//            return session.doReturningWork(connection -> {
//                try (PreparedStatement ps = connection.prepareStatement(query)) {
//                    int parameterIndex = 1;
//
//                    ps.setObject(parameterIndex++, user.getUuid());
//                    ps.setString(parameterIndex++, user.getEmail());
//                    ps.setString(parameterIndex++, user.getGivenName());
//                    ps.setString(parameterIndex++, user.getFamilyName());
//                    ps.setString(parameterIndex++, user.getNickname());
//                    ps.setTimestamp(parameterIndex++, user.getCreateDate());
//
//                    try (ResultSet rs = ps.executeQuery()) {
//                        return rs.next()
//                                ? rs.getLong(1)
//                                : null;
//                    }
//                }
//            });
//        } catch (ZaimuGenericRepositoryException e) {
//            logger.error("Error creating user: {}", user, e);
//            return null;
//        }
        return 1L;
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
