package com.tsumegokai.dao.user;

import com.tsumegokai.api.User;
import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class UserResultMapper implements ResultSetMapper<Optional<User>> {
    @Override
    public Optional<User> map(int index, ResultSet r, StatementContext ctx) throws SQLException {
        if (!r.first()) {
            return Optional.empty();
        }
        List<Integer> roles = new ArrayList<>();
        while(r.next()) {
            roles.add(r.getInt("roles.role"));
        }
        return Optional.of(new User.Builder()
                .id(r.getInt("users.id"))
                .login(r.getString("login"))
                .firstName(r.getString("first_name"))
                .lastName(r.getString("last_name"))
                .rank(r.getInt("rank"))
                .addAllRoles(roles)
                .build()
        );
    }
}