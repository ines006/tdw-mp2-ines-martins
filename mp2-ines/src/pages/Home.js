import React, { useState, useEffect } from 'react';
import Filter from '../components/Filter';
import Search from '../components/Search';
import List from '../components/List';

const Home = () => {
  const [category, setCategory] = useState(() => {
    return localStorage.getItem('category') || "dogs"; // Recupera do localStorage ou usa "dogs" como padrão
  });
  const [searchTerm, setSearchTerm] = useState(""); // Estado do termo de pesquisa

  // Sincronizar estado com localStorage
  useEffect(() => {
    localStorage.setItem('category', category);
  }, [category]);

  const handleCategory = (newCategory) => {
    setCategory(newCategory);
  };

  const handleSearch = (term) => {
    setSearchTerm(term); // Atualiza o termo de pesquisa quando o usuário pesquisa
  };

  return (
    <div>
      {/* Passa os manipuladores de categoria e busca para o filtro */}
      <Filter onCategoryChange={handleCategory} />
      <Search onSearchChange={handleSearch} />
      
      {/* Passa categoria e termo de pesquisa para a lista */}
      <List selectedCategory={category} searchTerm={searchTerm} />
    </div>
  );
};

export default Home;
