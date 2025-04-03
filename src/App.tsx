import React, { useState, useEffect } from "react";
import { plantasFiltradas } from "./importarDatos";  // Asegúrate de importar las plantas
import { continentes } from "./importarDatos"; // Asegúrate de importar los continentes

const App = () => {
  const [plantasConContinente, setPlantasConContinente] = useState<any[]>([]);  // Estado para plantas con continente
  const [continenteSeleccionado, setContinenteSeleccionado] = useState("");  // Estado para continente seleccionado

  // Función para obtener el continente según el nombre de la planta
  const obtenerContinente = (nombre: string) => {
    for (let continente of continentes) {
      if (nombre.toLowerCase().includes(continente.nombre_continente.toLowerCase())) {
        return continente.nombre_continente;  // Retorna el continente si hay coincidencia
      }
    }
    return "Desconocido";  // Si no hay coincidencia, retorna "Desconocido"
  };

  // Filtrar las plantas y asignar el continente
  useEffect(() => {
    const plantasConContinenteData = plantasFiltradas.map((planta) => {
      const continente = obtenerContinente(planta.nom_cas);  // Usamos el nombre común de la planta
      return { ...planta, continente };  // Añadimos el continente a cada planta
    });

    setPlantasConContinente(plantasConContinenteData);  // Guardamos las plantas con continente
  }, []);

  // Filtrar las plantas según el continente seleccionado
  const plantasFiltradasPorContinente = continenteSeleccionado
    ? plantasConContinente.filter(
        (planta) => planta.continente === continenteSeleccionado
      )
    : plantasConContinente;

  // Eliminar duplicados por especie_id (evitar que las plantas se repitan)
  const plantasUnicas = Array.from(
    new Map(plantasFiltradasPorContinente.map((planta) => [planta.especie_id, planta])).values()
  );

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
        {plantasUnicas.map((planta) => (
          <div key={planta.especie_id} className="cuadro">
            <h2>{planta.nom_cas}</h2>
            <h3>Continente: {planta.continente}</h3>
            <p>{planta.desc_cas}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;



// Link de donde saco la lista JSON
// https://opendata-ajuntament.barcelona.cat/data/ca/dataset/atles-biodiversitat-flora-especies