import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { parse } from 'yaml';

type StaticYamlQueryOptions<T, TSelected> = {
  enabled?: boolean;
  staleTime?: number;
  retry?: boolean | number;
  select?: (_data: T) => TSelected;
};

const fetchStaticYaml = async <T>(url: string, signal?: AbortSignal) => {
  const response = await axios.get<string>(url, { signal });
  return parse(response.data) as T;
};

export const useStaticYaml = <T, TSelected = T>(
  queryKey: readonly string[],
  url: string,
  options: StaticYamlQueryOptions<T, TSelected> = {}
) =>
  useQuery<T, Error, TSelected>({
    queryKey,
    queryFn: ({ signal }) => fetchStaticYaml<T>(url, signal),
    enabled: options.enabled ?? true,
    staleTime: options.staleTime ?? 0,
    retry: options.retry ?? 3,
    select: options.select,
  });
