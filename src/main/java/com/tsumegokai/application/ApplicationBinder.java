package com.tsumegokai.application;

import com.tsumegokai.hash.HashService;
import com.tsumegokai.hash.HashServiceImpl;
import com.tsumegokai.push.PushService;
import io.dropwizard.Configuration;
import io.dropwizard.setup.Environment;
import org.glassfish.hk2.utilities.binding.AbstractBinder;
import org.skife.jdbi.v2.DBI;

public class ApplicationBinder extends AbstractBinder {
    private final TsumegoKaiConfiguration config;
    private final Environment environment;
    private final PushService pushService;
    private final DBI dbi;
    private final HashService hashService;

    public ApplicationBinder(
            TsumegoKaiConfiguration config,
            Environment environment,
            PushService pushService,
            DBI dbi
    ) {
        this.config = config;
        this.environment = environment;
        this.pushService = pushService;
        this.dbi = dbi;
        this.hashService = new HashServiceImpl();
    }

    @Override
    protected void configure() {
        bind(this.config).to(Configuration.class);
        bind(this.environment).to(Environment.class);
        bind(this.pushService).to(PushService.class);
        bind(this.dbi).to(DBI.class);
        bind(this.hashService).to(HashService.class);
    }
}
