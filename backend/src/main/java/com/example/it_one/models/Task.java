package com.example.it_one.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "tasks", schema = "public")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Task {
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String deadline;
    private String difficulty;
    private String branch;
    private LocalDate createdDate;

    @Setter
    @Enumerated(EnumType.STRING)
    private CompletionStatus status;

    @ManyToOne
    @JoinColumn(name = "project_name", referencedColumnName = "name")
    @JsonBackReference
    private Project project;

    @ManyToMany
    @JoinTable(
            name = "task_assignees",
            joinColumns = @JoinColumn(name = "task_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    @JsonBackReference
    private List<User> assignees = new ArrayList<>();
}
