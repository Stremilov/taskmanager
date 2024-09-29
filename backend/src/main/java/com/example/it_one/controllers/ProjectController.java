package com.example.it_one.controllers;


import com.example.it_one.dto.CreateProjectDTO;
import com.example.it_one.dto.TaskCreateDTO;
import com.example.it_one.models.Project;
import com.example.it_one.models.Task;
import com.example.it_one.models.User;
import com.example.it_one.repositories.ProjectRepository;
import com.example.it_one.repositories.UserRepository;
import com.example.it_one.services.ProjectService;
import com.example.it_one.services.TaskService;
import com.example.it_one.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@Tag(name="Project Repository", description="Работа с проектами внутри системы")
@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserRepository userRepository;

    @Operation(summary = "Создать проект")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Проект успешно создан"),
            @ApiResponse(responseCode = "400", description = "Ошибка при создании проекта")
    })
    @PostMapping("/create")
    public Project createProject(@RequestBody CreateProjectDTO requestBody) {
        Project newProject = projectService.createNewProject(requestBody);

        return ResponseEntity.status(HttpStatus.CREATED).body(newProject).getBody();
    }
}
