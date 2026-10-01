import React from 'react';
import { SkeletonLoader } from '../../components/Skeleton';
import { toast } from 'sonner';
import LandingView from './landingView';
import NewsView from './views/newsView';
import env from '../../utils/env';
import { RouteComponentProps } from 'react-router-dom';
import type { NewsPageData } from './views/news/types';
import { useStaticYaml } from './useStaticYaml';
import { APP_QUERY_KEYS } from '../../utils/queryKeys';

const LANDING_CONTENT_URL = (env as Record<string, string>)
  .REACT_APP_LANDING_DATA;
const NEWS_CONTENT_URL = (env as Record<string, string>).REACT_APP_NEWS_DATA;
const NEWS_PATH = '/news';
type LandingPageData = Record<string, unknown> & {
  tabs?: unknown;
};

const useStaticContentErrorToast = (
  isError: boolean,
  message: string,
  refetch: () => Promise<unknown>
) => {
  React.useEffect(() => {
    if (!isError) return;

    toast.error(message, {
      id: message,
      action: {
        label: 'Retry',
        onClick: () => {
          toast.dismiss(message);
          void refetch();
        },
      },
    });
  }, [isError, message, refetch]);
};

const LandingController = ({ match }: RouteComponentProps) => {
  const isNewsRoute = match.path === NEWS_PATH;
  const landingQuery = useStaticYaml<LandingPageData[]>(
    APP_QUERY_KEYS.landing.staticContent,
    LANDING_CONTENT_URL
  );
  const newsQuery = useStaticYaml<NewsPageData>(
    APP_QUERY_KEYS.landing.newsStaticContent,
    NEWS_CONTENT_URL,
    { enabled: isNewsRoute }
  );
  const landingPageData = landingQuery.data?.[0];

  useStaticContentErrorToast(
    landingQuery.isError,
    'Unable to load landing page content.',
    landingQuery.refetch
  );
  useStaticContentErrorToast(
    isNewsRoute && newsQuery.isError,
    'Unable to load news page content.',
    newsQuery.refetch
  );

  if (
    landingQuery.isPending ||
    landingQuery.isError ||
    landingPageData?.tabs === undefined ||
    (isNewsRoute && (newsQuery.isPending || newsQuery.isError))
  ) {
    return <SkeletonLoader />;
  }

  if (isNewsRoute && newsQuery.data) {
    return <NewsView news={newsQuery.data} />;
  }

  return <LandingView pageData={landingPageData} />;
};

export default LandingController;
