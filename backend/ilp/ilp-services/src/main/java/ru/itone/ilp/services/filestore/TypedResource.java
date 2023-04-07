package ru.itone.ilp.services.filestore;

import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;

public record TypedResource(MediaType mediaType, Resource resource) {
}
