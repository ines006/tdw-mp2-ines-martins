import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "live_GqObdLXi8EyzPdE0T65HbhArhCtyQZ5StHU60KUp2iWs2uevtOgHY8WdI9ZA9vUh"; // Certifique-se de que a chave da API esteja correta

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await axios.get(
          "https://api.thedogapi.com/v1/images/search?limit=10",
          {
            headers: {
              "x-api-key": API_KEY,
            },
          }
        );
        setData(response.data);
      } catch (err) {
        setError("Erro ao carregar dados!");
      } finally {
        setLoading(false);
      }
    };

    fetchDogs();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Imagens de Cães e Raças</h1>
      <ul>
        {data.map((dog, index) => (
          <li key={index}>
            <img src={dog.url} alt={`Dog ${index + 1}`} style={{ width: "300px", height: "auto" }} />
            <p>
              {dog.breeds && dog.breeds.length > 0 
                ? dog.breeds[0].name
                : "Raça não disponível"}
            </p>
            <p>
              {dog.breeds && dog.breeds.length > 0
                ? dog.breeds[0].temperament
                : "Temperamento não disponível"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
