import React from 'react';
import { ButtonView } from '../../../bento-core';

// type clean up
export interface TooltipConfig {
  src: string;
  icon: string;
  alt: string;
  arrow: boolean;
  tooltipText: string;
  toolTipText: string;
  clsName: string;
}

interface ComponentProps {
  title: string;
  clsName: string;
  dataKey: string;
  addFileQuery: string;
  responseKeys: string[];
  tooltipCofig: TooltipConfig;
  buttonType: string;
  alertMessage: string;
  activeFilters: object;
}

export const AddSelectedFilesButton: React.FC<ComponentProps> = ({
  title,
  clsName,
  dataKey,
  addFileQuery,
  responseKeys,
  tooltipCofig,
  buttonType,
  alertMessage = '',
  activeFilters = {},
}) => {
  return (
    <ButtonView
      btnType={buttonType}
      title={title}
      clsName={clsName}
      dataKey={dataKey}
      addFileQuery={addFileQuery}
      classes={{}}
      responseKeys={responseKeys}
      tooltipCofig={tooltipCofig}
      alertMessage={alertMessage}
      activeFilters={activeFilters}
      maxFileLimit={10000}
    />
  );
};
