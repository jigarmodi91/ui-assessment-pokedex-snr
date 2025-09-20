import React from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemonDetail } from 'src/hooks/useGetPokemonDetail';
import { useParams } from 'react-router-dom';

export const PokemonDetails = () => {
  const classes = useStyles();
  const { id, name } = useParams();
  const { pokemonDetail, loading } = useGetPokemonDetail(id || '', name || '');

  return <div className={classes.root}>{loading && <div>Loading...</div>}</div>;
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
    },
  },
  { name: 'PokemonDetails' }
);
