import React from 'react';
import { ButtonView } from '../../../bento-core';

interface TooltipConfig {
  src: string;
  alt: string;
  arrow: boolean;
  tooltipText: string;
}

interface ComponentProps {
  title: string;
  clsName: string;
  dataKey: string;
  addFileQuery: string;
  responseKeys: string[];
  tooltipCofig: TooltipConfig;
  buttonType: string;
  classes: unknown;
}

export const AddSelectedFilesButton: React.FC<ComponentProps> = ({
  title,
  clsName,
  dataKey,
  addFileQuery,
  responseKeys,
  tooltipCofig,
  classes = {},
  buttonType,
}) => {
  return (
    <ButtonView
      btnType={buttonType}
      title={title}
      clsName={clsName}
      classes={classes}
      dataKey={dataKey}
      addFileQuery={addFileQuery}
      responseKeys={responseKeys}
      tooltipCofig={tooltipCofig}
    />
  );
};
