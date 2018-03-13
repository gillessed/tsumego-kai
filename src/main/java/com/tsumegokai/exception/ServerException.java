package com.tsumegokai.exception;

public class ServerException extends RuntimeException {
    private final ErrorType errorType;

    public ServerException(ErrorType errorType, String message) {
        super(message);
        this.errorType = errorType;
    }

    public ErrorType getErrorType() {
        return errorType;
    }
}
