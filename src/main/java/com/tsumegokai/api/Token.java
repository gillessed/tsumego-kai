package com.tsumegokai.api;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.immutables.value.Value;

@Value.Immutable
@JsonSerialize(as = ImmutableToken.class)
@JsonDeserialize(as = ImmutableToken.class)
public interface Token {
    String getValue();
    int getUserId();
    String timestamp();

    class Builder extends ImmutableToken.Builder {}
}
