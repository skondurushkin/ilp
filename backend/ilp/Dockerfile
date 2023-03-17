# syntax=docker/dockerfile:experimental
FROM bellsoft/liberica-openjdk-alpine:18.0.2 as builder
WORKDIR /workspace/app
RUN mkdir ilp-openapi
RUN mkdir ilp-persistence
RUN mkdir ilp-services
RUN mkdir ilp-server

COPY ./mvnw .
COPY .mvn .mvn
COPY ./pom.xml .

COPY ./ilp-openapi/pom.xml ilp-openapi
COPY ./ilp-openapi/src ilp-openapi/src

COPY ./ilp-persistence/pom.xml ilp-persistence
COPY ./ilp-persistence/src ilp-persistence/src

COPY ./ilp-services/pom.xml ilp-services
COPY ./ilp-services/src ilp-services/src

COPY ./ilp-server/pom.xml ilp-server
COPY ./ilp-server/src ilp-server/src

RUN --mount=type=cache,target=/root/.m2 ./mvnw install -DskipTests

FROM bellsoft/liberica-openjdk-alpine:18.0.2
WORKDIR /workspace/build/ilp-server
VOLUME /tmp

ARG JAR_FILE=/workspace/app/ilp-server/target/ilp-server-0.0.1-SNAPSHOT.jar
COPY --from=builder ${JAR_FILE} ./ilp-server.jar
EXPOSE 8191
ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS} -jar /workspace/build/ilp-server/ilp-server.jar ${0} ${@}"]
