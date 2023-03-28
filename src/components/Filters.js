import React, { useState, useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Filters() {
  const [columnFilter, setColumnFilter] = useState('');
  const [comparisonFilter, setComparisonFilter] = useState('');
  const [valueFilter, setValueFilter] = useState('');

  const SWContext = useContext(StarWarsContext);
  const { nameFilter, setNameFilter, numericFilter, setNumericFilter } = SWContext;

  const onClickHandler = () => {
    const newNumericFilter = {
      columnFilter,
      comparisonFilter,
      valueFilter,
    };
    setNumericFilter([...numericFilter, newNumericFilter]);
  };

  return (
    <div>
      <label htmlFor="nameFilter">
        Name Filter:
        <input
          id="nameFilter"
          type="text"
          name="nameFilter"
          value={ nameFilter }
          onChange={ (e) => setNameFilter(e.target.value) }
          data-testid="name-filter"
        />
      </label>
      <label htmlFor="columnFilter">
        Coluna:
        <select
          id="columnFilter"
          name="columnFilter"
          value={ columnFilter }
          onChange={ (e) => setColumnFilter(e.target.value) }
          data-testid="column-filter"
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="comparisonFilter">
        Operador:
        <select
          id="comparisonFilter"
          name="comparisonFilter"
          value={ comparisonFilter }
          onChange={ (e) => setComparisonFilter(e.target.value) }
          data-testid="comparison-filter"
        >
          <option value=">">maior que</option>
          <option value="<">menor que</option>
          <option value="=">igual a</option>
        </select>
      </label>
      <label htmlFor="valueFilter">
        value:
        <input
          id="valueFilter"
          type="number"
          name="valueFilter"
          value={ valueFilter }
          onChange={ (e) => setValueFilter(e.target.value) }
          data-testid="value-filter"
        />
      </label>
      <button
        type="button"
        onClick={ onClickHandler }
      >
        Filtrar

      </button>
    </div>
  );
}

export default Filters;
