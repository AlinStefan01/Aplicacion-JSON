import React, { useState, useEffect } from "react";
import { plantasFiltradas, continentes } from "./importarDatos"; // Asegúrate de importar las plantas
import Ajv from "ajv";
import schema from "./plantas.schema.json";

const ajv = new Ajv();
const validate = ajv.compile(schema);

const App = () => {
  const [plantasConContinente, setPlantasConContinente] = useState<any[]>([]);  // Utilizamos 'any' para poder manejar el continente dinámicamente
  const [continenteSeleccionado, setContinenteSeleccionado] = useState("");
  const [validPlantas, setValidPlantas] = useState<any[]>([]);  // Usamos 'any' también para plantas válidas

  // Función para obtener el continente basado en el nombre de la planta
  const obtenerContinente = (nombre: string) => {
    for (let continente of continentes) {
      if (nombre.toLowerCase().includes(continente.nombre_continente.toLowerCase())) {
        return continente.nombre_continente;
      }
    }
    return ""; // Si no se encuentra el continente, devolver vacío
  };

  useEffect(() => {
    if (!Array.isArray(plantasFiltradas)) {
      console.error("Error: plantasFiltradas no es un array válido.");
      return;
    }

    const validPlantasData = plantasFiltradas
      .map((planta) => {
        // Asignar continente si el nombre de la planta contiene el nombre de un continente
        const continente = obtenerContinente(planta.nom_cas); // Obtiene el continente del nombre
        const plantaConContinente = { ...planta, continente };

        // Validar planta
        const valid = validate(plantaConContinente);
        if (valid) {
          console.log("Planta válida:", plantaConContinente);
          return plantaConContinente; // Retorna la planta si es válida
        } else {
          console.error("Planta no válida:", plantaConContinente, validate.errors);
          return null; // Si no es válida, retorna null
        }
      })
      .filter((planta) => planta !== null); // Eliminar las plantas no válidas

    setValidPlantas(validPlantasData);
  }, []); // Solo se ejecuta una vez al montar el componente

  // Filtrar plantas por continente seleccionado (si es que se ha seleccionado uno)
  const plantasFiltradasPorContinente = continenteSeleccionado
    ? validPlantas.filter((planta) =>
        planta.continente.toLowerCase() === continenteSeleccionado.toLowerCase()
      )
    : validPlantas;

  return (
    <div>
      <h1>Buscador de Plantas por Continente</h1>
      <label>Selecciona un continente: </label>
      <select
        onChange={(e) => setContinenteSeleccionado(e.target.value)}
        value={continenteSeleccionado}
      >
        <option value="">Todos</option>
        {continentes.map((continente) => (
          <option key={continente.id_continente} value={continente.nombre_continente}>
            {continente.nombre_continente}
          </option>
        ))}
      </select>

      <div className="contenedor">
        {plantasFiltradasPorContinente.length > 0 ? (
          plantasFiltradasPorContinente.map((planta) => (
            <div key={planta.especie_id} className="cuadro">
              <h2>{planta.nom_cas}</h2>
              <h3>Continente: {planta.continente || "Desconocido"}</h3>
              <p>{planta.desc_cas || "Descripción no disponible"}</p>
            </div>
          ))
        ) : (
          <p>No hay plantas disponibles.</p>
        )}
      </div>
    </div>
  );
};


export default App;




// Link de donde saco la lista JSON
// https://opendata-ajuntament.barcelona.cat/data/ca/dataset/atles-biodiversitat-flora-especies