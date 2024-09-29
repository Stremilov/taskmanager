package com.example.it_one.services;


import com.example.it_one.models.Project;
import com.example.it_one.models.Task;
import com.example.it_one.models.Team;
import com.example.it_one.models.User;
import com.example.it_one.repositories.ProjectRepository;
import com.example.it_one.repositories.TaskRepository;
import com.example.it_one.repositories.TeamRepository;
import com.example.it_one.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private TaskRepository taskRepository;

    public List<Team> getTeamsByUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return teamRepository.findAllByUsers(user);
    }

    public List<Project> getProjectsByTeamName(String teamName) {
        Team team = teamRepository.findByName(teamName)
                .orElseThrow(() -> new RuntimeException("Team not found"));
        return projectRepository.findAllByTeam(team);
    }
}
