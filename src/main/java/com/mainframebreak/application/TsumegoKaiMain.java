package com.mainframebreak.application;

import com.mainframebreak.api.impl.RecordResourceImpl;
import com.mainframebreak.exception.ServerExceptionMapper;
import com.mainframebreak.push.PushService;
import com.mainframebreak.push.impl.PushResource;
import io.dropwizard.Application;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.jdbi.DBIFactory;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import io.dropwizard.websockets.WebsocketBundle;
import org.skife.jdbi.v2.DBI;

import javax.websocket.CloseReason;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

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

        final DBIFactory factory = new DBIFactory();
        final DBI jdbi = factory.build(environment, configuration.getDataSourceFactory(), "postgresql");

        environment.jersey().register(new ServerExceptionMapper());
        environment.jersey().register(new ApplicationBinder(
                configuration,
                environment,
                pushService));
        environment.jersey().register(RecordResourceImpl.class);
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

