package ru.itone.ilp.server.controllers;

import jakarta.servlet.http.HttpServletRequest;
import java.net.URI;
import java.util.Optional;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Slf4j
@NoArgsConstructor
abstract class LinkResolver {

    protected String resolve(String link) {
        if (StringUtils.isBlank(link)) {
            return null;
        }
        URI uri = URI.create(link);
        if (uri.isAbsolute())
            return link;
        return getBaseUri().resolve(uri).toString();
    }

    protected URI getBaseUri() {
        Optional<HttpServletRequest> optRequest = Optional.ofNullable(getCurrentHttpRequest());
        URI baseUri = optRequest.map(r -> (URI) r.getAttribute("BASE_URI")).orElse(null);
        if (baseUri == null) {
            String uri = optRequest.map(r -> r.getHeader("Referer")).orElse(null);
            if (uri == null) {
                uri = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
            }
            URI newBaseUri = URI.create(uri).resolve("/api/ilp/file/");
            optRequest.ifPresent(r -> r.setAttribute("BASE_URI", newBaseUri));
            baseUri = newBaseUri;
        }
        return baseUri;
    }

    public static HttpServletRequest getCurrentHttpRequest(){
        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
        if (requestAttributes instanceof ServletRequestAttributes attributes) {
            return attributes.getRequest();
        }
        log.debug("Not called in the context of an HTTP request");
        return null;
    }

}
