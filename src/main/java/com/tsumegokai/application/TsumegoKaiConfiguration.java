package com.tsumegokai.application;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.dropwizard.Configuration;
import io.dropwizard.db.DataSourceFactory;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

public class TsumegoKaiConfiguration extends Configuration {
    @Valid
    @NotNull
    @JsonProperty
    private DataSourceFactory database = new DataSourceFactory();

    public DataSourceFactory getDataSourceFactory() {
        return database;
    }

    @Valid
    @NotNull
    @JsonProperty
    private String liquibase;

    public String getLiquibase() {
        return liquibase;
    }

    @Valid
    @NotNull
    @JsonProperty
    private List<UserSeedConfiguration> userSeed;

    public List<UserSeedConfiguration> getUserSeeds() {
        return userSeed;
    }
}
