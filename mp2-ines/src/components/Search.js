import React, { useState } from 'react';

const Search = ({ onSearchChange }) => {
  const [inputValue, setInputValue] = useState(""); // Estado local para o valor do campo de pesquisa

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Atualiza o estado local com o valor digitado
  };

  const handleSearch = () => {
    onSearchChange(inputValue); // Atualiza o estado pai com o valor do input
  };

  const handleClear = () => {
    setInputValue(""); // Limpa o campo de pesquisa
    onSearchChange(""); // Reseta o estado da pesquisa na Home
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={inputValue} // Define o valor do campo de entrada como o estado local
        onChange={handleInputChange} // Atualiza o estado local quando o valor muda
      />
      <button onClick={handleSearch}>Pesquisar</button>
      {inputValue && <button onClick={handleClear}>Limpar</button>} {/* Exibe o botão "Limpar" quando há um termo de pesquisa */}
    </div>
  );
};

export default Search;
