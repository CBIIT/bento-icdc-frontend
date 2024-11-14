import React from 'react';
import {
  BreadcrumbNavLink,
  BreadcrumbSpan,
  Container,
} from './BreadcrumbView.styled';

interface CustomBreadcrumbProps {
  data: {
    name: string;
    to: string;
    isALink: boolean;
  }[];
}

const CustomBreadcrumb: React.FC<CustomBreadcrumbProps> = ({ data }) => {
  return (
    <Container>
      {data
        .reduce<React.ReactNode[]>((acc, current, index) => {
          if (current.isALink) {
            acc.push(
              <BreadcrumbNavLink to={current.to}>
                {current.name}
              </BreadcrumbNavLink>
            );
          } else {
            acc.push(<BreadcrumbSpan>{current.name}</BreadcrumbSpan>);
          }
          if (index < data.length - 1) {
            acc.push(<div style={{ fontSize: '15px' }}>{'>'}</div>);
          }
          return acc;
        }, [])
        .map(item => item)}
    </Container>
  );
};

export default CustomBreadcrumb;
