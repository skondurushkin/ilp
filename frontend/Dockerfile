FROM node:16.16.0-alpine as builder

ARG VERSION

WORKDIR /ui
RUN apk add --update --no-cache \
                                gettext=~0.21 \
                                python3=~3.9 \
                                make=~4.3 \
                                g++=~10.3
COPY . .
RUN npm install
RUN export TEMPLATED=true && npm run build

FROM nginx:alpine

ENV ESC=$
ENV BASE_PATH=/
ENV BACKEND_ENDPOINT=http://localhost:8080

COPY --from=builder /usr/bin/envsubst /usr/local/bin/envsubst
COPY --from=builder /work/dist /etc/nginx/html
COPY --from=builder /work/nginx/nginx.tmpl /etc/nginx/nginx.tmpl
COPY --from=builder /work/nginx/default.tmpl /etc/nginx/conf.d/default.tmpl
ENTRYPOINT [ "/bin/sh", "-c" ]
CMD [ "envsubst < /etc/nginx/nginx.tmpl > /etc/nginx/nginx.conf && envsubst < /etc/nginx/conf.d/default.tmpl > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'" ]