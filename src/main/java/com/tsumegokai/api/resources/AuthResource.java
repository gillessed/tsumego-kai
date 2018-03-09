package com.tsumegokai.api.resources;

import javax.annotation.security.PermitAll;
import javax.ws.rs.POST;
import javax.ws.rs.Path;

@Path("auth")
@PermitAll
public interface AuthResource {
    @POST
    void login();
}
