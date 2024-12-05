import React, { createContext, useState } from "react";

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
