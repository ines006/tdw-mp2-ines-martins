import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchDogByIdQuery, useFetchCatByIdQuery } from '../store';
import styled from 'styled-components';

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


const Detail = () => {

  const navigate = useNavigate();

  const { id, category } = useParams(); // Obtém categoria e id da URL

  // Decide qual API usar com base na categoria
  const { data: dog, isLoading: isLoadingDog } = useFetchDogByIdQuery(id, { skip: category !== 'dogs' });
  const { data: cat, isLoading: isLoadingCat } = useFetchCatByIdQuery(id, { skip: category !== 'cats' });

  const isLoading = category === 'dogs' ? isLoadingDog : isLoadingCat;
  const animal = category === 'dogs' ? dog : cat;

  if (isLoading) return <LoadingContainer>Loading...</LoadingContainer>;


  if (!animal || !animal.breeds || animal.breeds.length === 0) return <p>No details available.</p>;

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
    </DetailContainer>
  );
};

export default Detail;
