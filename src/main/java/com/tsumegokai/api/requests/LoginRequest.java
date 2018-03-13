package com.tsumegokai.api.requests;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.tsumegokai.push.PushUpdate;
import org.immutables.value.Value;


@Value.Immutable
@JsonSerialize(as = ImmutableLoginRequest.class)
@JsonDeserialize(as = ImmutableLoginRequest.class)
public interface LoginRequest extends PushUpdate {
    String getLogin();
    String getPassword();

    class Builder extends ImmutableLoginRequest.Builder {}
}
