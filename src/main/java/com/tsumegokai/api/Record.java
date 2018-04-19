package com.tsumegokai.api;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.immutables.value.Value;


@Value.Immutable
@JsonSerialize(as = ImmutableRecord.class)
@JsonDeserialize(as = ImmutableRecord.class)
public interface Record {
    String getId();
    String getDateSubmitted();
    int getVersion();
    String getPlayerWhite();
    String getPlayerBlack();


    class Builder extends ImmutableRecord.Builder {}
}
