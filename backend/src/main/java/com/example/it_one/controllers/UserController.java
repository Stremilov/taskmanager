package com.example.it_one.controllers;


import com.example.it_one.dto.CreateUserDTO;
import com.example.it_one.exception.userExeptions.UserExistsException;
import com.example.it_one.exception.userExeptions.UserNotFoundException;
import com.example.it_one.models.MessageResponse;
import com.example.it_one.models.User;
import com.example.it_one.repositories.UserRepository;
import com.example.it_one.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@Tag(name="User Repository", description="Работа с пользователями внутри системы")
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @ExceptionHandler(UserNotFoundException.class)
    ResponseEntity<MessageResponse> handleUserNotFoundException(UserNotFoundException ex) {
        MessageResponse response = new MessageResponse(ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserExistsException.class)
    ResponseEntity<MessageResponse> handleUserExistsException(UserExistsException ex) {
        MessageResponse response = new MessageResponse(ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @Operation(summary = "Создать пользователя")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Пользователь успешно создан"),
            @ApiResponse(responseCode = "400", description = "Ошибка при создании пользователя"),
            @ApiResponse(responseCode = "409", description = "Конфликт")
    })
    @PostMapping("/create")
    public ResponseEntity<Object> createNewUser(@RequestBody CreateUserDTO body) {
        try {
            Optional<User> existingUser = userRepository.findByUsername(body.getName());

            if (existingUser.isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }
            User newUser = User.builder()
                    .name(body.getName())
                    .email(body.getEmail())
                    .username(body.getUsername())
                    .build();
            User savedUser = userRepository.save(newUser);

            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}