import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchDogByIdQuery, useFetchCatByIdQuery } from '../store';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons'; // Ícone preenchido
import { faHeart as RegularHeart } from '@fortawesome/free-regular-svg-icons'; // Ícone contorno


const DetailContainer = styled.div`
  display: flex;
  justify-content: center; 
  align-items: flex-start;
  height: auto; 
  padding: 20px;
  box-sizing: border-box;
  padding-top: 100px;
  max-width: 1000px; 
  margin: 0 auto; 
`;

const ImageSection = styled.div`
  img {
    border-radius: 10px;
    width: 300px; 
    height: 300px; 
    object-fit: cover; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    margin-right: 30px; 
  }
`;

const TextSection = styled.div`
  text-align: left;
  max-width: 600px; 
  height: auto;
  overflow: hidden; 
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  h3 {
    margin-bottom: 10px;
    font-size: 28px;
    max-width: 100%;
    word-wrap: break-word; 
  }

  p {
    margin: 5px 0;
    font-size: 18px; 
    color: #555;
    line-height: 1.5; 
    max-height: 150px; 
    overflow: auto; 
  }

  button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #003366;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 150px;

    &:hover {
      background-color: #012952;
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 300px; 
  font-size: 24px;
  color: #333;
  font-weight: bold;
`;

const HeartButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 36px;
  color: #003366; 
  transition: color 0.3s;
`;

const NoDetailsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 400px; 
  font-size: 24px;
  color: #333;
  text-align: center;
  width: 100%;
`;


const Detail = () => {

  const navigate = useNavigate();

  const { id, category } = useParams(); // Obtém categoria e id da URL

  // Decide qual API usar com base na categoria
  const { data: dog, isLoading: isLoadingDog } = useFetchDogByIdQuery(id, { skip: category !== 'dogs' });
  const { data: cat, isLoading: isLoadingCat } = useFetchCatByIdQuery(id, { skip: category !== 'cats' });

  const isLoading = category === 'dogs' ? isLoadingDog : isLoadingCat;
  const animal = category === 'dogs' ? dog : cat;

// Estado para favoritos (recupera do LocalStorage)
const [favorites, setFavorites] = React.useState(() => {
  const storedFavorites = localStorage.getItem('favorites');
  return storedFavorites ? JSON.parse(storedFavorites) : [];
});

// Verifica se o animal está nos favoritos
const isFavorite = favorites.some(fav => fav.id === id && fav.category === category);

// Adiciona ou remove o animal dos favoritos
const handleFavoriteToggle = () => {
  let updatedFavorites;
  if (isFavorite) {
    updatedFavorites = favorites.filter(fav => !(fav.id === id && fav.category === category));
  } else {
    updatedFavorites = [...favorites, { id, category, url: animal.url, breeds: animal.breeds }];
  }
  setFavorites(updatedFavorites);
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Sincroniza com LocalStorage
};

  if (isLoading) return <LoadingContainer>Loading...</LoadingContainer>;


  if (!animal || !animal.breeds || animal.breeds.length === 0) return <NoDetailsContainer>No details available</NoDetailsContainer>;

  const breedDetails = animal.breeds[0];

  return (
    <DetailContainer>
      <ImageSection>
        {animal.url && <img src={animal.url} alt={breedDetails.name} />}
      </ImageSection>

      <TextSection>
        <h3>{breedDetails.name}</h3>
        <p><strong>Description: </strong>{category === 'dogs' ? breedDetails.bred_for : breedDetails.description}</p>
        <p><strong>Traits: </strong>{breedDetails.temperament}</p>
        <p><strong>Life span: </strong>{breedDetails.life_span}</p>
        <button onClick={() => navigate(-1)}>Back</button>
      </TextSection>

      <HeartButton onClick={handleFavoriteToggle}>
        <FontAwesomeIcon icon={isFavorite ? SolidHeart : RegularHeart} />
      </HeartButton>   
    </DetailContainer>
  );
};

export default Detail;
