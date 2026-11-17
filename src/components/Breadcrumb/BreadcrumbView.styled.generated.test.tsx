// src/components/Breadcrumb/BreadcrumbView.styled.generated.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  Container,
  BreadcrumbNavLink,
  BreadcrumbSpan,
} from './BreadcrumbView.styled';

describe('BreadcrumbView.styled', () => {
  describe('Container', () => {
    it('renders as a div and mounts children', () => {
      render(
        <Container data-testid="container">
          <span>child</span>
        </Container>
      );

      const el = screen.getByTestId('container');
      expect(el.tagName.toLowerCase()).toBe('div');
      expect(el).not.toBeNull();
      expect(el.className).toBeTruthy();
      expect(screen.getByText('child')).not.toBeNull();
    });

    it('renders with no children without crashing', () => {
      render(<Container data-testid="container-empty" />);
      const el = screen.getByTestId('container-empty');
      expect(el).not.toBeNull();
      expect(el.textContent).toBe('');
    });
  });

  describe('BreadcrumbNavLink', () => {
    it('renders as an anchor with correct href when wrapped in a router', () => {
      render(
        <MemoryRouter>
          <BreadcrumbNavLink to="/" data-testid="nav-link">
            Home
          </BreadcrumbNavLink>
        </MemoryRouter>
      );

      const link = screen.getByTestId('nav-link') as HTMLAnchorElement;
      expect(link.tagName.toLowerCase()).toBe('a');
      expect(link.getAttribute('href')).toBe('/');
      expect(link.textContent).toBe('Home');
      expect(link.className).toBeTruthy();
    });

    it('throws an error if used outside of a router', () => {
      const errorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() =>
        render(
          <BreadcrumbNavLink to="/" data-testid="nav-link-outside">
            Outside
          </BreadcrumbNavLink>
        )
      ).toThrow();

      errorSpy.mockRestore();
    });

    it('allows empty children', () => {
      render(
        <MemoryRouter>
          <BreadcrumbNavLink to="/" data-testid="nav-link-empty" />
        </MemoryRouter>
      );

      const link = screen.getByTestId('nav-link-empty');
      expect(link).not.toBeNull();
      expect(link.textContent).toBe('');
    });
  });

  describe('BreadcrumbSpan', () => {
    it('renders as a span and mounts children', () => {
      render(<BreadcrumbSpan data-testid="crumb-span">Section</BreadcrumbSpan>);

      const span = screen.getByTestId('crumb-span');
      expect(span.tagName.toLowerCase()).toBe('span');
      expect(span.textContent).toBe('Section');
      expect(span.className).toBeTruthy();
    });

    it('renders empty content when no children are provided', () => {
      render(<BreadcrumbSpan data-testid="crumb-span-empty" />);

      const span = screen.getByTestId('crumb-span-empty');
      expect(span).not.toBeNull();
      expect(span.textContent).toBe('');
    });
  });
});
