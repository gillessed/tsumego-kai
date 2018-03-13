package com.tsumegokai.application.auth;

import com.tsumegokai.exception.ErrorType;
import com.tsumegokai.exception.ServerException;
import io.dropwizard.auth.AuthFilter;
import io.dropwizard.auth.AuthenticationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Priority;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import java.io.IOException;
import java.util.Optional;

@Priority(Priorities.AUTHENTICATION)
public class ApplicationAuthFilter extends AuthFilter<String, UserPrincipal> {
    private static final Logger log = LoggerFactory.getLogger(ApplicationAuthenticator.class);
    private static final String TOKEN = "TOKEN";

    private final ApplicationAuthenticator applicationAuthenticator;

    public ApplicationAuthFilter(ApplicationAuthenticator applicationAuthenticator) {
        this.applicationAuthenticator = applicationAuthenticator;
    }

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        String token = requestContext.getHeaders().getFirst(TOKEN);
        if (token == null) {
            throw new ServerException(ErrorType.AUTHENTICATION_ERROR, "No token");
        }
        try {
            Optional<UserPrincipal> principal = applicationAuthenticator.authenticate(token);
            if (!principal.isPresent()) {
                throw new ServerException(ErrorType.AUTHENTICATION_ERROR,
                        "Invalid session. Please log in again.");
            }
        } catch (AuthenticationException e) {
            log.warn("Error attempting to authenticate user.", e);
            throw new ServerException(ErrorType.AUTHENTICATION_ERROR, "Server error");
        }
    }
}
