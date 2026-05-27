// src/components/Breadcrumb/BreadcrumbView.tsx
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
      {data.reduce<React.ReactNode[]>((acc, current, index) => {
        const breadcrumbName = current.name ?? '';

        if (current.isALink && current.to) {
          acc.push(
            <BreadcrumbNavLink key={`breadcrumb-link-${index}`} to={current.to}>
              {startCase(breadcrumbName)}
            </BreadcrumbNavLink>
          );
        } else {
          acc.push(
            <BreadcrumbSpan key={`breadcrumb-span-${index}`}>
              {breadcrumbName}
            </BreadcrumbSpan>
          );
        }

        if (index < data.length - 1) {
          acc.push(
            <div
              key={`breadcrumb-separator-${index}`}
              style={{ fontSize: '15px' }}
            >
              {'>'}
            </div>
          );
        }

        return acc;
      }, [])}
    </Container>
  );
};

export default CustomBreadcrumb;
