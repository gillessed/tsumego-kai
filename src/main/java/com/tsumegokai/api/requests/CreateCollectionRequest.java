package com.tsumegokai.api.requests;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.immutables.value.Value;

import javax.annotation.Nullable;
import java.util.List;

@Value.Immutable
@JsonSerialize(as = ImmutableCreateCollectionRequest.class)
@JsonDeserialize(as = ImmutableCreateCollectionRequest.class)
public interface CreateCollectionRequest {
    @Nullable
    Integer getId();
    String getName();
    boolean isPublic();
    List<Integer> getTags();

    class Builder extends ImmutableCreateCollectionRequest.Builder {}
}
