package com.example.it_one.controllers;

import com.example.it_one.exception.userExeptions.UserNotFoundException;
import com.example.it_one.models.MessageResponse;
import com.example.it_one.models.Project;
import com.example.it_one.models.Task;
import com.example.it_one.models.Team;
import com.example.it_one.services.ProjectService;
import com.example.it_one.services.TeamService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Tag(name="Team Repository", description="Получение информации о группах людей")
@RestController
@RequestMapping("/api")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @Autowired
    private ProjectService projectService;

    @ExceptionHandler(UserNotFoundException.class)
    ResponseEntity<MessageResponse> handleUserNotFoundException(UserNotFoundException ex) {
        MessageResponse response = new MessageResponse(ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @Operation(summary = "Получить задачи проекта")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Задачи успешно получены"),
            @ApiResponse(responseCode = "400", description = "Ошибка при создании задачи"),
            @ApiResponse(responseCode = "404", description = "Задач не найдено")
    })
    @GetMapping("/projects/{projectName}/tasks")
    public List<Task> getTasksByProjectName(@PathVariable String projectName) {
        return projectService.getTasksByProjectName(projectName);
    }
}
