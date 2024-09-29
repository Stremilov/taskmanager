package com.example.it_one.config;

import com.example.it_one.models.User;
import com.example.it_one.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;

import java.util.Optional;

@Configuration
public class SecurityConfig {

    @Autowired
    private OAuth2AuthorizedClientService authorizedClientService;

    @Autowired
    private UserRepository userRepository;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .oauth2Login(oauth2 -> oauth2
                        .loginPage("/login")
                        .defaultSuccessUrl("/home")
                        .userInfoEndpoint(userInfo -> userInfo
                                .userService(this::saveUserAfterOAuth2Login)
                        )
                );

        return http.build();
    }

    private OAuth2User saveUserAfterOAuth2Login(OAuth2UserRequest userRequest) {

        DefaultOAuth2UserService delegate = new DefaultOAuth2UserService();
        OAuth2User oauth2User = delegate.loadUser(userRequest);

        String username = oauth2User.getAttribute("login");
        String name = oauth2User.getAttribute("name");
        String email = oauth2User.getAttribute("email");

        Optional<User> existingUser = userRepository.findByUsername(username);

        if (existingUser.isEmpty()) {
            User newUser = User.builder()
                    .name(name)
                    .username(username)
                    .email(email)
                    .build();
            userRepository.save(newUser);
        }

        return oauth2User;
    }

    public String getAccessToken(OAuth2User oauth2User) {
        OAuth2AuthorizedClient client = authorizedClientService.loadAuthorizedClient(
                "github",
                oauth2User.getName()
        );

        OAuth2AccessToken accessToken = client.getAccessToken();
        return accessToken.getTokenValue();
    }
}
