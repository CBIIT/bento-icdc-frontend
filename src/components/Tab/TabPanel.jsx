// import React from 'react';
// import styled from '@emotion/styled';

// export const Container = styled.div(props => ({
//   ...props.styles,
// }));

// export const InnerContaner = styled.div(props => ({
//   ...props.styles,
// }));

// const TabPanel = ({ children, value, index, style, innerDivStyle }) => (
//   <Container
//     role="tabpanel"
//     hidden={value !== index}
//     styles={
//       style
//         ? { ...style, display: value !== index ? 'none' : 'flex' }
//         : undefined
//     }
//   >
//     <InnerContaner styles={{ ...innerDivStyle }}>{children}</InnerContaner>
//   </Container>
// );

// export default TabPanel;

import React from 'react';
import styled from '@emotion/styled';

export const Container = styled.div({});

export const InnerContainer = styled.div({});

const TabPanel = ({ children, value, index, style, innerDivStyle }) => (
  <Container
    role="tabpanel"
    hidden={value !== index}
    style={
      style
        ? { ...style, display: value !== index ? 'none' : 'flex' }
        : value !== index
          ? { display: 'none' }
          : undefined
    }
  >
    <InnerContainer style={innerDivStyle}>{children}</InnerContainer>
  </Container>
);

export default TabPanel;
