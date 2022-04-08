import * as React from 'react';

interface CardStatelessProps {
    name: string,

    id: number,

    image: any,
}

const Card: React.SFC<CardStatelessProps> = ({ name, id, image }) => {
    return (
        <div className='tc grow bg-light-green br3 pa3 ma2 dib bw2 shadow-5'>
            <img alt='robots' src={image} />
            <div>
                <h2>{name}</h2>

            </div>
        </div>
    );
};

export default Card;