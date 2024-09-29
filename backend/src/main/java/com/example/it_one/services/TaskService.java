package com.example.it_one.services;

import com.example.it_one.dto.TaskCreateDTO;
import com.example.it_one.dto.UpdateTaskStatusDTO;
import com.example.it_one.exception.taskExeptions.TaskNotFoundException;
import com.example.it_one.models.CompletionStatus;
import com.example.it_one.models.Project;
import com.example.it_one.models.Task;
import com.example.it_one.models.User;
import com.example.it_one.repositories.ProjectRepository;
import com.example.it_one.repositories.TaskRepository;
import com.example.it_one.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    public Task createNewTask(TaskCreateDTO taskDTO) {
        Project project = projectRepository.findByName(taskDTO.getProjectName())
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));

        List<User> assignees = new ArrayList<>();
        for (String username : taskDTO.getAssigneeUsername()) {
            User assignee = userRepository.findByUsername(username)
                    .orElseThrow(() -> new IllegalArgumentException("Assignee not found: " + username));
            assignees.add(assignee);
        }

        Task task = Task.builder()
                .name(taskDTO.getName())
                .deadline(taskDTO.getDeadline())
                .difficulty(taskDTO.getDifficulty())
                .branch(taskDTO.getBranch())
                .createdDate(LocalDate.now())
                .status(CompletionStatus.IN_PROGRESS)
                .project(project)
                .assignees(assignees)
                .build();

        return taskRepository.save(task);
    }

    public ResponseEntity<Object> updateTaskStatus(UpdateTaskStatusDTO statusDTO) {
        Optional<Task> taskOpt = taskRepository.findById(statusDTO.getId());

        if (taskOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Task task = taskOpt.get();

        try {
            CompletionStatus newStatus = CompletionStatus.valueOf(statusDTO.getStatus().toUpperCase());
            task.setStatus(newStatus);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid status: " + statusDTO.getStatus());
        }

        Task updatedTask = taskRepository.save(task);

        return ResponseEntity.ok(updatedTask);
    }

    public void deleteTaskById(Long taskId) {
        if (!taskRepository.existsById(taskId)) {
            throw new TaskNotFoundException();
        }
        taskRepository.deleteById(taskId);
    }
}
