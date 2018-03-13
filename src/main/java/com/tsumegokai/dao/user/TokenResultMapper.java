package com.tsumegokai.dao.user;

import com.tsumegokai.api.Token;
import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TokenResultMapper implements ResultSetMapper<Token> {
    @Override
    public Token map(int index, ResultSet r, StatementContext ctx) throws SQLException {
        return new Token.Builder()
                .value(r.getString("value"))
                .userId(r.getInt("user"))
                .timestamp(r.getTime("timestamp").toString())
                .build();
    }
}