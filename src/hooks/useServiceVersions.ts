import { useQueries } from '@tanstack/react-query';
import axios from 'axios';
import env from '../utils/env';
import { APP_QUERY_KEYS } from '../utils/queryKeys';

const VERSION_ENDPOINTS = {
  backend: 'REACT_APP_BACKEND_VERSION',
  fileService: 'REACT_APP_FILE_SERVICE_VERSION',
  interop: 'REACT_APP_INTEROP_SERVICE_VERSION',
} as const;

type Service = keyof typeof VERSION_ENDPOINTS;
type VersionResponse = { version?: string };

export const useServiceVersions = (services: readonly Service[]) =>
  useQueries({
    queries: services.map(service => {
      const endpoint = (env as Record<string, string | undefined>)[
        VERSION_ENDPOINTS[service]
      ];
      return {
        queryKey: APP_QUERY_KEYS.serviceVersion(service, endpoint ?? ''),
        enabled: Boolean(endpoint?.trim()),
        queryFn: async ({ signal }: { signal: AbortSignal }) => {
          if (!endpoint?.trim()) return '';
          const { data } = await axios.get<VersionResponse>(endpoint, {
            signal,
          });
          return data.version ?? '';
        },
        staleTime: 5 * 60 * 1000,
      };
    }),
  });
