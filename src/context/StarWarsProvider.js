import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

export default function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [numericFilter, setNumericFilter] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  const globalState = {
    planets,
    setPlanets,
    nameFilter,
    setNameFilter,
    numericFilter,
    setNumericFilter,
    filteredPlanets,
    setFilteredPlanets,
  };

  return (
    <StarWarsContext.Provider value={ globalState }>
      <div>
        { children }
      </div>
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
