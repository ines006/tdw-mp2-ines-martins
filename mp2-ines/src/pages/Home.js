import React, { useState, useEffect } from 'react';
import Filter from '../components/Filter';
import Search from '../components/Search';
import List from '../components/List';

const Home = () => {

  const [searchTerm, setSearchTerm] = useState(""); // var de estado do termo pesquisado

  // var de estado da categoria selecionada (guardado também em localStorage)
  const [category, setCategory] = useState(() => {
    return localStorage.getItem('category') || "dogs"; 
  });

  // Sincronizar estado com localStorage
  useEffect(() => {
    localStorage.setItem('category', category);
  }, [category]);

  // função que atualiza a categoria (trigger compomente Filter)
  const handleCategory = (newCategory) => {
    setCategory(newCategory);
  };

  // função que atualiza a pesquisa (trigger compomente Search)
  const handleSearch = (term) => {
    setSearchTerm(term); 
  };

  return (
    <div>
      <Filter onCategoryChange={handleCategory} />
      <Search onSearchChange={handleSearch} />
      <List selectedCategory={category} searchTerm={searchTerm} />
    </div>
  );
};

export default Home;
