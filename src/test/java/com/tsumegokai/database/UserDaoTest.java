package com.tsumegokai.database;

import com.tsumegokai.api.Token;
import com.tsumegokai.api.User;
import com.tsumegokai.dao.user.UserDao;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

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
    public void getUser() {
        String randomUserLogin = Double.toHexString(Math.random());
        int userId = userDao.createUser(
                randomUserLogin,
                "password",
                "user",
                "one",
                "user@test.com");
        User user = userDao.getUser(userId);
        if (user == null) {
            Assert.fail("User was not found");
        }
        Assert.assertEquals(randomUserLogin, user.getLogin());
        Assert.assertNull(user.getPassword());
        Assert.assertEquals("user", user.getFirstName());
        Assert.assertEquals("one", user.getLastName());
        Assert.assertEquals(-1, user.getRank());
        Assert.assertEquals("user@test.com", user.getEmail());

        User user2 = userDao.getUser(randomUserLogin);
        Assert.assertEquals(user, user2);

        User user3 = userDao.getFullUser(userId);
        User user4 = userDao.getFullUser(randomUserLogin);
        Assert.assertEquals("password", user3.getPassword());
        Assert.assertEquals(user3, user4);
    }

    @Test
    public void updateUser() {
        int userId = userDao.createUser(
                "user1",
                "password",
                "user",
                "one",
                "user@test.com");
        userDao.updateUser(
                userId,
                "password1",
                "user1",
                "one1",
                3,
                "user1@test.com");
        User user = userDao.getFullUser(userId);
        if (user == null) {
            Assert.fail("User was not found");
        }
        Assert.assertEquals("password1", user.getPassword());
        Assert.assertEquals("user1", user.getFirstName());
        Assert.assertEquals("one1", user.getLastName());
        Assert.assertEquals(3, user.getRank());
        Assert.assertEquals("user1@test.com", user.getEmail());
    }

    @Test
    public void unfindableUser() {
        User user = userDao.getUser(123456789);
        if (user != null) {
            Assert.fail("User was somehow found");
        }
    }

    @Test
    public void addUserRole() {
        int userId = userDao.createUser(
                "user1",
                "password",
                "user",
                "one",
                "user@test.com");
        userDao.addUserRole(userId, 1);
        User user = userDao.getUser(userId);
        Assert.assertTrue(user.getRoles().get(0) == 1);
        Assert.assertTrue(user.getRoles().size() == 1);
    }

    @Test
    public void removeUserRole() {
        int userId = userDao.createUser(
                "user1",
                "password",
                "user",
                "one",
                "user@test.com");
        userDao.addUserRole(userId, 1);
        userDao.addUserRole(userId, 2);
        userDao.deleteUserRole(userId, 1);
        User user = userDao.getUser(userId);
        Assert.assertTrue(user.getRoles().get(0) == 2);
        Assert.assertTrue(user.getRoles().size() == 1);
    }

    @Test
    public void createToken() {
        int userId = userDao.createUser(
                "user1",
                "password",
                "user",
                "one",
                "user@test.com");
        userDao.createToken(userId, "token" + userId);
        Token token = userDao.getToken("token" + userId);
        Assert.assertEquals(token.getUserId(), userId);
    }

    @Test
    public void deleteToken() {
        int userId = userDao.createUser(
                "user1",
                "password",
                "user",
                "one",
                "user@test.com");
        userDao.createToken(userId, "token" + userId);
        userDao.deleteToken(userId, "token" + userId);
        Token token = userDao.getToken("token" + userId);
        Assert.assertNull(token);
    }
}
