package com.tsumegokai.api.resources;

import com.tsumegokai.api.Record;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("record")
public interface RecordResource {
    @GET
    @Path("collection/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    List<Record> getRecordsInCollection(@PathParam("id") int collectionId);

    @GET
    @Path("id/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    Record getRecord(
            @PathParam("id") int recordId,
            @QueryParam("version") Integer recordVersion
    );
}
