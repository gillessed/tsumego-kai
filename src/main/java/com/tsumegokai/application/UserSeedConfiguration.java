package com.tsumegokai.application;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.annotation.Nullable;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

public class UserSeedConfiguration {

        @Valid
        @NotNull
        @JsonProperty
        private String username;

        public String getUsername() {
            return username;
        }

        @Valid
        @NotNull
        @JsonProperty
        private String password;

        public String getPassword() {
            return password;
        }

        @Valid
        @NotNull
        @JsonProperty
        private String firstName;

        public String getFirstName() {
            return firstName;
        }

        @Valid
        @NotNull
        @JsonProperty
        private String lastName;

        public String getLastName() {
            return lastName;
        }

        @Valid
        @NotNull
        @JsonProperty
        private String email;

        public String getEmail() {
            return email;
        }

        @Valid
        @JsonProperty
        private Boolean owner;


        public boolean isOwner() {
            return owner == null ? false : owner;
        }
}
