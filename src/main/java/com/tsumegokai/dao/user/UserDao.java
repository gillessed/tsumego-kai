package com.tsumegokai.dao.user;

import com.tsumegokai.api.Token;
import com.tsumegokai.api.User;
import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.GetGeneratedKeys;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import java.util.Optional;

@RegisterMapper({
        UserResultMapper.class
})
public interface UserDao {
    @SqlQuery("SELECT * FROM users WHERE id = :id LEFT JOIN roles ON roles.user = users.id")
    Optional<User> getUser(@Bind("id") int id);

    @GetGeneratedKeys
    @SqlUpdate("INSERT INTO users (login, first_name, last_name, rank) " +
            "VALUES(:login, :firstName, :lastName, -1)")
    int createUser(
            @Bind("login") String login,
            @Bind("firstName") String firstName,
            @Bind("lastName") String lastName
    );

    @SqlUpdate("INSERT INTO roles VALUES(user = :user, role = :role)")
    void addUserRole(
            @Bind("user") int user,
            @Bind("role") int role
    );

    @SqlUpdate("DELETE * FROM roles WHERE user = :user AND role = :role)")
    void deleteUserRole(
            @Bind("user") int user,
            @Bind("role") int role
    );

    @SqlQuery("SELECT * FROM tokens WHERE value = :value")
    Optional<Token> getToken(@Bind("value") String value);

    void close();
}
