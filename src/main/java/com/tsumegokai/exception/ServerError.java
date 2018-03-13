package com.tsumegokai.exception;


import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.immutables.value.Value;

@Value.Immutable
@JsonSerialize(as = ImmutableServerError.class)
@JsonDeserialize(as = ImmutableServerError.class)
public interface ServerError {

    String getError();
    ErrorType getErrorType();

    class Builder extends ImmutableServerError.Builder {}
}
