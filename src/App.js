import React, { useContext, useEffect } from 'react';
import './App.css';
import Filters from './components/Filters';
import Table from './components/Table';
import StarWarsContext from './context/StarWarsContext';

function App() {
  const SWContext = useContext(StarWarsContext);
  const { setPlanets } = SWContext;

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((result) => result.json())
      .then((data) => setPlanets(data.results.map(({ residents, ...rest }) => rest)));
  }, [setPlanets]);

  return (
    <div>
      <Filters />
      <Table />
    </div>
  );
}

export default App;
