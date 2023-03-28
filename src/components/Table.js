import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const SWContext = useContext(StarWarsContext);
  const { planets,
    nameFilter,
    numericFilter,
    filteredPlanets,
    setFilteredPlanets } = SWContext;

  const filterByName = (array) => {
    if (nameFilter === '') return array;
    return array
      .filter((planet) => planet.name.toString().toLowerCase()
        .includes(nameFilter.toLowerCase()));
  };

  const filterByNumber = (array) => {
    if (numericFilter.length === 0) return array;
    let workingArray = array;
    numericFilter.forEach((f) => {
      console.log(f);
      if (f.comparisonFilter === 'maior que') {
        workingArray = workingArray
          .filter((planet) => Number(planet[f.columnFilter]) > Number(f.valueFilter));
      }
      if (f.comparisonFilter === 'menor que') {
        workingArray = workingArray
          .filter((planet) => Number(planet[f.columnFilter]) < Number(f.valueFilter));
      }
      if (f.comparisonFilter === 'igual a') {
        workingArray = workingArray
          .filter((planet) => Number(planet[f.columnFilter]) === Number(f.valueFilter));
      }
    });
    console.log(workingArray);
    return workingArray;
  };

  useEffect(() => {
    // console.log('loop?');
    const filteredByName = filterByName(planets);
    const filteredByNumber = filterByNumber(filteredByName);
    // console.log(filteredByNumber);

    setFilteredPlanets(filteredByNumber);
  }, [planets, nameFilter, numericFilter]);

  return (
    <div>
      {
        planets.length > 0
          ? (
            <table>
              <thead>
                <tr>
                  {
                    Object.keys(planets[0]).map((k) => (
                      <th key={ k }>{k}</th>
                    ))
                  }
                </tr>
              </thead>
              <tbody>
                {
                  filteredPlanets.map((planet) => (
                    <tr key={ planet.name }>
                      <td>{planet.name}</td>
                      <td>{planet.rotation_period}</td>
                      <td>{planet.orbital_period}</td>
                      <td>{planet.diameter}</td>
                      <td>{planet.climate}</td>
                      <td>{planet.gravity}</td>
                      <td>{planet.terrain}</td>
                      <td>{planet.surface_water}</td>
                      <td>{planet.population}</td>
                      <td>{planet.films}</td>
                      <td>{planet.created}</td>
                      <td>{planet.edited}</td>
                      <td>{planet.url}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          )
          : <h2>Loading Planets!</h2>
      }
    </div>
  );
}

export default Table;
