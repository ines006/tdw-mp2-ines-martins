import React from 'react';

const Filter = ({ onCategoryChange }) => {
  return (
    <div>
      <button onClick={() => onCategoryChange("dogs")}>Dogs</button>
      <button onClick={() => onCategoryChange("cats")}>Cats</button>
    </div>
  );
};

export default Filter;
