package com.tsumegokai.api.impl;

import com.tsumegokai.api.User;
import com.tsumegokai.api.resources.UserResource;
import com.tsumegokai.application.auth.UserPrincipal;
import com.tsumegokai.dao.user.UserDao;
import com.tsumegokai.exception.ErrorType;
import com.tsumegokai.exception.ServerException;
import org.jdbi.v3.core.Handle;
import org.jdbi.v3.core.Jdbi;

import javax.inject.Inject;

public class UserResourceImpl implements UserResource {

    @Inject
    private Jdbi dbi;

    @Override
    public User getSelf(UserPrincipal userPrincipal) {
        return userPrincipal.getUser();
    }

    @Override
    public User getUser(UserPrincipal userPrincipal, int userId) {
        User user;
        try (Handle handle = dbi.open()) {
            UserDao dao = handle.attach(UserDao.class);
            user = dao.getUser(userId);
        } catch (Exception e) {
            throw new ServerException(ErrorType.SERVER_ERROR, e.getMessage());
        }
        if (user == null) {
            throw new ServerException(ErrorType.NOT_FOUND_ERROR, "User " + userId + " not found.");
        }
        return new User.Builder()
                .from(user)
                .firstName(null)
                .lastName(null)
                .email(null)
                .build();
    }

    @Override
    public void logout(UserPrincipal userPrincipal) {
        try (Handle handle = dbi.open()) {
            UserDao dao = handle.attach(UserDao.class);
            dao.deleteToken(userPrincipal.getUser().getId(), userPrincipal.getToken());
        } catch (Exception e) {
            throw new ServerException(ErrorType.SERVER_ERROR, e.getMessage());
        }
    }
}
