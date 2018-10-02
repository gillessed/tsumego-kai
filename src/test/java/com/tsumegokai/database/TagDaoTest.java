package com.tsumegokai.database;

import com.tsumegokai.api.Tag;
import com.tsumegokai.dao.tag.TagDao;
import org.jdbi.v3.core.Handle;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

public class TagDaoTest extends DatabaseTest {
    private Handle handle;
    private TagDao tagDao;

    @Before
    public void openDao() {
        handle = dbi.open();
        tagDao = handle.attach(TagDao.class);
    }

    @After
    public void closeDao() {
        tagDao.close();
        handle.close();
    }

    @Test
    public void getTag() {
        Tag expected = createRandomTag(tagDao);
        Tag actual = tagDao.getTag(expected.getId());
        Assert.assertEquals(expected.getId(), actual.getId());
        Assert.assertEquals(expected.getName(), actual.getName());
    }

    @Test
    public void searchTag() {
        Tag good1 = createRandomTag(tagDao, "string");
        Tag good2 = createRandomTag(tagDao, "arstring");
        Tag good3 = createRandomTag(tagDao, "stringiest");
        Tag good4 = createRandomTag(tagDao, "castringiest");
        Tag bad1 = createRandomTag(tagDao, "strig");
        List<Tag> tags = tagDao.searchTags("string");
        Assert.assertTrue(tags.contains(good1));
        Assert.assertTrue(tags.contains(good2));
        Assert.assertTrue(tags.contains(good3));
        Assert.assertTrue(tags.contains(good4));
        Assert.assertFalse(tags.contains(bad1));
    }
}
