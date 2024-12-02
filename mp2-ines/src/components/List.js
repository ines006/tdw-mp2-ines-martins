import React, { useState, useEffect } from 'react';
import { useFetchDogsQuery, useFetchCatsQuery } from '../store';
import { useNavigate } from 'react-router-dom';

const List = ({ selectedCategory }) => {
  const navigate = useNavigate();

  const [pageDogs, setPageDogs] = useState(() => {
    return parseInt(localStorage.getItem('pageDogs')) || 1;
  });
  const [pageCats, setPageCats] = useState(() => {
    return parseInt(localStorage.getItem('pageCats')) || 1;
  });

  useEffect(() => {
    localStorage.setItem('pageDogs', pageDogs);
  }, [pageDogs]);

  useEffect(() => {
    localStorage.setItem('pageCats', pageCats);
  }, [pageCats]);

  const { data: dogs, isLoading: isLoadingDogs } = useFetchDogsQuery({ limit: 15, page: pageDogs, order: 'asc' }); // Busque mais itens
  const { data: cats, isLoading: isLoadingCats } = useFetchCatsQuery({ limit: 25, page: pageCats, order: 'asc' }); // Busque mais itens

  const isLoading = selectedCategory === 'dogs' ? isLoadingDogs : isLoadingCats;
  const data = selectedCategory === 'dogs' ? dogs : cats;

  const totalPages = 10;

  const groupByBreedAndFill = (animals, desiredCount) => {
    const breedMap = {};
    const groupedAnimals = [];

    // Agrupar por raça
    animals.forEach((animal) => {
      if (animal.breeds && animal.breeds.length > 0) {
        const breedName = animal.breeds[0].name;
        if (!breedMap[breedName]) {
          breedMap[breedName] = animal;
          groupedAnimals.push(animal);
        }
      }
    });

    // Caso não tenha raças suficientes, preencha com raças repetidas
    while (groupedAnimals.length < desiredCount) {
      for (const animal of Object.values(breedMap)) {
        if (groupedAnimals.length < desiredCount) {
          groupedAnimals.push(animal); // Reutilizar as raças já agrupadas
        } else {
          break;
        }
      }
    }

    return groupedAnimals.slice(0, desiredCount); // Retornar exatamente o número desejado de itens
  };

  const groupedAnimals = data ? groupByBreedAndFill(data, 5) : []; // Garantir 5 itens na página atual

  const handlePageChange = (page) => {
    if (selectedCategory === 'dogs') {
      setPageDogs(page);
    } else {
      setPageCats(page);
    }
  };

  const currentPage = selectedCategory === 'dogs' ? pageDogs : pageCats;

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2>{selectedCategory === 'dogs' ? 'Dogs' : 'Cats'}</h2>
      <div>
        {groupedAnimals.map((animal, index) => (
          <div
            key={index}
            onClick={() => navigate(`/detail/${selectedCategory}/${animal.id}`)}
          >
            <img src={animal.url} alt={animal.breeds[0]?.name || "Unknown Breed"} width="200" />
            <p>{animal.breeds[0]?.name || "Unknown Breed"}</p>
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
