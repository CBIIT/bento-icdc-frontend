import { useQuery } from '@tanstack/react-query';

import {
  GITHUB_API_BASE_URL,
  GITHUB_RELEASES_PATH,
  NEWS_ERROR_MESSAGES,
  NEWS_QUERY_RETRY_COUNT,
  NEWS_QUERY_STALE_TIME_MS,
  NEWS_COPY,
  RELEASE_DATE_FORMAT_OPTIONS,
  RELEASE_DATE_LOCALE,
  RELEASE_LABEL,
} from './constants';
import { APP_QUERY_KEYS } from '../../../../utils/queryKeys';
import type { NewsRelease } from './types';

type GitHubRelease = {
  name?: string | null;
  tag_name?: string | null;
  published_at?: string | null;
  html_url?: string | null;
  body?: string | null;
};

const formatReleaseDate = (publishedAt?: string | null) =>
  publishedAt
    ? new Date(publishedAt).toLocaleDateString(
        RELEASE_DATE_LOCALE,
        RELEASE_DATE_FORMAT_OPTIONS
      )
    : NEWS_COPY.dateUnavailable;

const fetchGitHubReleases = async (
  repository: string,
  signal?: AbortSignal
): Promise<NewsRelease[]> => {
  const response = await fetch(
    `${GITHUB_API_BASE_URL}/${repository}/${GITHUB_RELEASES_PATH}`,
    { signal }
  );

  if (!response.ok) {
    throw new Error(NEWS_ERROR_MESSAGES.githubReleaseLoad(repository));
  }

  const releases: unknown = await response.json();
  if (!Array.isArray(releases)) {
    throw new Error(
      NEWS_ERROR_MESSAGES.unexpectedGithubReleasesResponse(repository)
    );
  }

  return (releases as GitHubRelease[]).map(release => ({
    label: RELEASE_LABEL,
    value: release.name || release.tag_name || NEWS_COPY.untitledRelease,
    date: formatReleaseDate(release.published_at),
    url: release.html_url || undefined,
    body: release.body || undefined,
  }));
};

export const useGitHubReleases = (repository: string) =>
  useQuery<NewsRelease[]>({
    queryKey: [...APP_QUERY_KEYS.landing.releases, repository],
    queryFn: ({ signal }) => fetchGitHubReleases(repository, signal),
    staleTime: NEWS_QUERY_STALE_TIME_MS,
    retry: NEWS_QUERY_RETRY_COUNT,
  });
