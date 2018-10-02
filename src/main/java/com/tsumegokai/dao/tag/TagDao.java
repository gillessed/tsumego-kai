package com.tsumegokai.dao.tag;

import com.tsumegokai.api.Tag;
import org.jdbi.v3.sqlobject.config.RegisterRowMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

import java.util.List;

@RegisterRowMapper(TagRowMapper.class)
public interface TagDao {

    @GetGeneratedKeys
    @SqlUpdate("INSERT INTO tags (name) VALUES (:name)")
    int createTag(@Bind("name") String name);

    @SqlQuery("SELECT id, name FROM tags WHERE id=:id")
    Tag getTag(@Bind("id") int id);

    @SqlQuery("SELECT id, name FROM tags WHERE name ~ :name")
    List<Tag> searchTags(@Bind("name") String name);

    default void close() {}
}
