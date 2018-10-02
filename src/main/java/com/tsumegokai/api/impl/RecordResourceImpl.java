package com.tsumegokai.api.impl;

import com.tsumegokai.api.Record;
import com.tsumegokai.api.resources.RecordResource;
import org.jdbi.v3.core.Jdbi;

import javax.inject.Inject;
import java.util.List;

public class RecordResourceImpl implements RecordResource {
    @Inject
    private Jdbi dbi;

    @Override
    public List<Record> getRecordsInCollection(int collectionId) {
        return null;
    }

    @Override
    public Record getRecord(int recordId, Integer recordVersion) {
        return null;
    }
}
