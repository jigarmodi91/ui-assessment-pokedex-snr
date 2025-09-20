import React from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { PokemonCard } from './PokemonCard';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();

  return (
    <div className={classes.root}>
      {loading && <div>Loading...</div>}
      <div className={classes.pokemonList}>
        {pokemons.map((pkmn) => (
          <PokemonCard key={pkmn.id} pokemon={pkmn} />
        ))}
      </div>
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
    },
  },
  { name: 'PokemonList' }
);
