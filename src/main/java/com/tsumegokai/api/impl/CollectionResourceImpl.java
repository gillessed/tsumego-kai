package com.tsumegokai.api.impl;

import com.tsumegokai.api.Collection;
import com.tsumegokai.api.requests.CreateCollectionRequest;
import com.tsumegokai.api.resources.CollectionResource;

import java.util.List;

public class CollectionResourceImpl implements CollectionResource {
    @Override
    public List<Collection> getCollectionsByUser(int userId) {
        return null;
    }

    @Override
    public Collection getCollection(int collectionId) {
        return null;
    }

    @Override
    public Collection createUpdateCollection(CreateCollectionRequest request) {
        return null;
    }
}
