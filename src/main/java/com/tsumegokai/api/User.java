package com.tsumegokai.api;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.immutables.value.Value;

import javax.annotation.Nullable;
import java.util.List;

@Value.Immutable
@JsonSerialize(as = ImmutableUser.class)
@JsonDeserialize(as = ImmutableUser.class)
public interface User {
    int getId();
    List<Integer> getRoles();
    String getLogin();
    @Nullable
    String getPassword();
    String getFirstName();
    String getLastName();
    int getRank();
    String getEmail();
    default String getName() { return getFirstName() + getLastName(); }

    class Builder extends ImmutableUser.Builder {}
}
