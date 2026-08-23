package com.tn.dev;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(properties = {
        "spring.datasource.url=jdbc:h2:mem:testdb",
        "spring.datasource.driverClassName=org.h2.Driver",
        "spring.datasource.username=sa",
        "spring.datasource.password=",
        "spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect", 
        "spring.jpa.hibernate.ddl-auto=create-drop"
})
@AutoConfigureMockMvc
public class TaskIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testDatabaseIntegration() throws Exception {
        mockMvc.perform(get("/api/tasks"))
                .andExpect(status().isOk())
                
                // 1. Nethabtou elli l'liste fiha bedhabt 3 tâches
                .andExpect(jsonPath("$.length()").value(3))
                
                // 2. Nethabtou fi l'titre mta3 l'tâche l'oula (index 0)
                .andExpect(jsonPath("$[0].title").value("Tâche 1: Apprendre OpenShift"))
                
                // 3. Nethabtou fi l'titre mta3 l'tâche e'thenya (index 1)
                .andExpect(jsonPath("$[1].title").value("Tâche 2: Automatiser avec Argo CD"))
                
                // 4. Nethabtou fi l'titre mta3 l'tâche e'theltha (index 2)
                .andExpect(jsonPath("$[2].title").value("Tâche 3: Déployer l'application React"));
    }
}