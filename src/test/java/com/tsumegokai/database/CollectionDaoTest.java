package com.tsumegokai.database;

import com.tsumegokai.api.Collection;
import com.tsumegokai.api.Tag;
import com.tsumegokai.api.User;
import com.tsumegokai.dao.collection.CollectionDao;
import com.tsumegokai.dao.tag.TagDao;
import com.tsumegokai.dao.user.UserDao;
import org.jdbi.v3.core.Handle;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

public class CollectionDaoTest extends DatabaseTest {
    private Handle handle;
    private UserDao userDao;
    private CollectionDao collectionDao;
    private TagDao tagDao;

    @Before
    public void openDao() {
        handle = dbi.open();
        userDao = handle.attach(UserDao.class);
        collectionDao = handle.attach(CollectionDao.class);
        tagDao = handle.attach(TagDao.class);
    }

    @After
    public void closeDao() {
        handle.close();
        userDao.close();
        collectionDao.close();
        tagDao.close();
    }

    @Test
    public void getCollection() {
        User user = createRandomUser(userDao);
        Collection collection = createRandomCollection(collectionDao, user.getId(), false);
        Collection retrievedCollection = collectionDao.getCollection(collection.getId());
        if (retrievedCollection == null) {
            Assert.fail("Collection cannot be null.");
        }
        Assert.assertEquals(collection.getId(), retrievedCollection.getId());
        Assert.assertEquals(collection.getName(), retrievedCollection.getName());
        Assert.assertEquals(collection.getUser(), retrievedCollection.getUser());
    }

    @Test
    public void getCollectionsByUser() {
        User user = createRandomUser(userDao);
        Collection collection1 = createRandomCollection(collectionDao, user.getId(), false);
        Collection collection2 = createRandomCollection(collectionDao, user.getId(), false);
        Collection collection3 = createRandomCollection(collectionDao, user.getId(), false);
        List<Collection> collections = collectionDao.getCollectionsForUser(user.getId());
        Assert.assertEquals(3, collections.size());
        Assert.assertTrue(collections.contains(collection1));
        Assert.assertTrue(collections.contains(collection2));
        Assert.assertTrue(collections.contains(collection3));
    }

    @Test
    public void getCollectionsWithTags() {
        User user = createRandomUser(userDao);
        int collectionId = createRandomCollection(collectionDao, user.getId(), false).getId();
        Tag tag1 = createRandomTag(tagDao);
        Tag tag2 = createRandomTag(tagDao);
        Tag tag3 = createRandomTag(tagDao);
        collectionDao.tagCollection(collectionId, tag1.getId());
        collectionDao.tagCollection(collectionId, tag2.getId());
        collectionDao.tagCollection(collectionId, tag3.getId());
        Collection collection = collectionDao.getCollection(collectionId);
        Assert.assertTrue(collection.getTags().contains(tag1.getId()));
        Assert.assertTrue(collection.getTags().contains(tag2.getId()));
        Assert.assertTrue(collection.getTags().contains(tag3.getId()));
        Assert.assertEquals(3, collection.getTags().size());
    }

    @Test
    public void removeTagFromCollection() {

    }

    @Test
    public void getCollectionWithRecords() {

    }
}
