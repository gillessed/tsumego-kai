package com.tsumegokai.api.impl;

import com.tsumegokai.api.Token;
import com.tsumegokai.api.User;
import com.tsumegokai.api.requests.LoginRequest;
import com.tsumegokai.api.resources.AuthResource;
import com.tsumegokai.dao.user.UserDao;
import com.tsumegokai.exception.ErrorType;
import com.tsumegokai.exception.ServerException;
import com.tsumegokai.utils.RandomString;
import org.skife.jdbi.v2.DBI;

import javax.inject.Inject;

public class AuthResourceImpl implements AuthResource {
    private static final int SESSION_TOKEN_LENGTH = 48;

    @Inject
    private DBI dbi;

    @Override
    public Token login(LoginRequest loginRequest) {
        try (UserDao dao = dbi.open(UserDao.class)) {
            User user = dao.getFullUser(loginRequest.getUsername());
            if (user == null || !loginRequest.getPassword().equals(user.getPassword())) {
                throw new ServerException(ErrorType.LOGIN_ERROR, "Invalid username or password");
            }
            String token = RandomString.create(SESSION_TOKEN_LENGTH);
            dao.createToken(user.getId(), token);
            return dao.getToken(token);
        } catch (Exception e) {
            throw new ServerException(ErrorType.SERVER_ERROR, e.getMessage());
        }
    }
}
