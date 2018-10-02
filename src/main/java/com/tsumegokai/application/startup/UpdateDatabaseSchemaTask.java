package com.tsumegokai.application.startup;

import com.tsumegokai.application.TsumegoKaiConfiguration;
import liquibase.Contexts;
import liquibase.LabelExpression;
import liquibase.Liquibase;
import liquibase.database.Database;
import liquibase.database.DatabaseFactory;
import liquibase.database.jvm.JdbcConnection;
import liquibase.exception.LiquibaseException;
import liquibase.resource.FileSystemResourceAccessor;
import org.glassfish.hk2.api.ServiceLocator;
import org.jdbi.v3.core.Jdbi;

import java.sql.Connection;
import java.sql.SQLException;

public class UpdateDatabaseSchemaTask implements StartupTask {
    @Override
    public void run(TsumegoKaiConfiguration configuration, ServiceLocator serviceLocator) {
        Jdbi dbi = serviceLocator.getService(Jdbi.class);
        String liquibaseFile = configuration.getLiquibase();
        try (Connection connection = dbi.open().getConnection()) {
            JdbcConnection jdbcConnection = new JdbcConnection(connection);
            Database database = DatabaseFactory.getInstance().findCorrectDatabaseImplementation(jdbcConnection);
            Liquibase liquibase = new Liquibase(liquibaseFile, new FileSystemResourceAccessor(), database);
            liquibase.update(new Contexts(), new LabelExpression());
            connection.setAutoCommit(true);
        } catch (SQLException | LiquibaseException e) {
            throw new IllegalStateException(e);
        }
    }

    @Override
    public String getName() {
        return "Update Database Schema";
    }
}
