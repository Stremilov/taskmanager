package com.example.it_one.services;



import com.example.it_one.exception.userExeptions.UserExistsException;
import com.example.it_one.models.User;
import com.example.it_one.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;

    public User createNewUser(User requestBody) {
        if (repository.findById(requestBody.getId()).isPresent()) {
            throw new UserExistsException();
        }
        return repository.save(requestBody);
    }
}
