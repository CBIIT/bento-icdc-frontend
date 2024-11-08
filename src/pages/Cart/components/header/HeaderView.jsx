import React, { useEffect, useState } from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import { myFilesPageData } from '../../../../bento/fileCentricCartWorkflowData';
import ReadMeDialogComponent from '../../../../components/ReadMeDialog/ReadMe.controller';
import ReadMoreSVG from '../readMore';
import DropDownView from '../dropdown/DropDownView';
import * as Styled from './Header.styled';

const HeaderView = ({ filesId }) => {
  const [displayReadMe, setDisplayReadMe] = useState(false);
  const [content, setContent] = useState(undefined);

  // if allFile radio button is true download all file with Download manifest btn
  const [allFiles, setAllFiles] = useState(true);

  const getReadMe = async url => {
    const { data } = await axios.get(url);
    setContent(data);
  };

  useEffect(() => {
    getReadMe(process.env.REACT_APP_FILE_CENTRIC_CART_README);
  }, []);

  const displayReadMeHandler = () => {
    setDisplayReadMe(!displayReadMe);
  };

  const handleRadioChange = event => {
    const isAllSelected = event.target.value === 'true';
    setAllFiles(isAllSelected);
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

      <Styled.SelectFilesActionContainer container>
        <FormControl>
          <RadioGroup
            row
            name="selectAll"
            value={allFiles}
            onChange={handleRadioChange}
          >
            <Styled.SelectAllFilesBtn
              value={true}
              control={<Styled.RadioInput />}
              label="All Files"
            />
            <Styled.SelectFilesBtn
              value={false}
              control={<Styled.RadioInput />}
              className="selectFilesBtn"
              label="Selected Files"
            />
          </RadioGroup>
        </FormControl>
        <DropDownView filesId={filesId} allFiles={allFiles} />
      </Styled.SelectFilesActionContainer>

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
