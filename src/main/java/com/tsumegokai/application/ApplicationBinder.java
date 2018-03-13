package com.tsumegokai.application;

import com.tsumegokai.application.auth.ApplicationAuthenticator;
import com.tsumegokai.push.PushService;
import io.dropwizard.Configuration;
import io.dropwizard.setup.Environment;
import org.glassfish.hk2.utilities.binding.AbstractBinder;
import org.skife.jdbi.v2.DBI;

public class ApplicationBinder extends AbstractBinder {
    private final ApplicationAuthenticator authenticator;
    private final TsumegoKaiConfiguration config;
    private final Environment environment;
    private final PushService pushService;
    private final DBI dbi;

    public ApplicationBinder(
            ApplicationAuthenticator authenticator,
            TsumegoKaiConfiguration config,
            Environment environment,
            PushService pushService,
            DBI dbi
    ) {
        this.authenticator = authenticator;
        this.config = config;
        this.environment = environment;
        this.pushService = pushService;
        this.dbi = dbi;
    }

    @Override
    protected void configure() {
        bind(this.authenticator);
        bind(this.config).to(Configuration.class);
        bind(this.environment).to(Environment.class);
        bind(this.pushService).to(PushService.class);
        bind(this.dbi).to(DBI.class);
    }
}
