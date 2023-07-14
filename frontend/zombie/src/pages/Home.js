import React from 'react'
import { Link } from 'react-router-dom';
import "./Home.css" 

function Home() {
  return (
<div className="container">
  <header>
    <h1>ZombieGuide</h1>
    <p>Tu guía definitiva de supervivencia en un apocalipsis zombie</p>
  </header>
  <main>
    <section className="section">
      <h2>Acerca de la Guía de Zombies</h2>
      <p>
        La Guía de Zombies es tu recurso principal para sobrevivir a un apocalipsis zombie. Ya seas un sobreviviente experimentado o un principiante, te cubrimos con consejos valiosos, estrategias y conocimientos esenciales para ayudarte a mantenerte con vida frente a los no muertos.
      </p>
    </section>
    <section className="section">
      <h2>Características</h2>
      <ul>
        <li>Plan integral de preparación para un brote zombie</li>
        <li>Estrategias de supervivencia para diferentes tipos de zombies</li>
        <li>Recomendaciones de armas y técnicas de autodefensa</li>
        <li>Guía para encontrar refugio y asegurarlo contra ataques de zombies</li>
        <li>Obtención de alimentos y agua en un mundo postapocalíptico</li>
        <li>Métodos de comunicación con otros sobrevivientes</li>
      </ul>
    </section>
    <section className="section">
      <h2>Empezar</h2>
      <p>
        ¡No esperes hasta que sea demasiado tarde! Equipate con el conocimiento y las habilidades para sobrevivir. Regístrate ahora en nuestra Guía de Zombies y prepárate para el levantamiento de los no muertos.
      </p>
      <button className="cta-button">
  <Link to="/register">Regístrate ahora</Link>
</button>
    </section>
  </main>
      <footer>
        <p>&copy; 2023 Zombie Guide. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Home;
