function Resources() {
  return (
    <div>
        <header>
            <h1>Zombie Guide: Tus Recursos</h1>
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
                    <button>Editar</button>
                    <button>Remover</button>
                    </td>
                </tr>
                <tr>
                    <td>Medicina</td>
                    <td>5</td>
                    <td>
                    <button>Editar</button>
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
        
    <link rel ="stylesheet" type ="text/css" href ="./css/resources.css" />
  </div>
    
    )
}
  
export default Resources