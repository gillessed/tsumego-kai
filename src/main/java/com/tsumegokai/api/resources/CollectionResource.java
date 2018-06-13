package com.tsumegokai.api.resources;

import com.tsumegokai.api.Collection;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("collection")
public interface CollectionResource {
    @GET
    @Path("player/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    List<Collection> getCollectionsByUser(@PathParam("id") int userId);

    @GET
    @Path("id/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    Collection getRecord(@PathParam("id") int collectionId);
}
