package com.tsumegokai.api.impl;

import com.tsumegokai.api.Record;
import com.tsumegokai.api.resources.RecordResource;
import org.skife.jdbi.v2.DBI;

import javax.inject.Inject;

public class RecordResourceImpl implements RecordResource {
    @Inject
    private DBI dbi;

    @Override
    public Record getEditions() {
        return null;
    }
}
