package com.tsumegokai.application.auth;

import io.dropwizard.auth.AuthFilter;

import javax.annotation.Priority;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import java.io.IOException;

@Priority(Priorities.AUTHENTICATION)
public class ApplicationAuthFilter extends AuthFilter<String, UserPrincipal> {
    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {

    }
}
