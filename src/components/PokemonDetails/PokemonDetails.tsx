import React from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemonDetail } from 'src/hooks/useGetPokemonDetail';
import { useNavigate, useParams } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';

export const PokemonDetails = () => {
  const classes = useStyles();
  const { id, name } = useParams();
  const { pokemonDetail, loading } = useGetPokemonDetail(
    id as string,
    name as string
  );
  const navigate = useNavigate();
  return id ? (
    <Dialog
      open={true}
      onClose={() => navigate('/pokemon')}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={classes.root}
      maxWidth="md"
      fullWidth
    >
      <>
        {loading && <DialogContent>Loading...</DialogContent>}
        {!loading && (
          <DialogContent className={classes.root}>
            <DialogTitle className={classes.title}>
              {pokemonDetail.name} #{pokemonDetail.number}
            </DialogTitle>
            <div className={classes.detailsContainer}>
              <img
                src={pokemonDetail.image}
                alt={pokemonDetail.name}
                className={classes.image}
              />
              <div className={classes.details}>
                <h3 className={classes.classification}>
                  {pokemonDetail?.classification}
                </h3>
                <div className={classes.label}>Strength</div>
                <div>
                  {pokemonDetail?.resistant?.map((strength) => (
                    <span className={classes.strength} key={strength}>
                      {strength}
                    </span>
                  ))}
                </div>
                <div className={classes.label}>Weakness</div>
                <div>
                  {pokemonDetail?.weaknesses?.map((weakness) => (
                    <span className={classes.weakness} key={weakness}>
                      {weakness}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </>
    </Dialog>
  ) : null;
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      boxSizing: 'border-box',
    },
    title: {
      fontSize: '36px !important',
      fontWeight: 'bold !important',
      color: '#333333',
    },
    image: {
      width: '200px',
      height: '200px',
    },
    detailsContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    strength: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#ffffff',
      backgroundColor: 'green',
      padding: '5px',
      marginRight: '5px',
      borderRadius: '5px',
    },
    weakness: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#ffffff',
      backgroundColor: 'red',
      padding: '5px',
      marginRight: '5px',
      borderRadius: '5px',
    },
    label: {
      fontSize: '14px',
      color: '#333333',
      marginBottom: '10px',
      marginTop: '10px',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      margin: '10px',
      marginLeft: '25px',
    },
    classification: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333333',
      marginBottom: '10px',
      marginTop: '10px',
      fontStyle: 'italic',
    },
  },
  { name: 'PokemonDetails' }
);
