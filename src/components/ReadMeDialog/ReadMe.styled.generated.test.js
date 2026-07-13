// src/components/ReadMeDialog/ReadMe.styled.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  TitleContent,
  Title,
  DialogActionContent,
  DownloadButton,
  DownloadIcon,
  ClosButton,
  CloseBtnIcon,
  ReadMeContentContainer,
  DialogBox,
} from './ReadMe.styled';

describe('ReadMe.styled components', () => {
  const rgb = (r, g, b) => `rgb(${r}, ${g}, ${b})`;

  describe('TitleContent', () => {
    it('renders without crashing', () => {
      render(<TitleContent data-testid="title-content" />);
      expect(screen.getByTestId('title-content')).toBeTruthy();
    });
  });

  describe('Title', () => {
    it('applies base typography and color styles', () => {
      render(<Title data-testid="title">ReadMe</Title>);
      const el = screen.getByTestId('title');
      const cs = getComputedStyle(el);

      expect(cs.fontSize).toBe('23px');
      expect(cs.marginTop).toBe('20px');
      expect(cs.display).toBe('inherit');
      expect(cs.fontWeight).toBe('500');
      expect(cs.color).toBe(rgb(13, 113, 163));
      expect(cs.cssFloat || cs.float).toBe('left');
      expect(cs.fontFamily.toLowerCase()).toContain('nunito');
    });
  });

  describe('DialogActionContent', () => {
    it('applies alignment and font size', () => {
      render(
        <DialogActionContent data-testid="dialog-action">X</DialogActionContent>
      );
      const el = screen.getByTestId('dialog-action');
      const cs = getComputedStyle(el);

      expect(cs.paddingTop).toBe('5px');
      expect(cs.paddingRight).toBe('5px');
      expect(cs.paddingBottom).toBe('5px');
      expect(cs.paddingLeft).toBe('5px');
      expect(cs.textAlign).toBe('right');
      expect(cs.fontSize).toBe('30px');
    });
  });

  describe('DownloadButton', () => {
    it('applies sizing and spacing styles', () => {
      render(<DownloadButton data-testid="download-btn">DL</DownloadButton>);
      const el = screen.getByTestId('download-btn');
      const cs = getComputedStyle(el);

      expect(cs.minWidth).toBe('30px');
      expect(cs.paddingTop).toBe('0px');
      expect(cs.paddingRight).toBe('0px');
      expect(cs.paddingBottom).toBe('0px');
      expect(cs.paddingLeft).toBe('0px');
      expect(cs.marginTop).toBe('10px');
      expect(cs.marginRight).toBe('7px');
      expect(cs.marginBottom).toBe('0px');
      expect(cs.marginLeft).toBe('0px');
    });
  });

  describe('DownloadIcon', () => {
    it('applies size and color styles', () => {
      render(<DownloadIcon data-testid="download-icon" alt="dl" />);
      const el = screen.getByTestId('download-icon');
      const cs = getComputedStyle(el);

      expect(cs.width).toBe('30px');
      expect(cs.height).toBe('30px');
      expect(cs.color).toBe(rgb(255, 255, 255));
    });
  });

  describe('ClosButton', () => {
    it('applies padding styles', () => {
      render(<ClosButton data-testid="close-btn" aria-label="close" />);
      const el = screen.getByTestId('close-btn');
      const cs = getComputedStyle(el);

      expect(cs.paddingTop).toBe('8px');
      expect(cs.paddingLeft).toBe('0px');
    });
  });

  describe('CloseBtnIcon', () => {
    it('applies icon styles', () => {
      render(<CloseBtnIcon data-testid="close-icon" />);
      const el = screen.getByTestId('close-icon');
      const cs = getComputedStyle(el);

      expect(cs.paddingTop).toBe('5px');
      expect(cs.paddingRight).toBe('5px');
      expect(cs.paddingBottom).toBe('5px');
      expect(cs.paddingLeft).toBe('5px');
      expect(cs.textAlign).toBe('right');
      expect(cs.fontSize).toBe('30px');
    });
  });

  describe('ReadMeContentContainer', () => {
    it('applies container sizing and overflow styles', () => {
      render(<ReadMeContentContainer data-testid="readme-container" />);
      const el = screen.getByTestId('readme-container');
      const cs = getComputedStyle(el);

      expect(cs.height).toBe('700px');
      expect(cs.overflowY).toBe('scroll');
      expect(cs.paddingRight).toBe('20px');
      expect(cs.paddingLeft).toBe('25px');
      expect(cs.lineHeight).toBe('1.5');
    });

    it('applies nested heading styles (h1-h5)', () => {
      render(
        <ReadMeContentContainer>
          <h1 data-testid="h1">Title</h1>
          <h3 data-testid="h3">Sub</h3>
        </ReadMeContentContainer>
      );

      const h1 = screen.getByTestId('h1');
      const h3 = screen.getByTestId('h3');

      const h1cs = getComputedStyle(h1);
      const h3cs = getComputedStyle(h3);

      expect(h1cs.color).toBe(rgb(0, 0, 0));
      expect(h1cs.fontWeight).toBe('700');
      expect(h1cs.lineHeight).toBe('40px');

      expect(h3cs.color).toBe(rgb(0, 0, 0));
      expect(h3cs.fontWeight).toBe('700');
      expect(h3cs.lineHeight).toBe('40px');
    });

    it('applies nested paragraph and list item styles', () => {
      render(
        <ReadMeContentContainer>
          <p data-testid="p">Paragraph</p>
          <ul>
            <li data-testid="li">Item</li>
          </ul>
        </ReadMeContentContainer>
      );

      const p = screen.getByTestId('p');
      const li = screen.getByTestId('li');

      const pcs = getComputedStyle(p);
      const lics = getComputedStyle(li);

      expect(pcs.marginTop).toBe('5px');
      expect(pcs.fontSize).toBe('18px');
      expect(pcs.letterSpacing).toBe('0.2px');
      expect(pcs.lineHeight).toBe('30px');
      expect(pcs.fontWeight).toBe('400');
      expect(pcs.fontFamily.toLowerCase()).toContain('open sans');

      expect(lics.marginTop).toBe('5px');
      expect(lics.fontSize).toBe('18px');
      expect(lics.letterSpacing).toBe('0.2px');
      expect(lics.lineHeight).toBe('30px');
      expect(lics.fontWeight).toBe('400');
      expect(lics.fontFamily.toLowerCase()).toContain('open sans');
    });

    it('applies nested anchor styles', () => {
      render(
        <ReadMeContentContainer>
          <a href="#" data-testid="a">
            Link
          </a>
        </ReadMeContentContainer>
      );

      const a = screen.getByTestId('a');
      const acs = getComputedStyle(a);

      expect(acs.color).toBe(rgb(184, 83, 0));
      expect(acs.fontFamily.toLowerCase()).toContain('open sans');
      expect(acs.fontWeight).toBe('600');
      expect(acs.textDecorationLine || acs.textDecoration).toContain(
        'underline'
      );
      expect(acs.cursor).toBe('pointer');
    });
  });

  describe('DialogBox', () => {
    it('applies container styles and nested paper padding', () => {
      render(
        <DialogBox open onClose={() => {}} aria-labelledby="dialog-title">
          <div>Content</div>
        </DialogBox>
      );

      const paper = document.querySelector('.MuiDialog-paper');
      expect(paper).toBeTruthy();

      const paperCS = getComputedStyle(paper);
      expect(paperCS.paddingTop).toBe('0px');
      expect(paperCS.paddingRight).toBe('0px');
      expect(paperCS.paddingBottom).toBe('0px');
      expect(paperCS.paddingLeft).toBe('20px');

      const dialogRoot = paper?.parentElement?.parentElement;
      if (dialogRoot) {
        const rootCS = getComputedStyle(dialogRoot);
        expect(rootCS.overflowY).toBe('scroll');
        expect(rootCS.paddingBottom).toBe('10px');
      }
    });

    it('renders safely when closed (edge case)', () => {
      render(
        <DialogBox open={false} onClose={() => {}}>
          <div>Hidden</div>
        </DialogBox>
      );

      const paper = document.querySelector('.MuiDialog-paper');
      expect(paper).toBeNull();
    });
  });
});
