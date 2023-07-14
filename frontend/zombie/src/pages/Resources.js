
import React, { useState } from "react";
import "./Resources.css";

function Resources() {
  const [resources, setResources] = useState([]);
  const [materialName, setMaterialName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (materialName && quantity) {
      const newResource = {
        name: materialName,
        quantity: quantity
      };

      setResources([...resources, newResource]);
      setMaterialName("");
      setQuantity("");
    }
  };

  const handleRemove = (index) => {
    const updatedResources = [...resources];
    updatedResources.splice(index, 1);
    setResources(updatedResources);
  };

  return (
    <div>
      <header>
        <h1>Tus Recursos</h1>
      </header>

      <main>
        <section>
          <h2>Agregar Recursos</h2>

          <form onSubmit={handleSubmit}>
            <label htmlFor="material-name">Nombre:</label>
            <input
              type="text"
              id="material-name"
              name="material-name"
              value={materialName}
              onChange={(event) => setMaterialName(event.target.value)}
              required
            />

            <label htmlFor="quantity">Cantidad:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              required
            />

            <input type="submit" value="Crear" />
          </form>
        </section>

        <section>
          <h2>Getionar Recursos</h2>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((resource, index) => (
                <tr key={index}>
                  <td>{resource.name}</td>
                  <td>{resource.quantity}</td>
                  <td>
                    <button onClick={() => handleRemove(index)}>Remover</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      <footer>
        <p>&copy; 2023 Zombie Apocalypse Resources. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Resources;
/*
import "./Resources.css"
function Resources() {
  return (
    <div>
        <header>
            <h1>Tus Recursos</h1>
        </header>

        <main>
            <section>
            <h2>Agregar Recursos</h2>

            <form>
                <label for="material-name">Nombre:</label>
                <input type="text" id="material-name" name="material-name" required/>
                
                <label for="quantity">Cantidad:</label>
                <input type="number" id="quantity" name="quantity" required/>
                
                <input type="submit" value="Crear"/>
            </form>
            </section>

            <section>
            <h2>Getionar Recursos</h2>
            <table>
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Accion</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Tablones de Madera</td>
                    <td>10</td>
                    <td>
                    <button>Remover</button>
                    </td>
                </tr>
                <tr>
                    <td>Medicina</td>
                    <td>5</td>
                    <td>
                    <button>Remover</button>
                    </td>
                </tr>
                </tbody>
            </table>
            </section>
        </main>

        <footer>
            <p>&copy; 2023 Zombie Apocalypse Resources. All rights reserved.</p>
        </footer>
  </div>
    
    )
}
  
export default Resources
*/