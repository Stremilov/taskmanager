package com.example.it_one.services;

import com.example.it_one.dto.CreateProjectDTO;
import com.example.it_one.exception.userExeptions.UserExistsException;
import com.example.it_one.models.Project;
import com.example.it_one.models.Task;
import com.example.it_one.models.User;
import com.example.it_one.repositories.ProjectRepository;
import com.example.it_one.repositories.TaskRepository;
import com.example.it_one.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;

    public Project createNewProject(CreateProjectDTO createProjectDTO) {
        Optional<User> authorOpt = userRepository.findByUsername(createProjectDTO.getUsername());
        if (authorOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        Project project = Project.builder()
                .name(createProjectDTO.getName())
                .description(createProjectDTO.getDescription())
                .gitRepoUrl(createProjectDTO.getGitRepoUrl())
                .author(authorOpt.get())
                .build();
        return projectRepository.save(project);
    }

    public List<Task> getTasksByProjectName(String projectName) {
        Project project = projectRepository.findByName(projectName)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        return taskRepository.findAllByProject(project);
    }
}
