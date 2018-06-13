package com.tsumegokai.api.impl;

import com.tsumegokai.api.Record;
import com.tsumegokai.api.resources.RecordResource;
import org.skife.jdbi.v2.DBI;

import javax.inject.Inject;
import java.util.List;

public class RecordResourceImpl implements RecordResource {
    @Inject
    private DBI dbi;

    @Override
    public List<Record> getRecordsInCollection(int collectionId) {
        return null;
    }

    @Override
    public Record getRecord(int recordId, Integer recordVersion) {
        return null;
    }
}
