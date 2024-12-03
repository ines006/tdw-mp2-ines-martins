import React, { useState } from 'react';

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
    <div>
      <input
        type="text"
        placeholder="Search for a breed..."
        value={inputValue} 
        onChange={handleInputChange} 
      />
      <button onClick={handleSearch}>Pesquisar</button>
      {inputValue && <button onClick={handleClear}>Limpar</button>} {/* Exibe o botão "Limpar" quando há um termo de pesquisa */}
    </div>
  );
};

export default Search;
