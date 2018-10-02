package com.tsumegokai.dao.user;

import com.tsumegokai.api.Token;
import org.jdbi.v3.core.mapper.RowMapper;
import org.jdbi.v3.core.statement.StatementContext;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TokenResultMapper implements RowMapper<Token> {
    @Override
    public Token map(ResultSet rs, StatementContext ctx) throws SQLException {
        return new Token.Builder()
                .value(rs.getString("value"))
                .userId(rs.getInt("user"))
                .timestamp(rs.getTime("timestamp").toString())
                .build();
    }
}