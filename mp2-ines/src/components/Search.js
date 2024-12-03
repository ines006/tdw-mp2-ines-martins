import React, { useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 300px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const SearchButton = styled.button`
  margin-left: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #003366;
  color: white;
  font-size: 16px;

  &:hover {
    background-color: #012952;
  }
`;

const ClearButton = styled(SearchButton)`
  background-color: #bdc3c7;

  &:hover {
    background-color: #95a5a6;
  }
`;

const Search = ({ onSearchChange }) => {
  const [inputValue, setInputValue] = useState(""); // var de estado local para o valor do campo de pesquisa

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Atualiza o estado local com o valor digitado
  };

  const handleSearch = () => {
    onSearchChange(inputValue); // Atualiza o estado pai com o valor do input
  };

  const handleClear = () => {
    setInputValue(""); // Limpa o campo de pesquisa
    onSearchChange(""); // Faz reset ao estado da pesquisa na Home
  };

  return (

    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search for a breed..."
        value={inputValue}
        onChange={handleInputChange}
      />
      <SearchButton onClick={handleSearch}>Search</SearchButton>
      {inputValue && <ClearButton onClick={handleClear}>Clean</ClearButton>} {/* Exibe o botão "Limpar" quando há um termo de pesquisa */}
    </SearchContainer>
    
  );
};

export default Search;
