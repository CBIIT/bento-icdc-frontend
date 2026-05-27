// src/components/ReadMeDialog/ReadMe.controller.test.jsx
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import ReadMeController from './ReadMe.controller.jsx';

jest.mock('./ReadMe.component', () => ({
  __esModule: true,
  default: props => (
    <div
      data-testid="readme-component"
      data-title={props.title}
      data-content={props.content}
      data-display={String(Boolean(props.display))}
    >
      <button
        type="button"
        data-testid="readme-action"
        onClick={props.displayReadMeDialog}
      >
        action
      </button>
    </div>
  ),
}));

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

describe('ReadMeController', () => {
  describe('when content is falsy', () => {
    const commonProps = {
      display: true,
      displayReadMeDialog: jest.fn(),
      config: { readMeTitle: 'Some Title' },
    };

    test.each([
      ['undefined', undefined],
      ['null', null],
      ['empty string', ''],
      ['false boolean', false],
      ['zero number', 0],
    ])('renders nothing when content is %s', (_label, content) => {
      const { container } = render(
        <ReadMeController {...commonProps} content={content} />
      );

      expect(container.firstChild).toBeNull();
      expect(screen.queryByTestId('readme-component')).toBeNull();
    });
  });

  describe('when content is provided', () => {
    const content = '# My Readme';

    it('renders ReadMeComponent with the correct props and title from config', () => {
      render(
        <ReadMeController
          display={true}
          displayReadMeDialog={jest.fn()}
          config={{ readMeTitle: 'README Title' }}
          content={content}
        />
      );

      const readme = screen.getByTestId('readme-component');
      expect(readme).not.toBeNull();
      expect(readme.getAttribute('data-title')).toBe('README Title');
      expect(readme.getAttribute('data-content')).toBe(content);
      expect(readme.getAttribute('data-display')).toBe('true');
    });

    it('passes display=false through to ReadMeComponent', () => {
      render(
        <ReadMeController
          display={false}
          displayReadMeDialog={jest.fn()}
          config={{ readMeTitle: 'Hidden?' }}
          content={content}
        />
      );

      const readme = screen.getByTestId('readme-component');
      expect(readme.getAttribute('data-display')).toBe('false');
    });

    it('passes displayReadMeDialog through to the child component', () => {
      const displayReadMeDialog = jest.fn();

      render(
        <ReadMeController
          display={true}
          displayReadMeDialog={displayReadMeDialog}
          config={{ readMeTitle: 'Title' }}
          content={content}
        />
      );

      fireEvent.click(screen.getByTestId('readme-action'));
      expect(displayReadMeDialog).toHaveBeenCalledTimes(1);
    });
  });

  describe('error handling', () => {
    it('throws when config is undefined while content is provided', () => {
      expect(() =>
        render(
          <ReadMeController
            display={true}
            displayReadMeDialog={jest.fn()}
            config={undefined}
            content="Some content"
          />
        )
      ).toThrow(TypeError);
    });

    it('does not throw when config is undefined but content is falsy', () => {
      const { container } = render(
        <ReadMeController
          display={true}
          displayReadMeDialog={jest.fn()}
          config={undefined}
          content=""
        />
      );

      expect(container.firstChild).toBeNull();
    });
  });
});
