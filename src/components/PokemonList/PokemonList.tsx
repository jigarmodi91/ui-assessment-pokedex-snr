import React, { useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { PokemonCard } from './PokemonCard';
import { PokemonDetails } from '../PokemonDetails';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const [search, setSearch] = useState('');
  const filteredPokemons = useMemo(() => {
    return search
      ? pokemons.filter((pkmn) =>
          pkmn.name.toLowerCase().includes(search.toLowerCase())
        )
      : pokemons;
  }, [pokemons, search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className={classes.root}>
      {loading && <div>Loading...</div>}
      <div>
        <input
          type="text"
          placeholder="Search"
          className={classes.search}
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div className={classes.pokemonList}>
        {filteredPokemons.map((pkmn) => (
          <PokemonCard key={pkmn.id} pokemon={pkmn} />
        ))}
      </div>
      <PokemonDetails />
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
    },
    pokemonList: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      paddingTop: '50px',
    },
    search: {
      width: '50%',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px',
      color: '#333333',
    },
  },
  { name: 'PokemonList' }
);
