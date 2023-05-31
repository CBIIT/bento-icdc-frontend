import React from 'react';
import ReadMeComponent from './ReadMe.component';

const ReadMeController = ({
  display,
  displayReadMeDialog,
  config,
  content,
}) => {
  if (!content) {
    return <></>;
  }

  return (
    <>
      <ReadMeComponent
        display={display}
        displayReadMeDialog={displayReadMeDialog}
        content={content}
        title={config.readMeTitle}
      />
    </>
  );
};

export default ReadMeController;
