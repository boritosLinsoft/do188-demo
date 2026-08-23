# --- NIVEAU 1 : Builder (Compilateur) ---
FROM registry.access.redhat.com/ubi9/openjdk-21:latest AS builder
USER root
WORKDIR /app
# N'copiw les fichiers mta3 l'projet
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src
# N'compiliw l'JAR men ghir ma n'3awdou l'tests bech nezarbou
RUN ./mvnw clean package -DskipTests

# --- NIVEAU 2 : Runtime (Serveur Khfif) ---
FROM registry.access.redhat.com/ubi9/openjdk-21-runtime:latest
WORKDIR /deployments
# N'jibou KEN l'fichier .jar elli 7dhar mil niveau 1
COPY --from=builder /app/target/*.jar /deployments/app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/deployments/app.jar"]