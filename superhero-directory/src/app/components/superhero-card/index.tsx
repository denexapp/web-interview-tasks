import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Superhero } from '~entities/superhero/superhero';

interface SuperheroCardProps {
  superhero: Superhero;
  to: string;
}

const SuperheroCard: FC<SuperheroCardProps> = (props) => {
  const { superhero, to } = props;

  return (
    <Link to={to} className="rounded-md bg-white p-4 shadow-md">
      <h2 className="text-xl font-semibold">{superhero.name}</h2>
      <img
        src={superhero.image.url}
        alt={superhero.name}
        className="mb-4 rounded"
      />
      <p>
        <strong>Full Name:</strong> {superhero.biography['full-name']}
      </p>
      <p>
        <strong>Publisher:</strong> {superhero.biography.publisher}
      </p>
      <p>
        <strong>First Appearance:</strong>{' '}
        {superhero.biography['first-appearance']}
      </p>
    </Link>
  );
};

export default SuperheroCard;
