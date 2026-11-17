import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { APP_QUERY_KEYS } from '../../utils/queryKeys';

export const useCartReadMe = (url: string) =>
  useQuery({
    queryKey: APP_QUERY_KEYS.cart.readMe(url),
    queryFn: async ({ signal }) => {
      const { data } = await axios.get<string>(url, { signal });
      return data;
    },
    staleTime: 30 * 60 * 1000,
  });
