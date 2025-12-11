import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { startCase } from 'lodash';

const Wrapper = styled.div<{ primaryColorStyles: CSSProperties }>(
  ({ primaryColorStyles }) => {
    const base: CSSProperties = {
      fontFamily: 'Open Sans',
      textTransform: 'none',
      fontSize: '17px',
      height: '45px',
      marginBottom: '-5px',
    };

    return {
      ...base,
      ...primaryColorStyles,
    };
  }
);

interface TabLabelProps {
  title: string;
  primaryColorStyles: CSSProperties;
  icon?: string;
  iconSpacing?: string;
}
const TabLabel: React.FC<TabLabelProps> = ({
  title,
  primaryColorStyles,
  icon,
  iconSpacing = '0',
}) => (
  <Wrapper primaryColorStyles={primaryColorStyles}>
    {icon && (
      <>
        <img src={icon} alt="icdc_carousel_tabs" />
        <div style={{ height: iconSpacing }}></div>
      </>
    )}
    <span>
      {title.includes('ICDC') ? title : startCase(title.toLowerCase())}
    </span>
  </Wrapper>
);

export default TabLabel;
