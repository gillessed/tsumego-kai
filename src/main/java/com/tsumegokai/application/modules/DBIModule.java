package com.tsumegokai.application.modules;

import com.google.inject.Binder;
import com.google.inject.Module;
import com.google.inject.Provides;
import com.tsumegokai.application.TsumegoKaiConfiguration;
import com.tsumegokai.dao.Dao;
import io.dropwizard.jdbi.DBIFactory;
import io.dropwizard.setup.Environment;
import org.skife.jdbi.v2.DBI;

public class DBIModule implements Module {

    @Override
    public void configure(Binder binder) {
    }

    @Provides
    public DBI getDBI(Environment environment, TsumegoKaiConfiguration configuration) {
        final DBIFactory factory = new DBIFactory();
        return factory.build(environment, configuration.getDataSourceFactory(), "postgresql");
    }

    @Provides
    public Dao getDao(DBI dbi) {
        return dbi.open(Dao.class);
    }
}
