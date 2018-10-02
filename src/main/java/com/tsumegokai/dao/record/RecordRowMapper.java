package com.tsumegokai.dao.record;

import com.tsumegokai.api.Record;
import org.jdbi.v3.core.mapper.RowMapper;
import org.jdbi.v3.core.statement.StatementContext;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RecordRowMapper implements RowMapper<Record> {

    @Override
    public Record map(ResultSet rs, StatementContext ctx) throws SQLException {
        Record.Builder builder = new Record.Builder()
                .id(rs.getInt("id"))
                .author(rs.getInt("user"))
                .collection(rs.getInt("collection"))
                .type(rs.getInt("type"))
                .data(rs.getString("serialized_record"))
                .version(rs.getInt("version"))
                .versionCount(rs.getInt("latest_version"))
                .dateUpdated(Long.toString(rs.getTimestamp("date_updated").getTime()));

        Integer rank = rs.getInt("rank");
        if (!rs.wasNull()) {
            builder.rank(rank);
        }

        String playerWhite = rs.getString("player_white");
        if (!rs.wasNull()) {
            builder.playerWhite(playerWhite);
        }

        String playerBlack = rs.getString("player_black");
        if (!rs.wasNull()) {
            builder.playerBlack(playerBlack);
        }

        return builder.build();
    }
}
