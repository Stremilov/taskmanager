package com.example.it_one.controllers;

import com.example.it_one.models.MessageResponse;
import com.example.it_one.models.Project;
import com.example.it_one.repositories.ProjectRepository;
import com.example.it_one.services.GitService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.info.ProjectInfoProperties;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.json.JSONArray;
import org.json.JSONObject;
import io.github.cdimascio.dotenv.Dotenv;

import java.io.File;

@Tag(name="Github Repository", description="Работа с GitHub API")
@RestController
@RequestMapping("/api/git")
public class GitHubReposController {

    private final String GIT_AUTH_TOKEN;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private GitService gitService;

    @Autowired
    private ProjectRepository projectRepository;

    public GitHubReposController() {
        Dotenv dotenv = Dotenv.load();
        GIT_AUTH_TOKEN = dotenv.get("GIT_AUTH_TOKEN");
    }

    @Operation(summary = "Получить все репозитории пользователя")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Репозитории успешно получены"),
            @ApiResponse(responseCode = "404", description = "Репозитории не найдены"),
            @ApiResponse(responseCode = "409", description = "Конфликт")
    })
    @GetMapping("/repos/{username}")
    public String fetchRepos(@PathVariable String username) {
        String url = String.format("https://api.github.com/users/%s/repos", username);
        String response = restTemplate.getForObject(url, String.class);

        if (response != null) {
            JSONArray repos = new JSONArray(response);
            StringBuilder result = new StringBuilder();
            for (int i = 0; i < repos.length(); i++) {
                JSONObject repo = repos.getJSONObject(i);
                result.append("Repo name: ").append(repo.getString("name")).append("\n");
            }
            return result.toString();
        } else {
            return "No repositories found or error occurred.";
        }
    }

    @Operation(summary = "Получить все ветки определенного репозитория пользователя")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ветки репозитория успешно получены"),
            @ApiResponse(responseCode = "404", description = "Репозитории не найдены"),
            @ApiResponse(responseCode = "409", description = "Конфликт")
    })
    @GetMapping("/repos/{username}/{repoName}/branches")
    public String fetchBranches(@PathVariable String username, @PathVariable String repoName) {
        String url = String.format("https://api.github.com/repos/%s/%s/branches", username, repoName);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "token " + GIT_AUTH_TOKEN); // добавлено "token" перед токеном

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            JSONArray branches = new JSONArray(responseEntity.getBody());
            StringBuilder result = new StringBuilder();
            for (int i = 0; i < branches.length(); i++) {
                JSONObject branch = branches.getJSONObject(i);
                result.append("Branch name: ").append(branch.getString("name")).append("\n");
            }
            return result.toString();
        } else {
            return "No branches found or error occurred.";
        }
    }


    @PostMapping("/branches/create")
    public ResponseEntity<String> createBranch(@RequestParam String projectName, @RequestParam String branchName) {
        try {
            Project project = projectRepository.findByName(projectName)
                    .orElseThrow(() -> new RuntimeException("Project not found"));

            String repoUrl = project.getGitRepoUrl();
            String[] repoParts = repoUrl.split("/");
            String owner = repoParts[repoParts.length - 2];
            String repo = repoParts[repoParts.length - 1].replace(".git", "");

            gitService.createBranch(owner, repo, branchName, "main");

            return new ResponseEntity<>("Branch created successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error creating branch: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
