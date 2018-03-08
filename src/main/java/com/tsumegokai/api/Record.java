package com.tsumegokai.api;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.tsumegokai.push.PushUpdate;
import org.immutables.value.Value;


@Value.Immutable
@JsonSerialize(as = ImmutableRecord.class)
@JsonDeserialize(as = ImmutableRecord.class)
public interface Record extends PushUpdate {
    String getId();
    String getDateSubmitted();
    int getVersion();
    int getPlayerWhite();
    int getPlayerBlack();


    class Builder extends ImmutableRecord.Builder {}
}
