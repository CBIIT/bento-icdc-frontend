import React, { useState, useEffect } from 'react';
import { SkeletonLoader } from '../../components/Skeleton';
import { parse } from 'yaml';
import axios from 'axios';
import LandingView from './landingView';
import NewsView from './views/newsView';
import env from '../../utils/env';
import { RouteComponentProps } from 'react-router-dom';

const LANDING_CONTENT_URL = (env as Record<string, string>)
  .REACT_APP_LANDING_DATA;
const NEWS_CONTENT_URL = (env as Record<string, string>).REACT_APP_NEWS_DATA;
const NEWS_PATH = '/news';

const LandingController = ({ match }: RouteComponentProps) => {
  const [newsData, setNewsData] = useState<Record<string, any> | undefined>(
    undefined
  );
  const [landingPageData, setLandingPageData] = useState<
    Record<string, unknown> | undefined
  >(undefined);
  useEffect(() => {
    const fetchStaticContent = async (url: string, setter: string) => {
      let resultData: unknown;
      try {
        const res = await axios.get<string>(url);

        resultData = parse(res.data);
        if (setter === 'landing') {
          setLandingPageData((resultData as Record<string, unknown>[])[0]);
        } else {
          setNewsData(resultData as Record<string, unknown>);
        }
      } catch (error) {
        console.error(error);
      }
    };

    void fetchStaticContent(LANDING_CONTENT_URL, 'landing');
    void fetchStaticContent(NEWS_CONTENT_URL, 'news');
  }, []);

  if (
    newsData === undefined ||
    landingPageData === undefined ||
    landingPageData.tabs === undefined
  ) {
    return <SkeletonLoader />;
  }

  if (newsData && match.path === NEWS_PATH) {
    return <NewsView news={newsData && newsData} />;
  }

  return <LandingView pageData={landingPageData && landingPageData} />;
};

export default LandingController;
