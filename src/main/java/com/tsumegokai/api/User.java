package com.tsumegokai.api;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.immutables.value.Value;

import java.util.List;

@Value.Immutable
@JsonSerialize(as = ImmutableUser.class)
@JsonDeserialize(as = ImmutableUser.class)
public interface User {
    int getId();
    List<Integer> getRoles();
    String getLogin();
    String getFirstName();
    String getLastName();
    int getRank();
    default String getName() { return getFirstName() + getLastName(); }

    class Builder extends ImmutableUser.Builder {}
}
