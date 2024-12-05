import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

// Criação do Contexto
export const CategoryContext = createContext();

// Provedor do Contexto
export const CategoryContextProvider = ({ children }) => {
  
  // var de estado da categoria selecionada 
  const [category, setCategory] = useState("dogs");

  
  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

CategoryContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};