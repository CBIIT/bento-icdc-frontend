import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';

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
}
const TabLabel: React.FC<TabLabelProps> = ({
  title,
  primaryColorStyles,
  icon,
}) => (
  <Wrapper primaryColorStyles={primaryColorStyles}>
    {icon && <img src={icon} alt="icdc_carousel_tabs" />}
    <span>{title} </span>
  </Wrapper>
);

export default TabLabel;
