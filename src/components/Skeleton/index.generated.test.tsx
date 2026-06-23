// src/components/Skeleton/index.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import { SkeletonLoader } from './index';

type SkeletonLoaderProps = React.ComponentProps<typeof SkeletonLoader>;

describe('SkeletonLoader', () => {
  const getSkeletonCounts = (container: HTMLElement) => {
    const all = container.querySelectorAll('.MuiSkeleton-root');
    const rectangular = container.querySelectorAll('.MuiSkeleton-rectangular');
    const rounded = container.querySelectorAll('.MuiSkeleton-rounded');
    const circular = container.querySelectorAll('.MuiSkeleton-circular');

    return {
      all: all.length,
      rectangular: rectangular.length,
      rounded: rounded.length,
      circular: circular.length,
    };
  };

  const renderSkeleton = (variant?: SkeletonLoaderProps['variant']) =>
    render(<SkeletonLoader variant={variant} />);

  describe('default variant', () => {
    it('renders a single rectangular skeleton', () => {
      const { container } = render(<SkeletonLoader />);
      const counts = getSkeletonCounts(container);

      expect(counts.all).toBe(1);
      expect(counts.rectangular).toBe(1);
      expect(counts.rounded).toBe(0);
      expect(counts.circular).toBe(0);
    });

    it('renders the same default layout when variant is undefined', () => {
      const { container } = renderSkeleton(undefined);
      const counts = getSkeletonCounts(container);

      expect(counts.all).toBe(1);
      expect(counts.rectangular).toBe(1);
      expect(counts.rounded).toBe(0);
      expect(counts.circular).toBe(0);
    });
  });

  describe('withSidebar variant', () => {
    it('renders three rectangular skeletons', () => {
      const { container } = render(<SkeletonLoader variant="withSidebar" />);
      const counts = getSkeletonCounts(container);

      expect(counts.all).toBe(3);
      expect(counts.rectangular).toBe(3);
      expect(counts.rounded).toBe(0);
      expect(counts.circular).toBe(0);
    });
  });

  describe('cartOverviewWidget variant', () => {
    it('renders one rounded skeleton inside the wrapper', () => {
      const { container } = render(
        <SkeletonLoader variant="cartOverviewWidget" />
      );
      const counts = getSkeletonCounts(container);

      expect(counts.all).toBe(1);
      expect(counts.rectangular).toBe(0);
      expect(counts.rounded).toBe(1);
      expect(counts.circular).toBe(0);

      const wrapper = container.querySelector('.wrapper');
      expect(wrapper).not.toBeNull();
      expect(wrapper?.querySelector('.MuiSkeleton-root')).not.toBeNull();
    });
  });

  describe('withRounded variant', () => {
    it('renders one circular and one rectangular skeleton', () => {
      const { container } = render(<SkeletonLoader variant="withRounded" />);
      const counts = getSkeletonCounts(container);

      expect(counts.all).toBe(2);
      expect(counts.circular).toBe(1);
      expect(counts.rectangular).toBe(1);
      expect(counts.rounded).toBe(0);
    });
  });

  describe('invalid input handling', () => {
    it('falls back to default layout for unsupported runtime values', () => {
      const invalidVariant = 'invalid' as never;
      const { container } = render(<SkeletonLoader variant={invalidVariant} />);
      const counts = getSkeletonCounts(container);

      expect(counts.all).toBe(1);
      expect(counts.rectangular).toBe(1);
      expect(counts.rounded).toBe(0);
      expect(counts.circular).toBe(0);
    });
  });
});
