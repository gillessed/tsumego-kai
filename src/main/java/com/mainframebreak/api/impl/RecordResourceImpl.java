package com.mainframebreak.api.impl;

import com.mainframebreak.api.Record;
import com.mainframebreak.api.RecordResource;
import com.mainframebreak.application.TsumegoKaiConfiguration;
import com.mainframebreak.dao.Dao;
import com.mainframebreak.push.impl.PushResource;

import javax.inject.Inject;

public class RecordResourceImpl implements RecordResource {

    @Inject
    private TsumegoKaiConfiguration configuration;

    @Inject
    private Dao dao;

    @Inject
    private PushResource pushResource;

    @Override
    public Record getEditions() {
        return null;
    }
}
