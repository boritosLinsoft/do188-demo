import React, { useState, useEffect } from 'react';

function App() {
  const [helloMessage, setHelloMessage] = useState("");
  const [loadingHello, setLoadingHello] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);

  useEffect(() => {
    // Activer le défilement fluide (smooth scrolling) lel page
    document.documentElement.style.scrollBehavior = 'smooth';

    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080';

    fetch(`${apiUrl}/api/hello`)
      .then(response => response.json())
      .then(data => { setHelloMessage(data.message); setLoadingHello(false); })
      .catch(error => { setHelloMessage("Erreur API!"); setLoadingHello(false); });

    fetch(`${apiUrl}/api/tasks`)
      .then(response => response.json())
      .then(data => { setTasks(data); setLoadingTasks(false); })
      .catch(error => { setLoadingTasks(false); });
  }, []);

  return (
    <div style={{ fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif', backgroundColor: '#f3f4f7', minHeight: '100vh', margin: '-8px' }}>
      
      {/* 1. La Barre de Navigation (Navbar) */}
      <nav style={{ backgroundColor: '#151515', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Logo Red Hat */}
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/d/d8/Red_Hat_logo.svg" 
            alt="Red Hat Logo" 
            style={{ height: '40px' }} 
          />
          <h2 style={{ color: 'white', margin: 0, fontSize: '1.4rem', fontWeight: '500' }}>ANCE  App Test</h2>
        </div>
        
        {/* Le Lien (Bouton) elli yhezzek lil Tâches */}
        <a href="#section-taches" style={{ backgroundColor: '#EE0000', color: 'white', textDecoration: 'none', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold', fontSize: '1rem', transition: '0.3s' }}>
          Voir les Tâches ↓
        </a>
      </nav>

      {/* 2. Le Contenu Principal */}
      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ color: '#151515', fontSize: '2.5rem', marginBottom: '10px' }}>Application 3 Tiers</h1>
          <p style={{ color: '#555', fontSize: '1.2rem', marginTop: 0 }}>Frontend React | API Spring Boot | MariaDB</p>
        </div>

        {/* Boîte de l'API Hello */}
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '50px' }}>
          <h3 style={{ color: '#151515', borderBottom: '3px solid #EE0000', paddingBottom: '10px', marginTop: 0, display: 'inline-block' }}>
            Statut du Backend
          </h3>
          <div style={{ marginTop: '20px' }}>
            {loadingHello ? (
              <p style={{ color: '#888' }}>⏳ Chargement de la connexion...</p>
            ) : (
              <div style={{ backgroundColor: '#e6f4ea', padding: '15px 20px', borderRadius: '8px', color: '#137333', fontWeight: 'bold', fontSize: '1.1rem', border: '1px solid #ceead6' }}>
                ✅ {helloMessage}
              </div>
            )}
          </div>
        </div>

        {/* Boîte des Tâches (B l'ID section-taches bech l'bouton yjiblek l'houni) */}
        <div id="section-taches" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '50px' }}>
          <h3 style={{ color: '#151515', borderBottom: '3px solid #EE0000', paddingBottom: '10px', marginTop: 0, display: 'inline-block' }}>
            Données depuis MariaDB
          </h3>
          <div style={{ marginTop: '20px' }}>
            {loadingTasks ? (
              <p style={{ color: '#888' }}>⏳ Chargement des tâches...</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {tasks.length > 0 ? tasks.map(task => (
                  <div key={task.id} style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f8f9fa', borderLeft: '5px solid #EE0000', padding: '15px 20px', borderRadius: '6px' }}>
                    <span style={{ backgroundColor: '#151515', color: 'white', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '20px', fontWeight: 'bold', fontSize: '1.1rem' }}>
                      {task.id}
                    </span>
                    <span style={{ fontSize: '1.15rem', color: '#333', fontWeight: '500' }}>
                      {task.title}
                    </span>
                  </div>
                )) : (
                  <p style={{ color: '#888' }}>La base de données est vide.</p>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;