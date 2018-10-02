package com.tsumegokai.dao.record;

import com.tsumegokai.api.Record;
import org.jdbi.v3.sqlobject.config.RegisterRowMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;
import org.jdbi.v3.sqlobject.statement.UseRowReducer;
import org.jdbi.v3.sqlobject.transaction.Transaction;

import javax.annotation.Nullable;
import java.util.List;

@RegisterRowMapper(RecordRowMapper.class)
public interface RecordDao {
    int INITIAL_VERSION = 1;

    @UseRowReducer(RecordRowReducer.class)
    @SqlQuery("SELECT id, \"user\", collection, type, rank, player_white, player_black, serialized_record, " +
            "date_updated, tag, version, latest_version FROM records " +
            "LEFT JOIN record_tags ON records.id = record_tags.record " +
            "LEFT JOIN versions ON records.id = versions.record AND records.latest_version = versions.version " +
            "WHERE records.id = :id")
    Record getRecord(@Bind("id") int id);

    @Transaction
    default int createNewRecord(
            String data,
            List<Integer> tags,
            int userId,
            int collection,
            int type,
            @Nullable Integer rank,
            @Nullable String playerWhite,
            @Nullable String playerBlack) {
        int recordId = createRecord(userId, collection, type, rank, playerWhite, playerBlack, INITIAL_VERSION);
        for (Integer tag : tags) {
            tagRecord(recordId, tag);
        }
        createVersion(recordId, data, INITIAL_VERSION);
        return recordId;
    }

    // Helper Methods

    @GetGeneratedKeys
    @SqlUpdate("INSERT INTO records (\"user\", collection, type, rank, player_white, player_black, latest_version)" +
            " VALUES (:userId, :collection, :type, :rank, :playerWhite, :playerBlack, :latestVersion)")
    int createRecord(
            @Bind("userId") int userId,
            @Bind("collection") int collection,
            @Bind("type") int type,
            @Bind("rank") @Nullable Integer rank,
            @Bind("playerWhite") @Nullable String playerWhite,
            @Bind("playerBlack") @Nullable String playerBlack,
            @Bind("latestVersion") int latestVersion);

    @SqlUpdate("INSERT INTO record_tags (record, tag) VALUES (:record, :tag)")
    void tagRecord(
            @Bind("record") int recordId,
            @Bind("tag") int tagId);

    @SqlUpdate("INSERT INTO versions (record, serialized_record, version) " +
            "VALUES (:record, :data, :version)")
    void createVersion(@Bind("record") int record, @Bind("data") String data, @Bind("version") int version);

    default void close() {};
}
