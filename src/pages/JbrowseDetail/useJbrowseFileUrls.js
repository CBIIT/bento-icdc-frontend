import { useQuery } from '@tanstack/react-query';
import env from '../../utils/env';
import { APP_QUERY_KEYS } from '../../utils/queryKeys';
import { getAllFilesUri } from './util';

export const useJbrowseFileUrls = (files = [], enabled = true) => {
  const endpoint = env.REACT_APP_FILE_SERVICE_API;
  return useQuery({
    queryKey: APP_QUERY_KEYS.jbrowse.fileUrls(endpoint, files),
    queryFn: ({ signal }) =>
      Promise.all(
        files.map(file => getAllFilesUri(file, { signal, endpoint }))
      ),
    enabled: enabled && files.length > 0,
    // The service's URL lifetime is not specified here. Fetch anew on opening
    // the viewer, and avoid background updates that would rebuild its session.
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
};
