package com.tsumegokai.application;

import com.tsumegokai.api.impl.AuthResourceImpl;
import com.tsumegokai.api.impl.RecordResourceImpl;
import com.tsumegokai.api.impl.UserResourceImpl;
import com.tsumegokai.application.auth.ApplicationAuthFilter;
import com.tsumegokai.application.auth.ApplicationAuthenticator;
import com.tsumegokai.application.auth.UserPrincipal;
import com.tsumegokai.exception.ServerExceptionMapper;
import com.tsumegokai.push.PushService;
import com.tsumegokai.push.impl.PushResource;
import io.dropwizard.Application;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.auth.AuthDynamicFeature;
import io.dropwizard.auth.AuthValueFactoryProvider;
import io.dropwizard.jdbi.DBIFactory;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import io.dropwizard.websockets.WebsocketBundle;
import liquibase.Contexts;
import liquibase.LabelExpression;
import liquibase.Liquibase;
import liquibase.database.Database;
import liquibase.database.DatabaseFactory;
import liquibase.database.jvm.JdbcConnection;
import liquibase.exception.LiquibaseException;
import liquibase.resource.FileSystemResourceAccessor;
import org.skife.jdbi.v2.DBI;

import javax.websocket.CloseReason;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.sql.Connection;
import java.sql.SQLException;

public class TsumegoKaiMain extends Application<TsumegoKaiConfiguration> {
    private static PushService pushService;

    public static void main(String[] args) throws Exception {
        new TsumegoKaiMain().run(args);
    }

    @Override
    public void initialize(Bootstrap<TsumegoKaiConfiguration> bootstrap) {
        pushService = new PushResource();

        bootstrap.addBundle(new AssetsBundle("/static", "/static", "index.html"));
        bootstrap.addBundle(new WebsocketBundle(WebsocketService.class));
    }

    @Override
    public void run(TsumegoKaiConfiguration configuration, Environment environment) throws Exception {
        DBI dbi = new DBIFactory().build(environment, configuration.getDataSourceFactory(), "postgresql");
        ApplicationAuthenticator authenticator = new ApplicationAuthenticator(dbi);
        ApplicationBinder binder = new ApplicationBinder(
                configuration,
                environment,
                pushService,
                dbi
        );

        updateDatabaseSchema(dbi, configuration.getLiquibase());

        environment.jersey().register(binder);
        environment.jersey().register(new ServerExceptionMapper());

        environment.jersey().register(new AuthResourceImpl());
        environment.jersey().register(new RecordResourceImpl());
        environment.jersey().register(new UserResourceImpl());

        ApplicationAuthFilter applicationAuthFilter =
                new ApplicationAuthFilter(authenticator);
        environment.jersey().register(new AuthDynamicFeature(applicationAuthFilter));
        environment.jersey().register(new AuthValueFactoryProvider.Binder<>(UserPrincipal.class));
    }

    private void updateDatabaseSchema(DBI dbi, String liquibaseFile) {
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

    @ServerEndpoint("/push")
    public static class WebsocketService {
        @OnOpen
        public void onOpen(Session session) {
            pushService.onOpen(session);
        }

        @OnClose
        public void onClose(Session session, CloseReason closeReason) {
            pushService.onClose(session, closeReason);
        }

        @OnError
        public void onError(Session session, Throwable reason) {
            pushService.onError(session, reason);
        }

        @OnMessage
        public void onMessage(Session session, String message) {
            pushService.onMessage(session, message);
        }
    }

}

