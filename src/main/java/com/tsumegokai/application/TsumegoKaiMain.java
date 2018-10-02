package com.tsumegokai.application;

import com.tsumegokai.api.impl.AuthResourceImpl;
import com.tsumegokai.api.impl.RecordResourceImpl;
import com.tsumegokai.api.impl.UserResourceImpl;
import com.tsumegokai.application.auth.ApplicationAuthFilter;
import com.tsumegokai.application.auth.ApplicationAuthenticator;
import com.tsumegokai.application.auth.UserPrincipal;
import com.tsumegokai.application.startup.StartupTask;
import com.tsumegokai.application.startup.UpdateDatabaseSchemaTask;
import com.tsumegokai.application.startup.UserSeedTask;
import com.tsumegokai.exception.ServerExceptionMapper;
import com.tsumegokai.push.PushService;
import com.tsumegokai.push.impl.PushResource;
import io.dropwizard.Application;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.auth.AuthDynamicFeature;
import io.dropwizard.auth.AuthValueFactoryProvider;
import io.dropwizard.jdbi3.JdbiFactory;
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
import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.sqlobject.SqlObjectPlugin;
import org.glassfish.hk2.api.ServiceLocator;
import org.glassfish.hk2.utilities.ServiceLocatorUtilities;
import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.sqlobject.SqlObjectPlugin;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.websocket.CloseReason;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class TsumegoKaiMain extends Application<TsumegoKaiConfiguration> {
    private static final Logger log = LoggerFactory.getLogger(TsumegoKaiMain.class);

    private static PushService pushService;
    private final List<StartupTask> startupTasks = new ArrayList<>();

    public static void main(String[] args) throws Exception {
        new TsumegoKaiMain().run(args);
    }

    @Override
    public void initialize(Bootstrap<TsumegoKaiConfiguration> bootstrap) {
        pushService = new PushResource();

        bootstrap.addBundle(new AssetsBundle("/static", "/static", "index.html"));
        bootstrap.addBundle(new WebsocketBundle(WebsocketService.class));

        startupTasks.add(new UpdateDatabaseSchemaTask());
        startupTasks.add(new UserSeedTask());
    }

    @Override
    public void run(TsumegoKaiConfiguration configuration, Environment environment) throws Exception {
        Jdbi jdbi = new JdbiFactory().build(environment, configuration.getDataSourceFactory(), "postgresql");
        jdbi.installPlugin(new SqlObjectPlugin());
        ApplicationAuthenticator authenticator = new ApplicationAuthenticator(jdbi);
        ApplicationBinder binder = new ApplicationBinder(
                configuration,
                environment,
                pushService,
                jdbi
        );
        ServiceLocator serviceLocator = ServiceLocatorUtilities.bind(binder);
        environment.jersey().register(binder);

        for (StartupTask task : startupTasks) {
            log.info("Running startup task: " + task.getName());
            task.run(configuration, serviceLocator);
        }

        environment.jersey().register(new ServerExceptionMapper());

        environment.jersey().register(new AuthResourceImpl());
        environment.jersey().register(new RecordResourceImpl());
        environment.jersey().register(new UserResourceImpl());

        ApplicationAuthFilter applicationAuthFilter =
                new ApplicationAuthFilter(authenticator);
        environment.jersey().register(new AuthDynamicFeature(applicationAuthFilter));
        environment.jersey().register(new AuthValueFactoryProvider.Binder<>(UserPrincipal.class));
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

