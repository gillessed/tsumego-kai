package com.tsumegokai.database;

import com.tsumegokai.api.User;
import com.tsumegokai.dao.user.UserDao;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.util.Optional;

public class UserDaoTest extends DatabaseTest {
    private UserDao userDao;

    @Before
    public void openDao() {
        userDao = dbi.open(UserDao.class);
    }

    @After
    public void closeDao() {
        userDao.close();
    }

    @Test
    public void createAndFetchUser() {
        int userId = userDao.createUser("user1", "user", "one");
        Optional<User> maybeUser = userDao.getUser(userId);
        if (!maybeUser.isPresent()) {
            Assert.fail("User one was not found");
        }
        User user = maybeUser.get();
        Assert.assertEquals("user1", user.getLogin());
    }
}
