package com.tsumegokai.dao.user;

import com.tsumegokai.api.User;
import com.tsumegokai.utils.SqlUtils;
import org.jdbi.v3.core.mapper.RowMapper;
import org.jdbi.v3.core.statement.StatementContext;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserResultMapper implements RowMapper<User> {
    @Override
    public User map(ResultSet rs, StatementContext ctx) throws SQLException {
        User.Builder builder = new User.Builder()
                .id(rs.getInt("id"))
                .login(rs.getString("login"))
                .firstName(rs.getString("first_name"))
                .lastName(rs.getString("last_name"))
                .rank(rs.getInt("rank"))
                .email(rs.getString("email"));
        if (SqlUtils.resultSetHas(rs, "password")) {
            builder.password(rs.getString("password"));
        }
        return builder.build();
    }
}