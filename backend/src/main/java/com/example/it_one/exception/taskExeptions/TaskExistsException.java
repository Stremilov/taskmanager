package com.example.it_one.exception.taskExeptions;

public class TaskExistsException extends RuntimeException {
    public TaskExistsException() {
        super("Task already exists");
    }
}
