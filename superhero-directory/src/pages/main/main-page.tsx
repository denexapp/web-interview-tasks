import { FC, ReactNode } from 'react';

import SearchInput from '~app/components/search-input';
import useDebouncedValue from '~app/hooks/use-debounced-value';
import useSearchParamForInput from '~app/hooks/use-search-param-for-input';

import SearchResults from './search-results';

const MainPage: FC = () => {
  const [searchParam, setSearchParam] = useSearchParamForInput('query');
  const [debouncedQuery, debouncingQuery] = useDebouncedValue(searchParam, 500);
  const searchInputValue = searchParam ?? '';

  const handleSearchInputChange = (value: string) => {
    setSearchParam(value === '' ? null : value);
  };

  let content: ReactNode;

  if (debouncedQuery === null) {
    content = (
      <p className="text-center text-gray-500">
        Type hero name to find the results
      </p>
    );
  } else {
    content = <SearchResults query={debouncedQuery} />;
  }

  return (
    <article className="mx-auto flex flex-col gap-6 rounded-md bg-white p-6 shadow-md">
      <header>
        <h1 className="font-display text-center text-4xl">
          Superhero Directory
        </h1>
        <p>
          Welcome to the Superhero Directory! Here you can find information
          about your favorite superheroes.
        </p>
      </header>
      <section>
        <h2 className="mb-2 text-2xl font-semibold">Search for a Superhero</h2>
        <SearchInput
          value={searchInputValue}
          onChange={handleSearchInputChange}
          dimBackground={debouncingQuery}
          placeholder="Batgirl"
        />
      </section>
      <section>{content}</section>
    </article>
  );
};

export default MainPage;
