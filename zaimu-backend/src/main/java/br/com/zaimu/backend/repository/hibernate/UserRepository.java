package br.com.zaimu.backend.repository.hibernate;

import br.com.zaimu.backend.model.entity.User;
import br.com.zaimu.backend.model.to.UserView;

public interface UserRepository {

    Long create(User user);

    UserView getUserByNicknameOrEmail (String credential);

    Long getIdByNicknameOrEmail (String credential);
}
