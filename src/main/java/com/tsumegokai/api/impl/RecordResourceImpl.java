package com.tsumegokai.api.impl;

import com.tsumegokai.api.Record;
import com.tsumegokai.api.resources.RecordResource;
import com.tsumegokai.dao.Dao;

import javax.inject.Inject;

public class RecordResourceImpl implements RecordResource {
    private final Dao dao;

    @Inject
    public RecordResourceImpl(Dao dao) {
        this.dao = dao;
    }

    @Override
    public Record getEditions() {
        return null;
    }
}
