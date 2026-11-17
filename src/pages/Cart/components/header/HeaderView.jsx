import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useCartReadMe } from '../../useCartReadMe';
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
  const {
    data: content,
    isError,
    refetch,
  } = useCartReadMe(env.REACT_APP_FILE_CENTRIC_CART_README);

  useEffect(() => {
    if (!isError) return;

    const message = 'Unable to load README content.';
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
