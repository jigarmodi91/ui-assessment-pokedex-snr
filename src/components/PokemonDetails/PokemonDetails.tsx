import React from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemonDetail } from 'src/hooks/useGetPokemonDetail';
import { useNavigate, useParams } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export const PokemonDetails = () => {
  const classes = useStyles();
  const { id, name } = useParams();
  const { pokemonDetail, loading } = useGetPokemonDetail(
    id as string,
    name as string
  );
  const navigate = useNavigate();

  const {
    height,
    weight,
    classification,
    resistant,
    weaknesses,
    maxCP,
    maxHP,
    fleeRate,
  } = pokemonDetail;
  const heightValue =
    (parseFloat(height?.maximum) + parseFloat(height?.minimum)) / 2;
  const weightValue =
    (parseFloat(weight?.maximum) + parseFloat(weight?.minimum)) / 2;
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
                <h3 className={classes.classification}>{classification}</h3>
                <div className={classes.row}>
                  <div className={classes.label}>Height:</div>
                  <div className={classes.value}>
                    {heightValue.toFixed(2) + 'm'}
                  </div>
                  <div className={classes.label}>Weight:</div>
                  <div className={classes.value}>
                    {weightValue.toFixed(2) + 'kg'}
                  </div>
                </div>
                <div className={classes.label}>
                  Types:{' '}
                  <span className={classes.value}>
                    {pokemonDetail?.types?.join('/')}
                  </span>
                </div>
                <div className={classes.row}>
                  <div className={classes.label}>Max CP:</div>
                  <div className={classes.value}>{maxCP}</div>
                  <div className={classes.label}>Max HP:</div>
                  <div className={classes.value}>{maxHP}</div>
                  <div className={classes.label}>Flee Rate:</div>
                  <div className={classes.value}>{fleeRate}</div>
                </div>
                <div className={classes.label}>Strength</div>
                {renderBadge(resistant, [classes.strength, classes.badge])}
                <div className={classes.label}>Weakness</div>
                {renderBadge(weaknesses, [classes.weakness, classes.badge])}
              </div>
            </div>
            <DialogActions>
              <Button variant="contained" onClick={() => navigate('/pokemon')}>
                Close
              </Button>
            </DialogActions>
          </DialogContent>
        )}
      </>
    </Dialog>
  ) : null;
};

const renderBadge = (items: string[], classes: any) => {
  return (
    <div>
      {items?.map((item) => (
        <span className={classes.join(' ')} key={item}>
          {item}
        </span>
      ))}
    </div>
  );
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
    badge: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#ffffff',
      backgroundColor: 'green',
      padding: '5px',
      marginRight: '5px',
      borderRadius: '5px',
    },
    strength: {
      backgroundColor: 'green',
    },
    weakness: {
      backgroundColor: 'red',
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
      margin: '0px',
      fontStyle: 'italic',
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    value: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#333333',
      marginBottom: '10px',
      marginTop: '10px',
      paddingRight: '30px',
      fontStyle: 'italic',
    },
    types: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#333333',
    },
  },
  { name: 'PokemonDetails' }
);
