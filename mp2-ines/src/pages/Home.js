import React, { useState } from 'react';
import Filter from '../components/Filter';
import Search from '../components/Search';
import List from '../components/List';
import styled from 'styled-components';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;


const Home = () => {

  const [searchTerm, setSearchTerm] = useState(""); // var de estado do termo pesquisado

  // função que atualiza a pesquisa (trigger compomente Search)
  const handleSearch = (term) => {
    setSearchTerm(term); 
  };

  return (
    <HomeContainer>
      <Filter />
      <Search onSearchChange={handleSearch} />
      <List searchTerm={searchTerm} />
    </HomeContainer>
  );
};

export default Home;
