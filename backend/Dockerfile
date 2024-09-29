FROM openjdk:17 as builder

WORKDIR /app

COPY ./pom.xml ./mvnw ./
COPY .mvn/ .mvn/

RUN ./mvnw dependency:go-offline -B

COPY . .

RUN ./mvnw package -DskipTests

FROM openjdk:17
WORKDIR /app

COPY --from=builder /app/target/it-one-task-tracker-backend-0.0.1-SNAPSHOT.jar /app/it-one-task-tracker-backend-0.0.1-SNAPSHOT.jar
COPY --from=builder /app/.env /app/.env

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "it-one-task-tracker-backend-0.0.1-SNAPSHOT.jar"]