import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get("https://dogapi.dog/api/v2/breeds");
        setBreeds(response.data.data); // API retorna os dados no campo "data"
      } catch (err) {
        setError("Erro ao carregar dados!");
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Raças de Cães</h1>
      <ul>
        {breeds.map((breed) => (
          <li key={breed.id}>
            <strong>{breed.attributes.name}</strong>
            <p>{breed.attributes.description || "Sem descrição disponível."}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
