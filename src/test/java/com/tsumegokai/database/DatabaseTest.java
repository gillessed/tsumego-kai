package com.tsumegokai.database;

import com.tsumegokai.api.Collection;
import com.tsumegokai.api.Record;
import com.tsumegokai.api.Tag;
import com.tsumegokai.api.User;
import com.tsumegokai.dao.collection.CollectionDao;
import com.tsumegokai.dao.record.RecordDao;
import com.tsumegokai.dao.tag.TagDao;
import com.tsumegokai.dao.user.UserDao;
import liquibase.Contexts;
import liquibase.LabelExpression;
import liquibase.Liquibase;
import liquibase.database.Database;
import liquibase.database.DatabaseFactory;
import liquibase.database.jvm.JdbcConnection;
import liquibase.exception.LiquibaseException;
import liquibase.resource.FileSystemResourceAccessor;
import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.sqlobject.SqlObjectPlugin;
import org.junit.BeforeClass;
import org.postgresql.ds.PGSimpleDataSource;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Random;

public class DatabaseTest {
    protected final Random random = new Random();
    protected static Jdbi dbi;

    @BeforeClass
    public static void createDbi() {
        PGSimpleDataSource datasource = new PGSimpleDataSource();
        datasource.setServerName("localhost");
        datasource.setPortNumber(5444);
        datasource.setUser("gillessed");
        datasource.setPassword("admin");
        datasource.setDatabaseName("tsumego_kai");
        dbi = Jdbi.create(datasource);
        dbi.installPlugin(new SqlObjectPlugin());

        String liquibaseFile = "conf/liquibase/changelog.yml";

        try (Connection connection = dbi.open().getConnection()) {
            JdbcConnection jdbcConnection = new JdbcConnection(connection);
            Database database = DatabaseFactory.getInstance().findCorrectDatabaseImplementation(jdbcConnection);
            Liquibase liquibase = new Liquibase(liquibaseFile, new FileSystemResourceAccessor(), database);
            liquibase.update(new Contexts(), new LabelExpression());
        } catch (SQLException | LiquibaseException e) {
            throw new IllegalStateException(e);
        }
    }

    User createRandomUserDetails() {
        return new User.Builder()
                .id(random.nextInt())
                .firstName(Long.toString(random.nextLong()))
                .lastName(Long.toString(random.nextLong()))
                .email(Long.toString(random.nextLong()))
                .login(Long.toString(random.nextLong()))
                .password(Long.toString(random.nextLong()))
                .rank(random.nextInt(20))
                .build();
    }

    User createRandomUser(UserDao dao) {
        User newUser = createRandomUserDetails();
        int id = dao.createUser(
                newUser.getLogin(),
                newUser.getPassword(),
                newUser.getFirstName(),
                newUser.getLastName(),
                newUser.getEmail());
        return new User.Builder()
                .from(newUser)
                .id(id)
                .build();
    }

    Collection createRandomCollectionDetails(int userId, boolean isDefaultCollection) {
        return new Collection.Builder()
                .name(Long.toString(random.nextLong()))
                .isPublic(random.nextBoolean())
                .isDefaultCollection(isDefaultCollection)
                .id(random.nextInt())
                .user(userId)
                .build();
    }

    Collection createRandomCollection(CollectionDao dao, int userId, boolean isDefaultCollection) {
        Collection collection = createRandomCollectionDetails(userId, isDefaultCollection);
        int id = dao.createCollection(
                collection.getName(),
                collection.isDefaultCollection(),
                collection.isPublic(),
                collection.getUser()
        );
        return new Collection.Builder()
                .from(collection)
                .id(id)
                .build();
    }

    Tag createRandomTagDetails(String name) {
        return new Tag.Builder()
                .id(random.nextInt())
                .name(name)
                .build();
    }

    Tag createRandomTag(TagDao dao) {
        return createRandomTag(dao, Long.toString(random.nextLong()));
    }

    Tag createRandomTag(TagDao dao, String name) {
        Tag tag = createRandomTagDetails(name);
        int id = dao.createTag(name);
        return new Tag.Builder()
                .from(tag)
                .id(id)
                .build();
    }

    Record createRandomRecordDetails(int userId, int collectionId, List<Integer> tags) {
        return new Record.Builder()
                .id(random.nextInt())
                .type(random.nextInt(1) + 1)
                .collection(collectionId)
                .author(userId)
                .version(1)
                .versionCount(1)
                .data(Long.toString(random.nextLong()))
                .dateUpdated(Long.toString(random.nextLong()))
                .rank(35)
                .addAllTags(tags)
                .build();
    }

    Record createRandomRecord(RecordDao recordDao, int userId, int collectionId, List<Integer> tags) {
        Record record = createRandomRecordDetails(userId, collectionId, tags);
        int id = recordDao.createNewRecord(
                record.getData(),
                record.getTags(),
                record.getAuthor(),
                record.getCollection(),
                record.getType(),
                record.getRank(),
                record.getPlayerWhite(),
                record.getPlayerBlack()
        );
        return new Record.Builder()
                .from(record)
                .id(id)
                .build();
    }
}
