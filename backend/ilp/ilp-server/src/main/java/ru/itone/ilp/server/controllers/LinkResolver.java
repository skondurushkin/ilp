package ru.itone.ilp.server.controllers;

import java.net.URI;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@NoArgsConstructor
abstract class LinkResolver {

    private volatile URI baseUri;

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
        URI localUri = baseUri;
        if (localUri == null) {
            synchronized(this) {
                localUri = baseUri;
                if (localUri == null) {
                    baseUri = localUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                            .path("/api/ilp/file").build().toUri();
                }
            }
        }
        return localUri;
    }

}
