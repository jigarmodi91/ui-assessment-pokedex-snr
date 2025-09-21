import React from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
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
      '&:hover': {
        transform: 'translateY(-10px)',
        transition: 'transform 0.3s ease-in-out',
      },
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
    types: {
      marginTop: '5px',
      marginBottom: '5px',
      fontSize: '16px',
      fontWeight: 'bold',
    },
  },
  { name: 'PokemonCard' }
);

export const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id, name, image, number, types } = pokemon;
  return (
    <div
      className={classes.root}
      onClick={() => navigate(`/pokemon/${id}/${name}`)}
    >
      <div className={classes.name}>{name}</div>
      <img src={image} alt={name} className={classes.image} />
      <div className={classes.rank}>#{number}</div>
      <div className={classes.types}>{types.join(', ')}</div>
    </div>
  );
};
