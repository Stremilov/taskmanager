package com.example.it_one.controllers;


import com.example.it_one.dto.TaskCreateDTO;
import com.example.it_one.dto.UpdateTaskStatusDTO;
import com.example.it_one.dto.UserInfoDTO;
import com.example.it_one.exception.taskExeptions.TaskExistsException;
import com.example.it_one.exception.taskExeptions.TaskNotFoundException;
import com.example.it_one.exception.userExeptions.UserExistsException;
import com.example.it_one.exception.userExeptions.UserNotFoundException;
import com.example.it_one.models.MessageResponse;
import com.example.it_one.models.Task;
import com.example.it_one.models.User;
import com.example.it_one.repositories.TaskRepository;
import com.example.it_one.repositories.UserRepository;
import com.example.it_one.services.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.Optional;


@Tag(name="Task Repository", description="Работа с задачи внутри проектов")
@RestController
@RequestMapping("/api/task")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestTemplate restTemplate;

    @ExceptionHandler(TaskNotFoundException.class)
    ResponseEntity<MessageResponse> handleTaskNotFoundException(UserNotFoundException ex) {
        MessageResponse response = new MessageResponse(ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(TaskExistsException.class)
    ResponseEntity<MessageResponse> handleTaskExistsException(UserExistsException ex) {
        MessageResponse response = new MessageResponse(ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @Operation(summary = "Создание новой задачи")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Задача успешно создана"),
            @ApiResponse(responseCode = "400", description = "Ошибка при создании задачи")
    })
    @PostMapping("/create")
    ResponseEntity<Task> createNewTask(@RequestBody TaskCreateDTO taskDTO) {
        try {
            Task createdTask = taskService.createNewTask(taskDTO);
            return ResponseEntity.ok(createdTask);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Обновление статуса задачи")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Статус задачи успешно обновлен"),
            @ApiResponse(responseCode = "404", description = "Задача не найдена")
    })
    @PatchMapping("/update")
     ResponseEntity<Object> updateTaskStatus(@RequestBody UpdateTaskStatusDTO taskStatusDTO) {
        try {
            Object updated_task = taskService.updateTaskStatus(taskStatusDTO);
            return ResponseEntity.ok(updated_task);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Получить исполнителей задачи")
    @GetMapping("/{taskId}/assignees")
    public ResponseEntity<List<User>> getAssigneesByTask(@PathVariable Long taskId) {
        try {
            Task task = taskRepository.findById(taskId)
                    .orElseThrow(() -> new RuntimeException("Task not found"));

            List<User> assignees = task.getAssignees();
            return new ResponseEntity<>(assignees, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Назначить пользователя на задачу")
    @PostMapping("/tasks/{taskId}/assign")
    public ResponseEntity<String> assignUserToTask(@PathVariable Long taskId, @RequestParam Long userId) {
        try {
            Task task = taskRepository.findById(taskId)
                    .orElseThrow(() -> new RuntimeException("Task not found"));
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            task.getAssignees().add(user);
            user.getAssignedTasks().add(task);

            taskRepository.save(task);
            userRepository.save(user);

            return new ResponseEntity<>("User assigned to task successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error assigning user to task: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Удалить задачу по идентификатору")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Задача успешно удалена"),
            @ApiResponse(responseCode = "404", description = "Задача не найдена")
    })
    @DeleteMapping("/{taskId}")
    public ResponseEntity<MessageResponse> deleteTask(@PathVariable Long taskId) {
        try {
            taskService.deleteTaskById(taskId);
            return new ResponseEntity<>(new MessageResponse("Задача успешно удалена"), HttpStatus.OK);
        } catch (UserNotFoundException ex) {
            return handleTaskNotFoundException(ex);
        } catch (Exception e) {
            return new ResponseEntity<>(new MessageResponse("Ошибка при удалении задачи: " + e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
