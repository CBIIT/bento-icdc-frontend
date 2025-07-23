import React from 'react';
import {
  BreadcrumbNavLink,
  BreadcrumbSpan,
  Container,
} from './BreadcrumbView.styled';
import { startCase } from 'lodash';
import { BreadcrumbData } from '../../pages/caseDetails/caseDetailsView';

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
                {startCase(current.name)}
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
