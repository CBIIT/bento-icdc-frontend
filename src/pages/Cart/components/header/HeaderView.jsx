import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { myFilesPageData } from '../../../../bento/fileCentricCartWorkflowData';
import ReadMeDialogComponent from '../../../../components/ReadMeDialog/ReadMe.controller';
import ReadMoreSVG from '../readMore';
import env from '../../../../utils/env';
import * as Styled from './Header.styled';
import { OverviewWidget } from '../overview-widget';

const HeaderView = ({ filesId }) => {
  const [displayReadMe, setDisplayReadMe] = useState(false);
  const [content, setContent] = useState(undefined);


  const getReadMe = async url => {
    const { data } = await axios.get(url);
    setContent(data);
  };

  useEffect(() => {
    getReadMe(env.REACT_APP_FILE_CENTRIC_CART_README);
  }, []);

  const displayReadMeHandler = () => {
    setDisplayReadMe(!displayReadMe);
  };

  return (
    <>
      <Styled.CartHeader>
        <Styled.CartHeaderLogo>
          <Styled.CartHeaderLogoIcon
            src={myFilesPageData.headerIconSrc}
            alt={myFilesPageData.headerIconAlt}
          />
          <Styled.PageTitle>My Files</Styled.PageTitle>
        </Styled.CartHeaderLogo>
        <Styled.ReadMeBtnDiv>
          <Styled.ReadMeButton
            onClick={displayReadMeHandler}
            color="primary"
            variant="contained"
            endIcon={<ReadMoreSVG />}
          >
            README
          </Styled.ReadMeButton>
        </Styled.ReadMeBtnDiv>
      </Styled.CartHeader>

      <Styled.OverviewWidgetWrapper>
        <OverviewWidget fileIds={filesId} />
      </Styled.OverviewWidgetWrapper> 

      <ReadMeDialogComponent
        content={content}
        config={{
          readMeTitle: 'Understanding the “My Files” Cart Page',
        }}
        display={displayReadMe}
        displayReadMeDialog={displayReadMeHandler}
      />
    </>
  );
};

export default HeaderView;
