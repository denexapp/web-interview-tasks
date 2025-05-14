import { config } from '~shared/config';
import { ResponseError, ResponseSuccess } from '~shared/response';

import { useQuery } from '@tanstack/react-query';

import { superheroKeys } from './keys';

import { Superhero } from '../superhero';

type ResponsePayload = {
  'results-for': string;
  results: Superhero[];
};

export type Params = {
  query: string;
};

export function useSearchSuperheros(params: Params) {
  const { query } = params;

  return useQuery({
    queryKey: superheroKeys.search(query),
    queryFn: async (): Promise<ResponseSuccess<ResponsePayload>> => {
      const response = await fetch(
        `${config.apiHost}/api/${config.apiToken}/search/${query}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const decodedResponse: ResponseSuccess<ResponsePayload> | ResponseError =
        await response.json();

      if (decodedResponse.response === 'error') {
        if (decodedResponse.error === 'character with given name not found') {
          // if there's no character with the given name,
          // the api returns status 200 with an error body
          // so we need to handle it as a success response
          // with an empty results array to avoid react-query
          // to try to retry the request
          const result: ResponseSuccess<ResponsePayload> = {
            response: 'success',
            'results-for': query,
            results: [],
          };
          return result;
        }

        throw new Error(
          `Error ${response.status}: ${response.statusText} - ${decodedResponse.error}`
        );
      }

      return decodedResponse;
    },
  });
}
