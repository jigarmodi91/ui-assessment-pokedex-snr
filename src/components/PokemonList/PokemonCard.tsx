import React from 'react';
import { createUseStyles } from 'react-jss';
import { Pokemon } from 'src/hooks/useGetPokemons';

const useStyles = createUseStyles(
  {
    root: {
      width: '300px',
      height: '400px',
      border: '1px solid #ccc',
      borderRadius: '15px',
      padding: '10px',
      margin: '10px',
      display: 'flex',
      flexDirection: 'column',
      cursor: 'pointer',
      boxShadow: '5px 5px 10px rgb(21, 156, 66)',
    },
    image: {
      width: '100%',
      height: '300px',
      borderRadius: '15px',
      marginBottom: '10px',
      marginTop: '10px',
    },
    name: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    rank: {
      fontSize: '24px',
      fontWeight: 'bold',
      fontStyle: 'italic',
    },
  },
  { name: 'PokemonCard' }
);

export const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.name}>{pokemon.name}</div>
      <img src={pokemon.image} alt={pokemon.name} className={classes.image} />
      <div className={classes.rank}>#{pokemon.number}</div>
    </div>
  );
};
