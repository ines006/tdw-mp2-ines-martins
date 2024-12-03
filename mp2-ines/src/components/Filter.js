import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: ${({ active }) => (active ? '#003366' : '#f4f4f4')};
  color: ${({ active }) => (active ? 'white' : '#333')};
  border: 1px solid #666666;
  border-radius: 0;
  transition: background-color 0.3s;

  &:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  &:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  &:hover {
    background-color: ${({ active }) => (active ? '' : '#dbd9d9')};
    cursor: pointer;
  }
`;

const Filter = ({ onCategoryChange, activeCategory }) => {
  const categories = ["dogs", "cats"];

  return (
    <FilterContainer>
      {categories.map(category => (
        <FilterButton
          key={category}
          active={activeCategory === category}
          onClick={() => onCategoryChange(category)}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)} 
        </FilterButton>
      ))}
    </FilterContainer>
  );
};

Filter.propTypes = {
  onCategoryChange: PropTypes.func.isRequired, 
  activeCategory: PropTypes.string.isRequired, 
};

export default Filter;
