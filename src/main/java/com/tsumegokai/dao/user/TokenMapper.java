package com.tsumegokai.dao.user;

import com.tsumegokai.api.Token;
import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;

public class TokenMapper implements ResultSetMapper<Optional<Token>> {
    @Override
    public Optional<Token> map(int index, ResultSet r, StatementContext ctx) throws SQLException {
        if (!r.first()) {
            return Optional.empty();
        }
        return Optional.of(new Token.Builder()
                .value(r.getString("value"))
                .userId(r.getInt("user"))
                .timestamp(r.getTime("timestamp").toString())
                .build()
        );
    }
}