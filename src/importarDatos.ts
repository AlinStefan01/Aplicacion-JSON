import plantica from "./dades.json";
import continentesData from "./dades_continent.json";

// Definir el tipo Planta
export type Planta = {
  especie_id: string;
  nom_ctf: string;
  nom_cat: string;
  nom_cas: string;
  nom_eng: string;
  desc_cat: string;
  desc_cas: string;
  desc_eng: string;
};

export type Continente = {
  id_continente: string;
  nombre_continente: string;
};

// Exportar los datos del JSON
export const plantas: Planta[] = plantica;
export const nombre_cast: string[] = plantica.map((p: Planta) => p.nom_cas);
export const especie_id: string[] = plantica.map((p: Planta) => p.especie_id);
export const continentes: Continente[] = continentesData; 


// Filtrar las plantas que tienen nombre científico, ID y nombre en castellano no vacíos
export const plantasFiltradas: Planta[] = plantica
  .filter((p: Planta) => p.nom_ctf !== "" && p.especie_id !== "" && p.nom_cas !== "")
  .sort((a: Planta, b: Planta) => {
    // Convertir especie_id a número y ordenar en orden ascendente
    return parseInt(a.especie_id, 10) - parseInt(b.especie_id, 10);
  })
