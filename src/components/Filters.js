import React, { useState, useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Filters() {
  const SWContext = useContext(StarWarsContext);
  const { nameFilter,
    setNameFilter,
    columnsArray,
    numericFilter,
    setNumericFilter,
    setSort } = SWContext;

  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [orderColumn, setOrderColumn] = useState('population');
  const [order, setOrder] = useState('');

  const onClickHandler = () => {
    const newNumericFilter = {
      columnFilter,
      comparisonFilter,
      valueFilter,
    };
    setNumericFilter([...numericFilter, newNumericFilter]);
  };

  const onRemoveClick = (column) => {
    const newNumericFilter = numericFilter.filter((f) => f.columnFilter !== column);
    setNumericFilter(newNumericFilter);
  };

  const onRemoveAllClick = () => {
    setNumericFilter([]);
  };

  const onSortClick = () => {
    setSort({ order: { column: orderColumn, sort: order } });
  };

  useEffect(() => {
    setColumnFilter(columnsArray[0]);
  }, [columnsArray]);

  return (
    <div>
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
        <label htmlFor="orderColumn">
          Ordenar:
          <select
            id="orderColumn"
            name="orderColumn"
            value={ orderColumn }
            onChange={ (e) => setOrderColumn(e.target.value) }
            data-testid="column-sort"
          >

            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>

          </select>
        </label>
        <label htmlFor="asc">
          ASC:
          <input
            id="asc"
            type="radio"
            name="order"
            value="ASC"
            onChange={ (e) => setOrder(e.target.value) }
            data-testid="column-sort-input-asc"
          />
        </label>
        <label htmlFor="desc">
          DESC:
          <input
            id="desc"
            type="radio"
            name="order"
            value="DESC"
            onChange={ (e) => setOrder(e.target.value) }
            data-testid="column-sort-input-desc"
          />
        </label>
        <button
          type="button"
          onClick={ onSortClick }
          data-testid="column-sort-button"
        >
          Ordernar

        </button>
        <button
          type="button"
          onClick={ onRemoveAllClick }
          data-testid="button-remove-filters"
        >
          Remover Filtros

        </button>
      </div>
      <div>
        <ul>
          {
            numericFilter.map((f) => (
              <li
                key={ f.columnFilter }
                data-testid="filter"
              >
                {`${f.columnFilter} ${f.comparisonFilter} ${f.valueFilter} `}
                <button
                  type="button"
                  onClick={ () => onRemoveClick(f.columnFilter) }
                >
                  Remover

                </button>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default Filters;
