package com.tsumegokai.api;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.immutables.value.Value;

import javax.annotation.Nullable;
import java.util.List;


@Value.Immutable
@JsonSerialize(as = ImmutableRecord.class)
@JsonDeserialize(as = ImmutableRecord.class)
public interface Record {
    int getId();
    int getAuthor();
    String getDateUpdated();
    int getVersion();
    int getVersionCount();
    String getData();
    List<Integer> getTags();
    int getCollection();
    int getType();
    @Nullable
    String getPlayerWhite();
    @Nullable
    String getPlayerBlack();
    Integer getRank();

    class Builder extends ImmutableRecord.Builder {}
}
