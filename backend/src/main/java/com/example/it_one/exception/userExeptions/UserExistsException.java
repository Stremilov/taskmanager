package com.example.it_one.exception.userExeptions;

public class UserExistsException extends RuntimeException {
    public UserExistsException() {
        super("User already exists");
    }
}
