package com.tsumegokai.application.modules;

import com.google.inject.Binder;
import com.google.inject.Module;
import com.tsumegokai.api.resources.RecordResource;
import com.tsumegokai.api.impl.RecordResourceImpl;

public class ApplicationModule implements Module {
    @Override
    public void configure(Binder binder) {
        binder.bind(RecordResource.class).to(RecordResourceImpl.class);
    }
}
