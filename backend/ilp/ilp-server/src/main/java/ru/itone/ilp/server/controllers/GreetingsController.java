package ru.itone.ilp.server.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import ru.itone.ilp.openapi.api.IlpApi;
import ru.itone.ilp.openapi.model.Greeting;
import ru.itone.ilp.services.greetings.GreetingsService;

@RestController
@RequiredArgsConstructor
@Slf4j
public class GreetingsController implements IlpApi {

    private final GreetingsService greetingsService;

    @Override
    public ResponseEntity<Greeting> sayHello() {

        return ResponseEntity.ok(new Greeting().greeting(greetingsService.getDefaultGreeting()));
    }
}
