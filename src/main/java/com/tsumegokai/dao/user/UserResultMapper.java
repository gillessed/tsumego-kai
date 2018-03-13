package com.tsumegokai.dao.user;

import com.tsumegokai.api.User;
import com.tsumegokai.utils.SqlUtils;
import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class UserResultMapper implements ResultSetMapper<User> {
    @Override
    public User map(int index, ResultSet r, StatementContext ctx) throws SQLException {
        User.Builder builder = new User.Builder()
                .id(r.getInt("id"))
                .login(r.getString("login"))
                .firstName(r.getString("first_name"))
                .lastName(r.getString("last_name"))
                .rank(r.getInt("rank"))
                .email(r.getString("email"));
        if (SqlUtils.resultSetHas(r, "password")) {
            builder.password(r.getString("password"));
        }
        List<Integer> roles = new ArrayList<>();
        do {
            roles.add(r.getInt("role"));
        } while(r.next());
        return builder
                .addAllRoles(roles)
                .build();
    }
}