package com.tsumegokai.database;

import com.google.common.collect.Lists;
import com.tsumegokai.api.Collection;
import com.tsumegokai.api.Record;
import com.tsumegokai.api.Tag;
import com.tsumegokai.api.User;
import com.tsumegokai.dao.collection.CollectionDao;
import com.tsumegokai.dao.record.RecordDao;
import com.tsumegokai.dao.tag.TagDao;
import com.tsumegokai.dao.user.UserDao;
import org.jdbi.v3.core.Handle;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class RecordDaoTest extends DatabaseTest {
    private Handle handle;
    private UserDao userDao;
    private CollectionDao collectionDao;
    private TagDao tagDao;
    private RecordDao recordDao;

    @Before
    public void openDao() {
        handle = dbi.open();
        userDao = handle.attach(UserDao.class);
        collectionDao = handle.attach(CollectionDao.class);
        tagDao = handle.attach(TagDao.class);
        recordDao = handle.attach(RecordDao.class);
    }

    @After
    public void closeDao() {
        handle.close();
        userDao.close();
        collectionDao.close();
        tagDao.close();
        recordDao.close();
    }

    @Test
    public void getRecord() {
        User user = createRandomUser(userDao);
        Collection collection = createRandomCollection(collectionDao, user.getId(), false);
        Tag t1 = createRandomTag(tagDao);
        Tag t2 = createRandomTag(tagDao);
        Record expected = createRandomRecord(
                recordDao,
                user.getId(),
                collection.getId(),
                Lists.newArrayList(t1.getId(), t2.getId()));

        Record actual = recordDao.getRecord(expected.getId());
        Assert.assertEquals(expected.getData(), actual.getData());
        Assert.assertEquals(expected.getAuthor(), actual.getAuthor());
        Assert.assertEquals(expected.getVersion(), actual.getVersion());
        Assert.assertEquals(expected.getVersionCount(), actual.getVersionCount());
        Assert.assertEquals(expected.getRank(), actual.getRank());
        Assert.assertEquals(expected.getPlayerWhite(), actual.getPlayerWhite());
        Assert.assertEquals(expected.getPlayerBlack(), actual.getPlayerBlack());
        Assert.assertTrue(actual.getTags().contains(t1.getId()));
        Assert.assertTrue(actual.getTags().contains(t2.getId()));
        Assert.assertEquals(2, actual.getTags().size());
    }
}
