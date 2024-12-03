import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchDogByIdQuery, useFetchCatByIdQuery } from '../store';

const Detail = () => {

  const navigate = useNavigate();

  const { id, category } = useParams(); // Obtém categoria e id da URL

  // Decide qual API usar com base na categoria
  const { data: dog, isLoading: isLoadingDog } = useFetchDogByIdQuery(id, { skip: category !== 'dogs' });
  const { data: cat, isLoading: isLoadingCat } = useFetchCatByIdQuery(id, { skip: category !== 'cats' });

  const isLoading = category === 'dogs' ? isLoadingDog : isLoadingCat;
  const animal = category === 'dogs' ? dog : cat;

  if (isLoading) return <p>Loading...</p>;

  if (!animal || !animal.breeds || animal.breeds.length === 0) return <p>No details available.</p>;

  const breedDetails = animal.breeds[0];

  return (
    <div>
      <h3>{breedDetails.name}</h3>
      <p>{category === 'dogs' ? breedDetails.bred_for : breedDetails.description}</p>
      <p>{breedDetails.temperament}</p>
      <p>{breedDetails.life_span}</p>

      {animal.url && <img src={animal.url} alt={breedDetails.name} width="300" />}

      <button onClick={() => navigate(-1)}>Voltar</button>
    </div>
  );
};

export default Detail;
