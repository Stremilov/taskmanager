package com.example.it_one.services;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class GitService {
    private String ACCESS_TOKEN;

    public void GitHubService() {
        this.ACCESS_TOKEN = System.getenv("GITHUB_ACCESS_TOKEN");
        if (ACCESS_TOKEN == null) {
            throw new RuntimeException("Access token is not set");
        }
    }
    private final String GITHUB_API_URL = "https://api.github.com/repos/{owner}/{repo}/git/refs";

    public void createBranch(String owner, String repo, String newBranchName, String baseBranchName) {
        RestTemplate restTemplate = new RestTemplate();

        String baseBranchRef = "heads/" + baseBranchName;
        Map<String, String> headers = new HashMap<>();
        headers.put("Authorization", "token " + ACCESS_TOKEN);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setAll(headers);

        HttpEntity<String> requestEntity = new HttpEntity<>(httpHeaders);
        ResponseEntity<Map> response = restTemplate.exchange(
                GITHUB_API_URL + "/" + baseBranchRef,
                HttpMethod.GET,
                requestEntity,
                Map.class,
                owner,
                repo
        );

        String sha = (String) ((Map) response.getBody().get("object")).get("sha");

        Map<String, Object> body = new HashMap<>();
        body.put("ref", "refs/heads/" + newBranchName);
        body.put("sha", sha);

        HttpEntity<Map<String, Object>> createBranchEntity = new HttpEntity<>(body, httpHeaders);
        restTemplate.exchange(GITHUB_API_URL, HttpMethod.POST, createBranchEntity, Map.class, owner, repo);
    }
}

