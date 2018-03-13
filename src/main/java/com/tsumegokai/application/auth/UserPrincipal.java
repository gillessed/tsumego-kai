package com.tsumegokai.application.auth;

import com.tsumegokai.api.User;

import java.security.Principal;

public class UserPrincipal implements Principal {

    private final String token;
    private final User user;

    public UserPrincipal(
            String token,
            User user
    ) {
        this.token = token;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public User getUser() {
        return user;
    }

    @Override
    public String getName() {
        return user.getLogin();
    }
}
