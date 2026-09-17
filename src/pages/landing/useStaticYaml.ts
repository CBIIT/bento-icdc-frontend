import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { parse } from 'yaml';

type StaticYamlQueryOptions = {
  enabled?: boolean;
};

const fetchStaticYaml = async <T>(url: string, signal?: AbortSignal) => {
  const response = await axios.get<string>(url, { signal });
  return parse(response.data) as T;
};

export const useStaticYaml = <T>(
  queryKey: readonly string[],
  url: string,
  options: StaticYamlQueryOptions = {}
) =>
  useQuery<T, Error>({
    queryKey,
    queryFn: ({ signal }) => fetchStaticYaml<T>(url, signal),
    enabled: options.enabled ?? true,
    staleTime: 0,
    retry: 3,
  });
