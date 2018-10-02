package com.tsumegokai.database;

import org.jdbi.v3.core.Handle;
import org.junit.Test;

public class SimpleDatabaseTest extends DatabaseTest {
    @Test
    public void connect() {
        try (Handle h = dbi.open()) {
            h.execute("SELECT 1");
        }
    }
}
