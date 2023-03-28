import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const SWContext = useContext(StarWarsContext);
  const { planets,
    nameFilter,
    filteredPlanets,
    setFilteredPlanets } = SWContext;

  const filterByName = (array) => {
    if (nameFilter === '') return array;
    return array.filter((planet) => planet.name.includes(nameFilter));
  };

  useEffect(() => {
    // console.log('loop?');
    const filteredByName = filterByName(planets);
    // console.log(filteredByName);

    setFilteredPlanets(filteredByName);
  }, [planets, nameFilter]);

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
