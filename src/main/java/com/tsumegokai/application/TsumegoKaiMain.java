package com.tsumegokai.application;

import com.hubspot.dropwizard.guice.GuiceBundle;
import com.tsumegokai.application.modules.ApplicationModule;
import com.tsumegokai.application.modules.DBIModule;
import com.tsumegokai.exception.ServerExceptionMapper;
import com.tsumegokai.push.PushService;
import com.tsumegokai.push.impl.PushResource;
import io.dropwizard.Application;
import io.dropwizard.assets.AssetsBundle;
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
    private GuiceBundle<TsumegoKaiConfiguration> guiceBundle;

    public static void main(String[] args) throws Exception {
        new TsumegoKaiMain().run(args);
    }

    @Override
    public void initialize(Bootstrap<TsumegoKaiConfiguration> bootstrap) {
        pushService = new PushResource();

        guiceBundle = GuiceBundle.<TsumegoKaiConfiguration>newBuilder()
                .addModule(new ApplicationModule())
                .addModule(new DBIModule())
                .setConfigClass(TsumegoKaiConfiguration.class)
                .build();

        bootstrap.addBundle(guiceBundle);
        bootstrap.addBundle(new AssetsBundle("/static", "/static", "index.html"));
        bootstrap.addBundle(new WebsocketBundle(WebsocketService.class));
    }

    @Override
    public void run(TsumegoKaiConfiguration configuration, Environment environment) throws Exception {
        final DBI dbi = guiceBundle.getInjector().getProvider(DBI.class).get();
        updateDatabaseSchema(dbi, configuration.getLiquibase());

        environment.jersey().register(new ServerExceptionMapper());
    }

    private void updateDatabaseSchema(DBI dbi, String liquibaseFile) {
        try (Connection connection = dbi.open().getConnection()) {
            JdbcConnection jdbcConnection = new JdbcConnection(connection);
            Database database = DatabaseFactory.getInstance().findCorrectDatabaseImplementation(jdbcConnection);
            Liquibase liquibase = new Liquibase(liquibaseFile, new FileSystemResourceAccessor(), database);
            liquibase.update(new Contexts(), new LabelExpression());
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

