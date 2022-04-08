import * as React from 'react';
import Card from './Card';
import { IPokemon } from '../App'

const CardList = ({ pokemons }: { pokemons: Array<IPokemon> }) => {
    return (
        <div>
            {
                pokemons.map((pokemon, i) => {
                    return (
                        <Card
                            key={i}
                            id={pokemons[i].id}
                            name={pokemons[i].name}
                            image={pokemons[i].sprites.front_default}
                        />
                    );
                })
            }
        </div>
    );
}

export default CardList;