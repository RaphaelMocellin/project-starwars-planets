import React from 'react';
import { render, screen } from '@testing-library/react';
import StarWarsProvider from '../context/StarWarsProvider';
import testData from '../../cypress/mocks/testData';
import App from '../App';
import userEvent from '@testing-library/user-event';


describe('Teste do Star Wars Planets Search', () => {
  test('teste se renderiza corretamente todos os inputs e buttons e se faz o fecth inciial', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
    
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );

    const nameFilter = screen.getByTestId('name-filter')
    const columnFilter = screen.getByTestId('column-filter')
    const comparisonFilter = screen.getByTestId('comparison-filter')
    const valueFilter = screen.getByTestId('value-filter')
    const filterBtn = screen.getByTestId('button-filter')
    const columnSort = screen.getByTestId('column-sort')
    const ascInput = screen.getByTestId('column-sort-input-asc')
    const descInput = screen.getByTestId('column-sort-input-desc')
    const sortBtn = screen.getByTestId('column-sort-button')
    const removeFilters = screen.getByTestId('button-remove-filters')

    expect(nameFilter).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(comparisonFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();
    expect(filterBtn).toBeInTheDocument();
    expect(columnSort).toBeInTheDocument();
    expect(ascInput).toBeInTheDocument();
    expect(descInput).toBeInTheDocument();
    expect(sortBtn).toBeInTheDocument();
    expect(removeFilters).toBeInTheDocument();

    expect(global.fetch).toBeCalledTimes(1);
  });

  test('Teste se o Filtro por nome funciona', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
    
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );

    const nameFilter = screen.getByTestId('name-filter')
    userEvent.type(nameFilter,'oo')

    const filteredPlanets = await screen.findAllByTestId('planet-name')
    expect(filteredPlanets).toHaveLength(2)

  })

  test('Teste se o Filtro por coluna funciona', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
    
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );

    const columnFilter = screen.getByTestId('column-filter')
    const comparisonFilter = screen.getByTestId('comparison-filter')
    const valueFilter = screen.getByTestId('value-filter')
    const filterBtn = screen.getByTestId('button-filter')

    userEvent.selectOptions(columnFilter, 'rotation_period')
    userEvent.selectOptions(comparisonFilter, 'menor que')
    userEvent.type(valueFilter, '20')
    userEvent.click(filterBtn)

    const filteredPlanets = await screen.findAllByTestId('planet-name')
    expect(filteredPlanets).toHaveLength(2)

  })

  test('Teste se consigo remover um Filtro por coluna', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
    
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );

    const columnFilter = screen.getByTestId('column-filter')
    const comparisonFilter = screen.getByTestId('comparison-filter')
    const valueFilter = screen.getByTestId('value-filter')
    const filterBtn = screen.getByTestId('button-filter')

    userEvent.selectOptions(columnFilter, 'rotation_period')
    userEvent.selectOptions(comparisonFilter, 'menor que')
    userEvent.type(valueFilter, '20')
    userEvent.click(filterBtn)

    const filteredPlanets = await screen.findAllByTestId('planet-name')
    expect(filteredPlanets).toHaveLength(2)

    const removeFilter = await screen.findByTestId('remove-single-filter')
    userEvent.click(removeFilter)

    const AllPlanets = await screen.findAllByTestId('planet-name')
    expect(AllPlanets).toHaveLength(10)

  })

  test('Teste se consigo remover todos os Filtros por coluna', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
    
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );

    const columnFilter = screen.getByTestId('column-filter')
    const comparisonFilter = screen.getByTestId('comparison-filter')
    const valueFilter = screen.getByTestId('value-filter')
    const filterBtn = screen.getByTestId('button-filter')

    userEvent.selectOptions(columnFilter, 'rotation_period')
    userEvent.selectOptions(comparisonFilter, 'menor que')
    userEvent.type(valueFilter, '20')
    userEvent.click(filterBtn)

    const filteredPlanets = await screen.findAllByTestId('planet-name')
    expect(filteredPlanets).toHaveLength(2)

    userEvent.selectOptions(columnFilter, 'diameter')
    userEvent.selectOptions(comparisonFilter, 'maior que')
    userEvent.clear(valueFilter)
    userEvent.type(valueFilter, '5000')
    userEvent.click(filterBtn)

    const newFilteredPlanets = await screen.findAllByTestId('planet-name')
    expect(newFilteredPlanets).toHaveLength(1)


    const removeAllFilters = await screen.findByTestId('button-remove-filters')
    userEvent.click(removeAllFilters)

    const AllPlanets = await screen.findAllByTestId('planet-name')
    expect(AllPlanets).toHaveLength(10)

  })

  test('Teste se consigo organizar os Planetas por coluna de forma ASC', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
    
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );

    const columnSort = screen.getByTestId('column-sort')
    const ascInput = screen.getByTestId('column-sort-input-asc')
    const sortBtn = screen.getByTestId('column-sort-button')

    userEvent.selectOptions(columnSort, 'diameter')
    userEvent.click(ascInput)
    userEvent.click(sortBtn)

    const sortedPlanets = await screen.findAllByTestId('planet-name')
    expect(sortedPlanets[0]).toHaveTextContent('Endor')
  })

  test('Teste se consigo organizar os Planetas por coluna de forma DESC', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
    
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );

    const columnSort = screen.getByTestId('column-sort')
    const descInput = screen.getByTestId('column-sort-input-desc')
    const sortBtn = screen.getByTestId('column-sort-button')

    userEvent.selectOptions(columnSort, 'diameter')
    userEvent.click(descInput)
    userEvent.click(sortBtn)

    const sortedPlanets = await screen.findAllByTestId('planet-name')
    expect(sortedPlanets[0]).toHaveTextContent('Bespin')
  })
})

