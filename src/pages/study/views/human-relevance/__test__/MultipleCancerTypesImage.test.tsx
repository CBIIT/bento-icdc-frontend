import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MultipleCancerTypesImage } from '../MultipleCancerTypesImage';

const transparentPixel =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

const cancerTypeToImageKey = (cancerType: string): string | undefined =>
  (
    ({
      'Bone Cancer': 'bone',
      Lymphoma: 'lymphoma',
      'Soft Tissue Sarcoma': 'soft_tissue_sarcoma',
    }) as Record<string, string | undefined>
  )[cancerType];

describe('MultipleCancerTypesImage', () => {
  it('renders mapped cancer types and filters unmapped values', () => {
    const { container } = render(
      <MultipleCancerTypesImage
        cancerTypes={['Bone Cancer', 'Unknown Cancer', 'Lymphoma']}
        cancerTypeToImageKey={cancerTypeToImageKey}
        cancerTypeImages={{
          bone: { src: transparentPixel, alt: 'Bone cancer detail' },
          lymphoma: { src: transparentPixel, alt: 'Lymphoma detail' },
        }}
      />
    );

    expect(screen.getByText('Bone Cancer')).toBeTruthy();
    expect(screen.getByText('Lymphoma')).toBeTruthy();
    expect(screen.queryByText('Unknown Cancer')).toBeNull();
    expect(
      container.querySelector('[data-testid="human-relevance-hotspot"]')
    ).toBeNull();

    fireEvent.mouseEnter(screen.getByText('Bone Cancer'));

    expect(screen.getByAltText('Bone cancer detail')).toBeTruthy();
    expect(
      container.querySelector('[data-testid="human-relevance-hotspot"]')
    ).toBeTruthy();
  });

  it('renders a body glow with a connector line instead of a hotspot for soft tissue sarcoma', () => {
    const { container } = render(
      <MultipleCancerTypesImage
        cancerTypes={['Soft Tissue Sarcoma']}
        cancerTypeToImageKey={cancerTypeToImageKey}
        cancerTypeImages={{
          soft_tissue_sarcoma: {
            src: transparentPixel,
            alt: 'Soft tissue sarcoma detail',
          },
        }}
      />
    );

    fireEvent.mouseEnter(screen.getByText('Soft Tissue Sarcoma'));

    expect(
      container.querySelector('[data-testid="human-relevance-body-glow"]')
    ).toBeTruthy();
    expect(
      container.querySelector(
        '[data-testid="human-relevance-body-glow-line-anchor"]'
      )
    ).toBeTruthy();
    expect(
      container.querySelector('[data-testid="human-relevance-hotspot"]')
    ).toBeNull();
    expect(container.querySelector('svg line')).toBeTruthy();
  });
});
