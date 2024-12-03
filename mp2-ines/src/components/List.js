import React, { useState, useEffect } from 'react';
import { useFetchDogsQuery, useFetchCatsQuery } from '../store';
import { useNavigate } from 'react-router-dom';

const List = ({ selectedCategory, searchTerm }) => {
  const navigate = useNavigate();

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

  const currentPage = selectedCategory === 'dogs' ? pageDogs : pageCats;


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
  const isLoading = selectedCategory === 'dogs' ? isLoadingDogs : isLoadingCats;
  const isError = selectedCategory === 'dogs' ? isErrorDogs : isErrorCats;
  const error = selectedCategory === 'dogs' ? errorDogs : errorCats;
  const data = selectedCategory === 'dogs' ? dogs : cats;

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
    while (groupedAnimals.length < desiredCount) {
      for (const animal of Object.values(breedMap)) {
        if (groupedAnimals.length < desiredCount) {
          groupedAnimals.push(animal);
        } else {
          break;
        }
      }
    }

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
    if (selectedCategory === 'dogs') {
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
    return <p>Loading...</p>;
  }

  // Exibir mensagem caso não haja resultados para o termo de pesquisa
  if (searchTerm && groupedAnimals.length === 0) {
    return <p>No results found for "{searchTerm}"</p>;
  }

  return (
    <div>
      <div>
        {groupedAnimals.map((animal, index) => (
          <div
            key={index}
            onClick={() => navigate(`/detail/${selectedCategory}/${animal.id}`)}
          >
            <img src={animal.url} alt={animal.breeds[0]?.name || 'Unknown Breed'} width="200" />
            <p>{animal.breeds[0]?.name || 'Unknown Breed'}</p>
          </div>
        ))}
      </div>

      <div>
        <button
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={currentPage === page}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default List;
