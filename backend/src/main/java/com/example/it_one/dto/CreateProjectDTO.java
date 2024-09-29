package com.example.it_one.dto;


import com.example.it_one.models.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateProjectDTO {
    private String name;
    private String description;
    private String gitRepoUrl;
    private String Username;
}
