package com.tsumegokai.api.resources;

import com.tsumegokai.api.User;
import com.tsumegokai.application.auth.UserPrincipal;
import io.dropwizard.auth.Auth;

import javax.annotation.security.PermitAll;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("user")
@PermitAll
public interface UserResource {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    User getSelf(@Auth UserPrincipal userPrincipal);

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    User getUser(@Auth UserPrincipal userPrincipal, @PathParam("id") int userId);

    @POST
    @Path("logout")
    void logout(@Auth UserPrincipal userPrincipal);
}
