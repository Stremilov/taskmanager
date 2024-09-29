package com.example.it_one.repositories;

import com.example.it_one.models.Project;
import com.example.it_one.models.Team;
import com.example.it_one.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TeamRepository extends JpaRepository<Team, Long> {
    List<Team> findAllByUsers(User user);
    Optional<Team> findByName(String name);
}
