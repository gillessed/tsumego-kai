package com.tsumegokai.api.impl;

import com.tsumegokai.api.Token;
import com.tsumegokai.api.User;
import com.tsumegokai.api.requests.CreateUserRequest;
import com.tsumegokai.api.requests.LoginRequest;
import com.tsumegokai.api.requests.VerifyRequest;
import com.tsumegokai.api.resources.AuthResource;
import com.tsumegokai.dao.user.UserDao;
import com.tsumegokai.exception.ErrorType;
import com.tsumegokai.exception.ServerException;
import com.tsumegokai.hash.HashService;
import com.tsumegokai.utils.RandomString;
import org.jdbi.v3.core.Handle;
import org.jdbi.v3.core.Jdbi;

import javax.inject.Inject;

public class AuthResourceImpl implements AuthResource {
    private static final int SESSION_TOKEN_LENGTH = 48;

    @Inject
    private Jdbi dbi;

    @Inject
    private HashService hashService;

    @Override
    public Token login(LoginRequest loginRequest) {
        try (Handle handle = dbi.open()) {
            UserDao dao = handle.attach(UserDao.class);
            User user = dao.getFullUser(loginRequest.getUsername());
            String hashedPassword = hashService.hash(loginRequest.getPassword());
            if (user == null || !hashedPassword.equals(user.getPassword())) {
                throw new ServerException(ErrorType.LOGIN_ERROR, "Invalid username or password");
            }
            String token = RandomString.create(SESSION_TOKEN_LENGTH);
            dao.createToken(user.getId(), token);
            return dao.getToken(token);
        } catch (Exception e) {
            throw new ServerException(ErrorType.SERVER_ERROR, e.getMessage());
        }
    }

    @Override
    public User createUser(CreateUserRequest request) {
        try (Handle handle = dbi.open()) {
            UserDao dao = handle.attach(UserDao.class);
            int userId = dao.createUser(
                    request.getLogin(),
                    hashService.hash(request.getPassword()),
                    request.getFirstName(),
                    request.getLastName(),
                    request.getPassword()
            );
            // TODO: create default collection for user
            return dao.getUser(userId);
        } catch (Exception e) {
            throw new ServerException(ErrorType.SERVER_ERROR, e.getMessage());
        }
    }

    @Override
    public void createVerificationCode(VerifyRequest request) {
        // TODO: implement verification
    }
}
