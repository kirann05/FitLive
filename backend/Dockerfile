FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src src
RUN mvn -B package -DskipTests
FROM eclipse-temurin:21-jre
WORKDIR /app
RUN groupadd --system fitlive && useradd --system --gid fitlive fitlive
COPY --from=build /app/target/fitlive-backend-0.1.0.jar app.jar
USER fitlive
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
