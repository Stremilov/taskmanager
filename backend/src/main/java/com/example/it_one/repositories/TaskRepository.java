package com.example.it_one.repositories;

import com.example.it_one.models.Project;
import com.example.it_one.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByProject(Project project);
}
