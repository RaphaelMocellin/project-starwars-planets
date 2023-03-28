import React, { useState, useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Filters() {
  const SWContext = useContext(StarWarsContext);
  const { nameFilter,
    setNameFilter,
    columnsArray,
    numericFilter,
    setNumericFilter } = SWContext;

  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);

  const onClickHandler = () => {
    const newNumericFilter = {
      columnFilter,
      comparisonFilter,
      valueFilter,
    };
    setNumericFilter([...numericFilter, newNumericFilter]);
  };

  useEffect(() => {
    setColumnFilter(columnsArray[0]);
  }, [columnsArray]);

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
          {
            columnsArray.map((col) => (
              <option key={ col } value={ col }>{ col }</option>
            ))
          }
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
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
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
        data-testid="button-filter"
      >
        Filtrar

      </button>
    </div>
  );
}

export default Filters;
