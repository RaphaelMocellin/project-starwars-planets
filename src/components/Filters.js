import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Filters() {
  const SWContext = useContext(StarWarsContext);
  const { nameFilter, setNameFilter } = SWContext;

  return (
    <label htmlFor="nameFilter">
      <input
        id="nameFilter"
        type="text"
        name="nameFilter"
        value={ nameFilter }
        onChange={ (e) => setNameFilter(e.target.value) }
        data-testid="name-filter"
      />
    </label>
  );
}

export default Filters;
