package com.tsumegokai.dao.collection;

import com.tsumegokai.api.Collection;
import org.jdbi.v3.sqlobject.config.RegisterRowMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;
import org.jdbi.v3.sqlobject.statement.UseRowReducer;

import java.util.List;

@RegisterRowMapper(CollectionRowMapper.class)
public interface CollectionDao {
    @UseRowReducer(CollectionRowReducer.class)
    @SqlQuery("SELECT collections.id as c_id, name, default_collection, public, collections.\"user\" as c_user, records.id as r_id, collection_tags.tag as t_id FROM collections " +
            "LEFT JOIN records ON collections.id = records.collection " +
            "LEFT JOIN collection_tags ON collections.id = collection_tags.collection WHERE collections.\"user\"=:userId")
    List<Collection> getCollectionsForUser(@Bind("userId") int userId);

    @UseRowReducer(CollectionRowReducer.class)
    @SqlQuery("SELECT collections.id as c_id, name, default_collection, public, collections.\"user\" as c_user, records.id as r_id, collection_tags.tag as t_id FROM collections " +
            "LEFT JOIN records ON collections.id = records.collection " +
            "LEFT JOIN collection_tags ON collections.id = collection_tags.collection WHERE collections.id=:id")
    Collection getCollection(@Bind("id") int id);

    @GetGeneratedKeys
    @SqlUpdate("INSERT INTO collections (name, default_collection, public, \"user\") " +
            "VALUES(:name, :defaultCollection, :public, :userId)")
    int createCollection(
            @Bind("name") String name,
            @Bind("defaultCollection") boolean defaultCollection,
            @Bind("public") boolean publik,
            @Bind("userId") int userId);

    @SqlUpdate("INSERT INTO collection_tags (collection, tag) VALUES (:collection, :tag)")
    void tagCollection(
            @Bind("collection") int collectionId,
            @Bind("tag") int tagId
    );

    default void close() {}
}
