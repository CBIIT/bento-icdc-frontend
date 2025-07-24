import React from 'react';
import { useLocation } from 'react-router';
import { Link, NoLink, Wrapper } from './LinkbarView.styled';

interface LinkBarProps {
  title?: string;
  url?: string;
}

const LinkBar: React.FC<LinkBarProps> = ({
  title = 'NCI Cancer Research Data Commons',
  url = 'https://datacommons.cancer.gov/?cid=crdcnav_hp_gdc.cancer.gov',
}) => {
  const { pathname } = useLocation();
  const isJbrowsePage = pathname.includes('/jBrowse');

  return (
    <>
      <Wrapper>
        {!isJbrowsePage ? (
          <Link href={url}>{title}</Link>
        ) : (
          <NoLink>{title}</NoLink>
        )}
      </Wrapper>
    </>
  );
};

export default LinkBar;
