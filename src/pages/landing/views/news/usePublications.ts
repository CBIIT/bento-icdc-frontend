import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import type { Publication } from '../../../../generated-types/types';
import env from '../../../../utils/env';
import {
  NEWS_EXTERNAL_URLS,
  NEWS_QUERY_RETRY_COUNT,
  NEWS_QUERY_STALE_TIME_MS,
  PUBLICATIONS_QUERY,
} from './constants';
import { APP_QUERY_KEYS } from '../../../../utils/queryKeys';
import type { NewsPublication } from './types';

type PublicationQueryItem = Pick<
  Publication,
  'publication_title' | 'digital_object_id' | 'pubmed_id'
>;

type PublicationsQueryResponse = {
  data?: {
    publication?: PublicationQueryItem[] | null;
  } | null;
};

const formatPublications = (
  publications: PublicationQueryItem[]
): NewsPublication[] =>
  publications.reduce<NewsPublication[]>((formatted, publication) => {
    const title = publication.publication_title?.trim();
    if (!title) return formatted;

    const doi = publication.digital_object_id?.trim() || undefined;
    const pubmedId =
      publication.pubmed_id != null &&
      Number.isInteger(publication.pubmed_id) &&
      publication.pubmed_id > 0
        ? String(publication.pubmed_id)
        : undefined;

    formatted.push({
      title,
      doi,
      doiUrl: doi ? `${NEWS_EXTERNAL_URLS.doi}/${doi}` : undefined,
      pubmedId,
      pubmedUrl: pubmedId
        ? `${NEWS_EXTERNAL_URLS.pubMed}/${pubmedId}/`
        : undefined,
    });

    return formatted;
  }, []);

export const usePublications = () => {
  const backendAPI = (env as Record<string, string>).REACT_APP_BACKEND_API;

  return useQuery<PublicationQueryItem[], Error, NewsPublication[]>({
    queryKey: [...APP_QUERY_KEYS.landing.publications, backendAPI],
    queryFn: async () => {
      const response = await axios.post<PublicationsQueryResponse>(backendAPI, {
        query: PUBLICATIONS_QUERY,
      });

      return response.data.data?.publication ?? [];
    },
    select: formatPublications,
    enabled: Boolean(backendAPI),
    staleTime: NEWS_QUERY_STALE_TIME_MS,
    retry: NEWS_QUERY_RETRY_COUNT,
  });
};
