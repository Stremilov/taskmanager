package com.example.it_one.controllers;

import com.example.it_one.config.SecurityConfig;
import com.example.it_one.dto.UserInfoDTO;
import com.example.it_one.models.User;
import com.example.it_one.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@Controller
public class AuthController {

    @Autowired
    private OAuth2AuthorizedClientService authorizedClientService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SecurityConfig securityConfig;

    @GetMapping("/home")
    public String home() {
        return "home";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/access_token")
    @ResponseBody
    public String getAccessToken(@AuthenticationPrincipal OAuth2User oauth2User) {
        if (oauth2User != null) {
            return getAccessTokenFromService(oauth2User);
        }
        return "Пользователь не аутентифицирован";
    }

    private String getAccessTokenFromService(OAuth2User oauth2User) {
        OAuth2AuthorizedClient client = authorizedClientService.loadAuthorizedClient(
                "github",
                oauth2User.getName()
        );

        if (client != null) {
            return client.getAccessToken().getTokenValue();
        }
        return "Нет доступного access token";
    }

}

