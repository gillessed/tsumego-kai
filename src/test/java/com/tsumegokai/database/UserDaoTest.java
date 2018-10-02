package com.tsumegokai.database;

import com.tsumegokai.api.Roles;
import com.tsumegokai.api.Token;
import com.tsumegokai.api.User;
import com.tsumegokai.dao.user.UserDao;
import org.jdbi.v3.core.Handle;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class UserDaoTest extends DatabaseTest {
    private Handle handle;
    private UserDao userDao;

    @Before
    public void openDao() {
        handle = dbi.open();
        userDao = handle.attach(UserDao.class);
    }

    @After
    public void closeDao() {
        handle.close();
    }

    @Test
    public void getUser() {
        User insertedUser = createRandomUser(userDao);
        User retrievedUser = userDao.getUser(insertedUser.getId());
        if (retrievedUser == null) {
            Assert.fail("User was not found");
        }
        Assert.assertEquals(insertedUser.getLogin(), retrievedUser.getLogin());
        Assert.assertNull(retrievedUser.getPassword());
        Assert.assertEquals(insertedUser.getFirstName(), retrievedUser.getFirstName());
        Assert.assertEquals(insertedUser.getLastName(), retrievedUser.getLastName());
        Assert.assertEquals(-1, retrievedUser.getRank());
        Assert.assertEquals(insertedUser.getEmail(), retrievedUser.getEmail());

        User retrievedUser2 = userDao.getUser(insertedUser.getId());
        Assert.assertEquals(retrievedUser, retrievedUser2);

        User user3 = userDao.getFullUser(insertedUser.getId());
        User user4 = userDao.getFullUser(retrievedUser2.getLogin());
        Assert.assertEquals(insertedUser.getPassword(), user3.getPassword());
        Assert.assertEquals(user3, user4);
    }

    @Test
    public void updateUser() {
        User insertedUser = createRandomUser(userDao);
        User update = createRandomUserDetails();
        userDao.updateUser(
                insertedUser.getId(),
                update.getPassword(),
                update.getFirstName(),
                update.getLastName(),
                update.getRank(),
                update.getEmail());
        User updatedUser = userDao.getFullUser(insertedUser.getId());
        if (updatedUser == null) {
            Assert.fail("User was not found");
        }
        Assert.assertEquals(update.getPassword(), updatedUser.getPassword());
        Assert.assertEquals(update.getFirstName(), updatedUser.getFirstName());
        Assert.assertEquals(update.getLastName(), updatedUser.getLastName());
        Assert.assertEquals(update.getRank(), updatedUser.getRank());
        Assert.assertEquals(update.getEmail(), updatedUser.getEmail());
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
        User user = createRandomUser(userDao);
        userDao.addUserRole(user.getId(), Roles.ADMIN);
        userDao.addUserRole(user.getId(), Roles.OWNER);
        User roledUser = userDao.getUser(user.getId());
        Assert.assertTrue(roledUser.getRoles().contains(Roles.ADMIN));
        Assert.assertTrue(roledUser.getRoles().contains(Roles.OWNER));
        Assert.assertEquals(2, roledUser.getRoles().size());
    }

    @Test
    public void removeUserRole() {
        User user = createRandomUser(userDao);
        userDao.addUserRole(user.getId(), 1);
        userDao.addUserRole(user.getId(), 2);
        userDao.deleteUserRole(user.getId(), 1);
        User roledUser = userDao.getUser(user.getId());
        Assert.assertEquals(2, (int) roledUser.getRoles().get(0));
        Assert.assertEquals(1, roledUser.getRoles().size());
    }

    @Test
    public void createToken() {
        User user = createRandomUser(userDao);
        String tokenString = "token" + user.getName();
        userDao.createToken(user.getId(), tokenString);
        Token token = userDao.getToken(tokenString);
        Assert.assertEquals(token.getUserId(), user.getId());
    }

    @Test
    public void deleteToken() {
        User user = createRandomUser(userDao);
        String tokenString = "token" + user.getName();
        userDao.createToken(user.getId(), tokenString);
        userDao.deleteToken(user.getId(), tokenString);
        Token token = userDao.getToken(tokenString);
        Assert.assertNull(token);
    }
}
