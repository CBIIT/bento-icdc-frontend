import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { myFilesPageData } from '../../../../bento/fileCentricCartWorkflowData';
import ReadMeDialogComponent from '../../../../components/ReadMeDialog/ReadMe.controller';
import ReadMoreSVG from '../readMore';
import env from '../../../../utils/env';
import {
  CartHeader,
  CartHeaderLogo,
  CartHeaderLogoIcon,
  FileCartCount,
  ReadMeBtnDiv,
  ReadMeButton,
  PageTitle,
  OverviewWidgetWrapper,
} from './Header.styled';
import { OverviewWidget } from '../overview-widget';
import { defaultTo } from 'lodash';

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
      <CartHeader>
        <CartHeaderLogo>
          <CartHeaderLogoIcon
            src={myFilesPageData.headerIconSrc}
            alt={myFilesPageData.headerIconAlt}
          />
          <PageTitle>My Files</PageTitle>
        </CartHeaderLogo>
        <ReadMeBtnDiv>
          <ReadMeButton
            onClick={displayReadMeHandler}
            color="primary"
            variant="contained"
            endIcon={<ReadMoreSVG />}
          >
            README
          </ReadMeButton>

          <FileCartCount>
            <div>
              <span>{defaultTo(filesId, []).length || 0}</span> Files in your
              cart
            </div>
          </FileCartCount>
        </ReadMeBtnDiv>
      </CartHeader>

      {!!defaultTo(filesId, []).length && (
        <OverviewWidgetWrapper>
          <OverviewWidget fileIds={filesId} />
        </OverviewWidgetWrapper>
      )}

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
