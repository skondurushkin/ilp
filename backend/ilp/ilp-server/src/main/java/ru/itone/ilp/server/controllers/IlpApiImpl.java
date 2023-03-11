package ru.itone.ilp.server.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import ru.itone.ilp.openapi.api.IlpApi;
import ru.itone.ilp.openapi.model.Greeting;

@RestController
public class IlpApiImpl implements IlpApi {

    @Override
    public ResponseEntity<Greeting> sayHello() {

        return ResponseEntity.ok(new Greeting().greeting("Hello client!"));
    }
}
