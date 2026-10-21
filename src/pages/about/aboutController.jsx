import React, { useEffect } from 'react';
import { toast } from 'sonner';
import env from '../../utils/env';
import AboutView from './aboutView';
import { SkeletonLoader } from '../../components/Skeleton';
import { useStaticYaml } from '../../hooks/useStaticYaml';
import { APP_QUERY_KEYS } from '../../utils/queryKeys';

const ABOUT_CONTENT_URL = env.REACT_APP_ABOUT_CONTENT_URL;

const About = ({ match }) => {
  const {
    data: pages,
    isError,
    refetch,
  } = useStaticYaml(
    APP_QUERY_KEYS.about.staticContent(ABOUT_CONTENT_URL),
    ABOUT_CONTENT_URL,
    { staleTime: 30 * 60 * 1000 }
  );

  useEffect(() => {
    if (!isError) return;

    const message = 'Unable to load page content.';
    toast.error(message, {
      id: message,
      duration: Infinity,
      action: {
        label: 'Retry',
        onClick: () => {
          toast.dismiss(message);
          void refetch();
        },
      },
    });
  }, [isError, refetch]);

  const data = Array.isArray(pages)
    ? pages.find(page => page?.page === match.path)
    : undefined;
  if (!data) {
    return <SkeletonLoader />;
  }
  return <AboutView data={data} />;
};
export default About;
