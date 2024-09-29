package com.example.it_one.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TaskCreateDTO {
    private String name;
    private String projectName;
    private ArrayList<String> assigneeUsername;
    private String deadline;
    private String difficulty;
    private String branch;
}