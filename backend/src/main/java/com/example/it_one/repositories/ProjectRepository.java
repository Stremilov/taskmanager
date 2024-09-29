package com.example.it_one.repositories;

import com.example.it_one.models.Project;
import com.example.it_one.models.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findAllByTeam(Team team);
    Optional<Project> findByName(String name);
}
