package com.example.it_one.models;


public enum CompletionStatus {
    NOT_ACTIVE("Не активна"),
    IN_PROGRESS("В работе"),
    COMPLETED("Выполнена");

    private String description;

    CompletionStatus(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
