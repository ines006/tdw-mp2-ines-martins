import React, { useState, useEffect, useContext  } from 'react';
import { useFetchDogsQuery, useFetchCatsQuery } from '../store';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types'; 
import { CategoryContext } from "../contexts/CategoryContext";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin: 40px 0; 
  padding: 0 20px; 
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
  transition: transform 0.2s ease-in-out;
  height: 300px;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 250px; 
    object-fit: cover;
    border-radius: 8px;
  }

  h3 {
    font-size: 18px;
    color: #333;
    margin: 15px 0 5px;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
`;

const PageButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: ${({ active }) => (active ? '#3498db' : '#bdc3c7')};
  color: white;
  font-size: 14px;
  font-weight: bold;

  &:hover {
    background-color: #95a5a6;
  }

  &:disabled {
    background-color: #003366;
    cursor: not-allowed;
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

const NoResultsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 300px; 
  font-size: 20px;
  color: #333;
`;


const List = ({ searchTerm }) => {
  const navigate = useNavigate();

  const { category } = useContext(CategoryContext);

  const totalPages = 10; // definido manualmente

  // Estados de paginação guardados no localStorage
  const [pageDogs, setPageDogs] = useState(() => {
    return parseInt(localStorage.getItem('pageDogs')) || 1;
  });
  const [pageCats, setPageCats] = useState(() => {
    return parseInt(localStorage.getItem('pageCats')) || 1;
  });

  // estado de controlo de loading manual
  const [loadingPageChange, setLoadingPageChange] = useState(false); 

  // Sincronizar páginas com o localStorage
  useEffect(() => {
    localStorage.setItem('pageDogs', pageDogs);
  }, [pageDogs]);

  useEffect(() => {
    localStorage.setItem('pageCats', pageCats);
  }, [pageCats]);

  const currentPage = category === 'dogs' ? pageDogs : pageCats;


  // Fetch de dados
  const {
    data: dogs,
    isLoading: isLoadingDogs,
    isError: isErrorDogs,
    error: errorDogs,
  } = useFetchDogsQuery({ limit: 15, page: pageDogs, order: 'asc' });

  const {
    data: cats,
    isLoading: isLoadingCats,
    isError: isErrorCats,
    error: errorCats,
  } = useFetchCatsQuery({ limit: 50, page: pageCats, order: 'asc' });

  // Determinar estados de carregamento e erro
  const isLoading = category === 'dogs' ? isLoadingDogs : isLoadingCats;
  const isError = category === 'dogs' ? isErrorDogs : isErrorCats;
  const error = category === 'dogs' ? errorDogs : errorCats;
  const data = category === 'dogs' ? dogs : cats;

  // função que agrupa os dados por raças (raça e imagens únicas)
  const groupByBreedAndFill = (animals, desiredCount) => {
    const breedMap = {};
    const groupedAnimals = [];

    animals.forEach((animal) => {
      if (animal.breeds && animal.breeds.length > 0) {
        const breedName = animal.breeds[0].name;
        if (!breedMap[breedName]) {
          breedMap[breedName] = animal;
          groupedAnimals.push(animal);
        }
      }
    });

    // Preenche com raças repetidas se não houver dados suficientes
    // while (groupedAnimals.length < desiredCount) {
    //   for (const animal of Object.values(breedMap)) {
    //     if (groupedAnimals.length < desiredCount) {
    //       groupedAnimals.push(animal);
    //     } else {
    //       break;
    //     }
    //   }
    // }

    return groupedAnimals.slice(0, desiredCount);
  };

  // função que filtra os dados pelo termo pesquisado
  const filterData = (data, searchTerm) => {
    return data.filter((animal) => {
      if (!animal.breeds || animal.breeds.length === 0) return false;
      const breedName = animal.breeds[0]?.name.toLowerCase();
      return breedName.startsWith(searchTerm.toLowerCase());
    });
  };

  const filteredAnimals = searchTerm ? filterData(data, searchTerm) : data;
  const groupedAnimals = filteredAnimals ? groupByBreedAndFill(filteredAnimals, 6) : [];


  // função de manipulação de páginas conforme a categoria 
  const handlePageChange = (page) => {
    setLoadingPageChange(true);
    if (category === 'dogs') {
      setPageDogs(page);
    } else {
      setPageCats(page);
    }
  };

  // Lógica de loading entre categorias e entre páginas
  useEffect(() => {
    if (!isLoading && loadingPageChange) {
      setLoadingPageChange(false);
    }
  }, [isLoading, loadingPageChange]);


  // Exibir erro (caso haja)
  if (isError) {
    return (
      <div>
        <p>Error: {error.message || 'Something went wrong while fetching data.'}</p>
      </div>
    );
  }

  // Exibir carregamento enquanto os dados são procurados ou entre a troca de páginas
  if (isLoading || loadingPageChange) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  // Exibir mensagem caso não haja resultados para o termo de pesquisa
  if (searchTerm && groupedAnimals.length === 0) {
    return <NoResultsContainer>No results found for "{searchTerm}"</NoResultsContainer>;
  }

  return (
    <>
      <GridContainer>
        {groupedAnimals.map((animal, index) => (
          <Card
            key={index}
            onClick={() => navigate(`/detail/${category}/${animal.id}`)}
          >
            <img
              src={animal.url}
              alt={animal.breeds[0]?.name || 'Unknown Breed'}
            />
            <h3>{animal.breeds[0]?.name || 'Unknown Breed'}</h3>
          </Card>
        ))}
      </GridContainer>
  
      <PaginationContainer>
        <PageButton
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </PageButton>
  
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <PageButton
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={currentPage === page}
              active={currentPage === page}
            >
              {page}
            </PageButton>
          );
        })}
  
        <PageButton
          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </PageButton>
      </PaginationContainer>
    </>
  );
  
};

List.propTypes = {
  searchTerm: PropTypes.string, 
};

export default List;
