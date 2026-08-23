package com.tn.dev;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {
    @Bean
    CommandLineRunner initDatabase(TaskRepository repository) {
        return args -> {
            // N'sobou des données bech n'testiw (7ata ken l'base mouch fergha)
            repository.save(new Task("Tâche 1: Apprendre OpenShift"));
            repository.save(new Task("Tâche 2: Automatiser avec Argo CD"));
            repository.save(new Task("Tâche 3: Déployer l'application React"));
            System.out.println("Données de test ajoutées à la base de données !");
        };
    }
}