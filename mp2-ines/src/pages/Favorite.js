import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; 

const FavContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #f8f8f8;
  min-height: 100vh;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin: 40px 0;
  width: 100%;
  max-width: 1200px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  text-align: center;
  height: 300px;
  max-width: 250px;  
  cursor: pointer; 

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
  }

  h3 {
    font-size: 18px;
    color: #333;
    margin: 15px 0 5px;
  }

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const Favorite = () => {
  const navigate = useNavigate(); 

  // Estado para animais favoritos
  const [favAnimals, setFavAnimals] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  return (
    <FavContainer>
      {favAnimals.length === 0 ? (
        <p>You don't have any favorites yet.</p>
      ) : (
        <GridContainer>
          {favAnimals.map((animal, index) => (
            <Card
              key={index}
              onClick={() =>
                navigate(`/detail/${animal.category}/${animal.id}`)
              } 
            >
              <img
                src={animal.url}
                alt={animal.breeds[0]?.name || "Unknown Breed"}
              />
              <h3>{animal.breeds[0]?.name || "Unknown Breed"}</h3>
            </Card>
          ))}
        </GridContainer>
      )}
    </FavContainer>
  );
};

export default Favorite;
