package com.tsumegokai.database;

import liquibase.Contexts;
import liquibase.LabelExpression;
import liquibase.Liquibase;
import liquibase.database.Database;
import liquibase.database.DatabaseFactory;
import liquibase.database.jvm.JdbcConnection;
import liquibase.exception.LiquibaseException;
import liquibase.resource.FileSystemResourceAccessor;
import org.junit.BeforeClass;
import org.postgresql.ds.PGSimpleDataSource;
import org.skife.jdbi.v2.DBI;

import java.sql.Connection;
import java.sql.SQLException;

public class DatabaseTest {
    protected static DBI dbi;

    @BeforeClass
    public static void createDbi() {
        PGSimpleDataSource datasource = new PGSimpleDataSource();
        datasource.setServerName("localhost");
        datasource.setPortNumber(5444);
        datasource.setUser("gillessed");
        datasource.setPassword("admin");
        datasource.setDatabaseName("tsumego_kai");
        dbi = new DBI(datasource);

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
}
