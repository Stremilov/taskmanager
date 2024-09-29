package com.example.it_one.exception.taskExeptions;

public class TaskNotFoundException extends RuntimeException {
    public TaskNotFoundException() {
        super("User not found");
    }
}
