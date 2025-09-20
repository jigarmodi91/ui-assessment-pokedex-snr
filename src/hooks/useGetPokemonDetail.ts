import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

export type PokemonDetail = {
  id: string;
  name: string;
  image: string;
  number: string;
  types: string[];
  resistant: string[];
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  maxHP: number;
  weight: {
    minimum: string;
    maximum: string;
  };
  height: {
    minimum: string;
    maximum: string;
  };
  classification: string;
};

export const GET_POKEMON_DETAIL = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const useGetPokemonDetail = (id: string, name: string) => {
  const { data, ...queryRes } = useQuery(GET_POKEMON_DETAIL, {
    variables: {
      id: id,
      name: name,
    },
    skip: !id && !name,
  });

  const pokemonDetail: PokemonDetail = useMemo(
    () => data?.pokemon || {},
    [data]
  );

  return {
    pokemonDetail,
    ...queryRes,
  };
};
