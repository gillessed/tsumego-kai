package com.tsumegokai.application.auth;

import com.tsumegokai.api.Token;
import com.tsumegokai.api.User;
import com.tsumegokai.dao.user.UserDao;
import io.dropwizard.auth.Authenticator;
import org.skife.jdbi.v2.DBI;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Optional;

public class ApplicationAuthenticator implements Authenticator<String, UserPrincipal> {
    private static final Logger log = LoggerFactory.getLogger(ApplicationAuthenticator.class);

    private final DBI dbi;

    public ApplicationAuthenticator(DBI dbi) {
        this.dbi = dbi;
    }

    @Override
    public Optional<UserPrincipal> authenticate(String value) {
        try (UserDao dao = dbi.open(UserDao.class)) {
            Token token = dao.getToken(value);
            if (token == null) {
                return Optional.empty();
            }
            User user = dao.getUser(token.getUserId());
            UserPrincipal principal = new UserPrincipal(value, user);
            return Optional.of(principal);
        } catch (Error e) {
            log.warn("Error verifying auth token", e);
            return Optional.empty();
        }
    }
}
