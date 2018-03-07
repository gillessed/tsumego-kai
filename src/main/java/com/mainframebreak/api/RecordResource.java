package com.mainframebreak.api;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("record")
public interface RecordResource {
    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    Record getEditions();
}
