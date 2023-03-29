import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

export default function StarWarsProvider({ children }) {
  const initialColumns = ['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water'];

  const [planets, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [columnsArray, setColumnsArray] = useState(initialColumns);
  const [numericFilter, setNumericFilter] = useState([]);
  const [sort, setSort] = useState({ order: { column: '', sort: '' } });
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    const numericColumns = numericFilter.map((f) => f.columnFilter);
    // console.log(numericColumns);
    setColumnsArray(columnsArray.filter((c) => !numericColumns.includes(c)));
  }, [numericFilter]);

  const globalState = {
    planets,
    setPlanets,
    nameFilter,
    setNameFilter,
    columnsArray,
    setColumnsArray,
    numericFilter,
    setNumericFilter,
    sort,
    setSort,
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
