package com.tsumegokai.api.requests;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.immutables.value.Value;

@Value.Immutable
@JsonSerialize(as = ImmutableCreateUserRequest.class)
@JsonDeserialize(as = ImmutableCreateUserRequest.class)
public interface CreateUserRequest {

    String getLogin();
    String getPassword();
    String getFirstName();
    String getLastName();
    String getEmail();

    class Builder extends ImmutableCreateUserRequest.Builder {}
}
