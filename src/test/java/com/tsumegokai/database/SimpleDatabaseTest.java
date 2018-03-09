package com.tsumegokai.database;

import org.junit.Test;
import org.skife.jdbi.v2.Handle;

public class SimpleDatabaseTest extends DatabaseTest {
    @Test
    public void connect() {
        Handle h = dbi.open();
        h.execute("SELECT 1");
        h.close();
    }
}
