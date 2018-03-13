package com.tsumegokai.dao.user;

import com.tsumegokai.api.Token;
import com.tsumegokai.api.User;
import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.GetGeneratedKeys;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import java.io.Closeable;

@RegisterMapper({
        UserResultMapper.class,
        TokenResultMapper.class,
})
public interface UserDao extends Closeable {
    @SqlQuery("SELECT id, login, first_name, last_name, rank, email, role FROM users " +
            "LEFT JOIN roles ON roles.user = users.id WHERE users.id = :id")
    User getUser(@Bind("id") int id);

    @SqlQuery("SELECT id, login, first_name, last_name, rank, email, role FROM users " +
            "LEFT JOIN roles ON roles.user = users.id WHERE users.login = :login")
    User getUser(@Bind("login") String login);

    @SqlQuery("SELECT * FROM users LEFT JOIN roles ON roles.user = users.id WHERE users.id = :id")
    User getFullUser(@Bind("id") int id);

    @SqlQuery("SELECT * FROM users LEFT JOIN roles ON roles.user = users.id WHERE users.login = :login")
    User getFullUser(@Bind("login") String login);

    @GetGeneratedKeys
    @SqlUpdate("INSERT INTO users (login, password, first_name, last_name, rank, email) " +
            "VALUES(:login, :password, :firstName, :lastName, -1, :email)")
    int createUser(
            @Bind("login") String login,
            @Bind("password") String password,
            @Bind("firstName") String firstName,
            @Bind("lastName") String lastName,
            @Bind("email") String email
    );

    @SqlUpdate("UPDATE users SET first_name = :firstName, last_name = :lastName, " +
            "rank = :rank, password = :password, email = :email WHERE id = :user")
    void updateUser(
            @Bind("user") int user,
            @Bind("password") String password,
            @Bind("firstName") String firstName,
            @Bind("lastName") String lastName,
            @Bind("rank") int rank,
            @Bind("email") String email
    );

    @SqlUpdate("INSERT INTO roles (\"user\", role) VALUES(:user, :role)")
    void addUserRole(
            @Bind("user") int user,
            @Bind("role") int role
    );

    @SqlUpdate("DELETE FROM roles WHERE \"user\" = :user AND role = :role")
    void deleteUserRole(
            @Bind("user") int user,
            @Bind("role") int role
    );

    @SqlQuery("SELECT * FROM tokens WHERE value = :value")
    Token getToken(@Bind("value") String value);

    @SqlUpdate("INSERT INTO tokens (\"user\", value) VALUES (:user, :value)")
    void createToken(
            @Bind("user") int user,
            @Bind("value") String value
    );

    @SqlUpdate("DELETE FROM tokens WHERE \"user\" = :user AND value = :value")
    void deleteToken(
            @Bind("user") int user,
            @Bind("value") String value
    );

    @Override
    void close();
}
