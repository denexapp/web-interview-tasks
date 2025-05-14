import { FC, ReactNode } from 'react';

import SuperheroCard from '~app/components/superhero-card';

import { superheroApi } from '~entities/superhero';

interface SearchResultsProps {
  query: string;
}

const SearchResults: FC<SearchResultsProps> = (props) => {
  const { query } = props;
  const { status, data } = superheroApi.useSearchSuperheros({
    query,
  });

  let content: ReactNode;

  if (status === 'pending') {
    content = <p className="text-center text-gray-500">Loading...</p>;
  } else if (status === 'error') {
    content = (
      <p className="text-center text-red-500">Failed to load superhero data.</p>
    );
  } else if (data.results.length === 0) {
    content = (
      <p className="text-center text-gray-500">
        No results found for "{query}".
      </p>
    );
  } else {
    content = (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.results.map((superhero) => (
          <SuperheroCard
            superhero={superhero}
            to={`/${superhero.id}`}
            key={superhero.id}
          />
        ))}
      </div>
    );
  }

  return (
    <section className="mb-6">
      <h2 className="mb-2 text-2xl font-semibold">Results for "{query}"</h2>
      {content}
    </section>
  );
};

export default SearchResults;
