import React, { useContext, useEffect } from 'react';
import './App.css';
import Table from './components/Table';
import StarWarsContext from './context/StarWarsContext';

function App() {
  const SWContext = useContext(StarWarsContext);
  const { planets, setPlanets } = SWContext;
  console.log(planets);

  // const fetchData = async () => {
  //   const request = await fetch('https://swapi.dev/api/planets');
  //   const response = await request.json();
  //   return response;
  // };

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((result) => result.json())
      .then((data) => setPlanets(data.results));
  }, [setPlanets]);

  return (
    <Table />
  );
}

export default App;
