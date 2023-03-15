FROM node:16.16.0-alpine as builder

ARG VERSION

WORKDIR /work
RUN apk add --update --no-cache gettext

COPY . .
RUN yarn install
RUN yarn build

FROM nginx:alpine

ENV ESC=$
ENV BASE_PATH=/
ENV VITE_ILP_BACKEND_ENDPOINT=http://localhost:8191

COPY --from=builder /usr/bin/envsubst /usr/local/bin/envsubst
COPY --from=builder /work/dist /etc/nginx/html
COPY --from=builder /work/nginx/nginx.tmpl /etc/nginx/nginx.tmpl
COPY --from=builder /work/nginx/default.tmpl /etc/nginx/conf.d/default.tmpl
ENTRYPOINT [ "/bin/sh", "-c" ]
CMD [ "envsubst < /etc/nginx/nginx.tmpl > /etc/nginx/nginx.conf && envsubst < /etc/nginx/conf.d/default.tmpl > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'" ]