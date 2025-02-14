import React from 'react';
import {
  BreadcrumbNavLink,
  BreadcrumbSpan,
  Container,
} from './BreadcrumbView.styled';
import { toUpper } from 'lodash';

export interface BreadcrumbData {
  name: string | undefined | null;
  to?: string;
  isALink: boolean;
}
interface CustomBreadcrumbProps {
  data: BreadcrumbData[];
}

const CustomBreadcrumb: React.FC<CustomBreadcrumbProps> = ({ data }) => {
  return (
    <Container>
      {data
        .reduce<React.ReactNode[]>((acc, current, index) => {
          if (current.isALink && current.to) {
            acc.push(
              <BreadcrumbNavLink to={current.to}>
                {toUpper(current.name)}
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
