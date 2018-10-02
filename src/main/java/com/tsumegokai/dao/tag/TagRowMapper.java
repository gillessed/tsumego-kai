package com.tsumegokai.dao.tag;

import com.tsumegokai.api.Tag;
import org.jdbi.v3.core.mapper.RowMapper;
import org.jdbi.v3.core.statement.StatementContext;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TagRowMapper implements RowMapper<Tag> {

    @Override
    public Tag map(ResultSet rs, StatementContext ctx) throws SQLException {
        return new Tag.Builder()
                .id(rs.getInt(  "id"))
                .name(rs.getString("name"))
                .build();
    }
}
