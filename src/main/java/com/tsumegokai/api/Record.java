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
    String getDateSubmitted();
    int getVersion();
    int getVersionCount();
    String getData();
    List<String> getTags();
    int getCollection();
    @Nullable
    String getPlayerWhite();
    @Nullable
    String getPlayerBlack();
    @Nullable
    Integer getRank();

    class Builder extends ImmutableRecord.Builder {}
}
