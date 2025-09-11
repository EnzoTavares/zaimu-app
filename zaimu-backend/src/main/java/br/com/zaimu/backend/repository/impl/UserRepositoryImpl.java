package br.com.zaimu.backend.repository.impl;

import br.com.zaimu.backend.model.entity.User;
import br.com.zaimu.backend.model.exception.ZaimuGenericRepositoryException;
import br.com.zaimu.backend.model.to.UserView;
import br.com.zaimu.backend.repository.hibernate.UserRepository;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@Repository
public class UserRepositoryImpl implements UserRepository {

    private static final Logger logger = LoggerFactory.getLogger(UserRepositoryImpl.class);
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

    public Long create (User user) throws ZaimuGenericRepositoryException {
        try (Session session = getSession()) {
            String query = """
                        INSERT INTO zadm.user (
                            CD_COGNITO_SUB, DS_EMAIL, NM_GIVEN_NAME, NM_FAMILY_NAME, CD_NICKNAME, DT_CREATED, FL_STATUS
                        ) VALUES (
                            ?, ?, ?, ?, ?, ?, 'A'
                        ) RETURNING ID_USER;
                    """;

            return session.doReturningWork(connection -> {
                try (PreparedStatement ps = connection.prepareStatement(query)) {
                    int parameterIndex = 1;

                    ps.setObject(parameterIndex++, user.getUuid());
                    ps.setString(parameterIndex++, user.getEmail());
                    ps.setString(parameterIndex++, user.getGivenName());
                    ps.setString(parameterIndex++, user.getFamilyName());
                    ps.setString(parameterIndex++, user.getNickname());
                    ps.setTimestamp(parameterIndex++, user.getCreateDate());

                    try (ResultSet rs = ps.executeQuery()) {
                        return rs.next()
                                ? rs.getLong(1)
                                : null;
                    }
                }
            });
        } catch (ZaimuGenericRepositoryException e) {
            logger.error("Error creating user: {}", user, e);
            return null;
        }
    }

    public UserView getUserByNicknameOrEmail (String credential) throws ZaimuGenericRepositoryException {
        try (Session session = getSession()) {
            String query = """
                        SELECT *
                        FROM zadm.user
                        WHERE CD_NICKNAME = ? OR DS_EMAIL = ?;
                    """;

            return session.doReturningWork(connection -> {
                try (PreparedStatement ps = connection.prepareStatement(query)) {
                    ps.setString(1, credential);
                    ps.setString(2, credential);

                    try (ResultSet rs = ps.executeQuery();) {
                        return rs.next()
                                ? new UserView(rs)
                                : null;
                    }
                }
            });
        } catch (ZaimuGenericRepositoryException e) {
            logger.error("Error ao obter o id: {}", credential, e);
            return null;
        }
    }

    public Long getIdByNicknameOrEmail (String credential) throws ZaimuGenericRepositoryException {
        try (Session session = getSession()) {
            String query = """
                        SELECT ID_USER
                        FROM zadm.user
                        WHERE CD_NICKNAME = ? OR DS_EMAIL = ?;
                    """;

            return session.doReturningWork(connection -> {
                try (PreparedStatement ps = connection.prepareStatement(query)) {
                    ps.setString(1, credential);
                    ps.setString(2, credential);

                    try (ResultSet rs = ps.executeQuery();) {
                        return rs.next()
                                ? rs.getLong(1)
                                : null;
                    }
                }
            });
        } catch (ZaimuGenericRepositoryException e) {
            logger.error("Error ao obter o id: {}", credential, e);
            return null;
        }
    }
}
