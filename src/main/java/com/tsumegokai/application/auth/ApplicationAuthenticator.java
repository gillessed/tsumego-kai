package com.tsumegokai.application.auth;

import io.dropwizard.auth.AuthenticationException;
import io.dropwizard.auth.Authenticator;
import org.skife.jdbi.v2.DBI;

import javax.inject.Inject;
import java.util.Optional;

public class ApplicationAuthenticator implements Authenticator<String, UserPrincipal> {

    @Inject
    private DBI dbi;

    @Override
    public Optional<UserPrincipal> authenticate(String credentials) throws AuthenticationException {

        return null;
    }
}
