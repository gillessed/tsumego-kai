package com.tsumegokai.api.resources;

import com.tsumegokai.api.Token;
import com.tsumegokai.api.User;
import com.tsumegokai.api.requests.CreateUserRequest;
import com.tsumegokai.api.requests.LoginRequest;
import com.tsumegokai.api.requests.VerifyRequest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("auth")
public interface AuthResource {
    @POST
    @Path("login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    Token login(LoginRequest loginRequest);

    @POST
    @Path("create")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    User createUser(CreateUserRequest request);

    @POST
    @Path("verify")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    void createVerificationCode(VerifyRequest request);
}
