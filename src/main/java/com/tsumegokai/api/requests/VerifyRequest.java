package com.tsumegokai.api.requests;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.immutables.value.Value;

@Value.Immutable
@JsonSerialize(as = ImmutableVerifyRequest.class)
@JsonDeserialize(as = ImmutableVerifyRequest.class)
public interface VerifyRequest {
    String getEmail();

    class Builder extends ImmutableVerifyRequest.Builder {}
}
