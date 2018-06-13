package com.tsumegokai.api;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.immutables.value.Value;

import java.util.List;

@Value.Immutable
@JsonSerialize(as = ImmutableCollection.class)
@JsonDeserialize(as = ImmutableCollection.class)
public interface Collection {
    int getId();
    List<String> getRecords();
    List<String> getTags();
    boolean isDefaultCollection();

    class Builder extends ImmutableCollection.Builder {}
}
