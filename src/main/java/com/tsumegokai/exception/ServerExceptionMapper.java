package com.tsumegokai.exception;

import com.tsumegokai.application.ErrorType;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;

public class ServerExceptionMapper implements ExceptionMapper<ServerException> {
    @Override
    public Response toResponse(ServerException exception) {
        return Response
                .status(Response.Status.OK)
                .entity(new ServerError.Builder()
                        .error(exception.getMessage())
                        .errorType(ErrorType.SERVER_ERROR)
                        .build())
                .type(MediaType.APPLICATION_JSON)
                .build();

    }
}
