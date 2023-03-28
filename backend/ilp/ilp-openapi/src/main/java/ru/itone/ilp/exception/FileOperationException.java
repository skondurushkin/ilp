package ru.itone.ilp.exception;

import lombok.Getter;

public class FileOperationException extends RuntimeException {

    @Getter
    private final FileOperationError fileOperationError;

    public FileOperationException(FileOperationError fileOperationError) {
        super(fileOperationError.getMessage());
        this.fileOperationError = fileOperationError;
    }

    public FileOperationException(FileOperationError fileOperationError, Throwable cause) {
        super(fileOperationError.getMessage(), cause);
        this.fileOperationError = fileOperationError;
    }
}
