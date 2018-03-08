package com.tsumegokai.api;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.tsumegokai.push.PushUpdate;
import org.immutables.value.Value;


@Value.Immutable
@JsonSerialize(as = ImmutableTag.class)
@JsonDeserialize(as = ImmutableTag.class)
public interface Tag extends PushUpdate {
    int getId();
    int getName();

    class Builder extends ImmutableTag.Builder {}
}
