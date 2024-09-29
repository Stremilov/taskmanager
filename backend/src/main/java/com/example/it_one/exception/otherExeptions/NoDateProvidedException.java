package com.example.it_one.exception.otherExeptions;

public class NoDateProvidedException extends RuntimeException {
    public NoDateProvidedException() {
        super("No date provided");
    }
}
