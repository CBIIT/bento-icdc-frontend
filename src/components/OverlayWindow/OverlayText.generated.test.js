// src/components/OverlayWindow/OverlayText.test.js

import { text } from './OverlayText';

describe('OverlayText', () => {
  const expectedContent = [
    'This warning banner provides privacy and security notices consistent with applicable federal laws, directives, and other federal guidance for accessing this Government system, which includes (1) this computer network, (2) all computers connected to this network, and (3) all devices and storage media attached to this network or to a computer on this network.',
    'This system is provided for Government-authorized use only.',
    'Unauthorized or improper use of this system is prohibited and may result in disciplinary action and/or civil and criminal penalties.',
    'Personal use of social media and networking sites on this system is limited as to not interfere with official work duties and is subject to monitoring.',
  ];

  const expectedList = [
    'The Government may monitor, record, and audit your system usage, including usage of personal devices and email systems for official duties or to conduct HHS business. Therefore, you have no reasonable expectation of privacy regarding any communication or data transiting or stored on this system. At any time, and for any lawful Government purpose, the government may monitor, intercept, and search and seize any communication or data transiting or stored on this system.',
    'Any communication or data transiting or stored on this system may be disclosed or used for any lawful Government purpose.',
  ];

  describe('exports and shape', () => {
    it('should export a text object with content and list arrays', () => {
      expect(text).toBeDefined();
      expect(typeof text).toBe('object');
      expect(Array.isArray(text.content)).toBe(true);
      expect(Array.isArray(text.list)).toBe(true);
    });

    it('should have the correct number of items', () => {
      expect(text.content).toHaveLength(4);
      expect(text.list).toHaveLength(2);
    });
  });

  describe('exact values and order', () => {
    it('should contain the exact content paragraphs in order', () => {
      expect(text.content).toEqual(expectedContent);
    });

    it('should contain the exact list items in order', () => {
      expect(text.list).toEqual(expectedList);
    });
  });

  describe('string formatting/quality checks', () => {
    it('should not have leading or trailing whitespace in any string', () => {
      const allStrings = [...text.content, ...text.list];
      for (const s of allStrings) {
        expect(s).toBe(s.trim());
      }
    });

    it('should end each string with a period', () => {
      const allStrings = [...text.content, ...text.list];
      for (const s of allStrings) {
        expect(s.endsWith('.')).toBe(true);
      }
    });

    it('should have non-empty strings for all entries', () => {
      const allStrings = [...text.content, ...text.list];
      for (const s of allStrings) {
        expect(typeof s).toBe('string');
        expect(s.length).toBeGreaterThan(0);
      }
    });
  });

  describe('non-mutating usage', () => {
    it('modifying a local copy should not affect the exported data', () => {
      const localCopy = [...text.content];
      localCopy.push('Temporary test string.');
      expect(localCopy).toHaveLength(text.content.length + 1);
      // Ensure original export remains unchanged
      expect(text.content).toEqual(expectedContent);
    });
  });

  describe('edge/boundary semantics', () => {
    it('should preserve the specific terminology and keywords', () => {
      // Spot-check for critical keywords to ensure content integrity
      expect(text.content[0]).toContain('Government');
      expect(text.content[0]).toContain('computer network');
      expect(text.content[1]).toContain('Government-authorized');
      expect(text.list[0]).toContain('monitor');
      expect(text.list[0]).toContain('no reasonable expectation of privacy');
      expect(text.list[1]).toContain('disclosed or used');
    });
  });
});
