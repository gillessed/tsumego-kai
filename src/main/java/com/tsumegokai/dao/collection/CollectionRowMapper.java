package com.tsumegokai.dao.collection;

import com.tsumegokai.api.Collection;
import org.jdbi.v3.core.mapper.RowMapper;
import org.jdbi.v3.core.statement.StatementContext;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CollectionRowMapper implements RowMapper<Collection> {

    @Override
    public Collection map(ResultSet rs, StatementContext ctx) throws SQLException {
        return new Collection.Builder()
                .id(rs.getInt(  "c_id"))
                .name(rs.getString("name"))
                .isDefaultCollection(rs.getBoolean("default_collection"))
                .isPublic(rs.getBoolean("public"))
                .user(rs.getInt("c_user"))
                .build();
    }
}
