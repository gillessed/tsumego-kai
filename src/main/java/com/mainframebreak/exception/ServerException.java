package com.mainframebreak.exception;

import com.mainframebreak.application.ErrorType;

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
