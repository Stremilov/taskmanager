package com.example.it_one.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "teams", schema = "public")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @ManyToMany
    @JoinTable(
            name = "user_teams",
            joinColumns = @JoinColumn(name = "team_name"),
            inverseJoinColumns = @JoinColumn(name = "user_username")
    )
    private List<User> users = new ArrayList<>();

    @OneToMany(mappedBy = "team")
    private List<Project> projects = new ArrayList<>();
}