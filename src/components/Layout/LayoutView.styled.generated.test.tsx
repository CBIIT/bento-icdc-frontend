// src/components/Layout/LayoutView.styled.test.tsx
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { ContentWrapper, HeaderContainer } from './LayoutView.styled';

describe('LayoutView.styled', () => {
  afterEach(() => {
    cleanup();
    document.head.innerHTML = '';
    document.body.innerHTML = '';
  });

  it('renders HeaderContainer with children', () => {
    render(
      <HeaderContainer data-testid="header">
        <span>header content</span>
      </HeaderContainer>
    );

    const header = screen.getByTestId('header');

    expect(header).not.toBeNull();
    expect(header.tagName.toLowerCase()).toBe('div');
    expect(screen.getByText('header content')).not.toBeNull();
    expect(header.className).toBeTruthy();
  });

  it('renders ContentWrapper with children', () => {
    render(
      <ContentWrapper data-testid="content-wrapper">
        <div>wrapped content</div>
      </ContentWrapper>
    );

    const wrapper = screen.getByTestId('content-wrapper');

    expect(wrapper).not.toBeNull();
    expect(wrapper.tagName.toLowerCase()).toBe('div');
    expect(screen.getByText('wrapped content')).not.toBeNull();
    expect(wrapper.className).toBeTruthy();
  });

  it('renders both styled components without error', () => {
    const { container } = render(
      <div>
        <HeaderContainer>header</HeaderContainer>
        <ContentWrapper>content</ContentWrapper>
      </div>
    );

    expect(container).toBeTruthy();
    expect(screen.getByText('header')).not.toBeNull();
    expect(screen.getByText('content')).not.toBeNull();
  });
});
