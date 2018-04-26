package com.tsumegokai.application.auth;

import com.tsumegokai.exception.ErrorType;
import com.tsumegokai.exception.ServerException;
import io.dropwizard.auth.AuthFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Priority;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;

@Priority(Priorities.AUTHENTICATION)
public class ApplicationAuthFilter extends AuthFilter<String, UserPrincipal> {
    private static final Logger log = LoggerFactory.getLogger(ApplicationAuthenticator.class);
    private static final String TOKEN = "TOKEN";

    public ApplicationAuthFilter(ApplicationAuthenticator applicationAuthenticator) {
        this.authenticator = applicationAuthenticator;
    }

    @Override
    public void filter(ContainerRequestContext requestContext) {
        String token = requestContext.getHeaders().getFirst(TOKEN);
        if (token == null) {
            throw new ServerException(ErrorType.AUTHENTICATION_ERROR, "No token");
        }


        if (!authenticate(requestContext, token, "TSUMEGO_KAI_AUTH")) {
            throw new ServerException(ErrorType.AUTHENTICATION_ERROR,
                    "Invalid session. Please log in again.");
        }
    }
}
