package com.tsumegokai.application;

import com.tsumegokai.dao.Dao;
import com.tsumegokai.dao.impl.DaoImpl;
import com.tsumegokai.push.PushService;
import io.dropwizard.Configuration;
import io.dropwizard.setup.Environment;
import org.glassfish.hk2.utilities.binding.AbstractBinder;

public class ApplicationBinder extends AbstractBinder {
    private final TsumegoKaiConfiguration config;
    private final Environment environment;
    private final PushService pushService;
    private final Dao dao;

    public ApplicationBinder(
            TsumegoKaiConfiguration config,
            Environment environment,
            PushService pushService
    ) {
        this.config = config;
        this.environment = environment;
        this.pushService = pushService;
        this.dao = new DaoImpl(config);
    }

    @Override
    protected void configure() {
        bind(this.config).to(Configuration.class);
        bind(this.environment).to(Environment.class);
        bind(this.pushService).to(PushService.class);
        bind(this.dao).to(Dao.class);
    }
}
