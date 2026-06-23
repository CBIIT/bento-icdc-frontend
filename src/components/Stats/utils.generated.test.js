// src/components/Stats/utils.test.js
import * as utils from './utils';

describe('humanFileSize', () => {
  test('returns empty string when input is undefined', () => {
    expect(utils.humanFileSize(undefined)).toBe('');
  });

  test('returns empty string when input is null', () => {
    expect(utils.humanFileSize(null)).toBe('');
  });

  test('returns empty string when input is a string', () => {
    expect(utils.humanFileSize('1024')).toBe('');
  });

  test('returns empty string when input is an object', () => {
    expect(utils.humanFileSize({})).toBe('');
  });

  test('returns 0 B when input is 0', () => {
    expect(utils.humanFileSize(0)).toBe('0 B');
  });

  test('returns bytes when size is less than 1024', () => {
    expect(utils.humanFileSize(1023)).toBe('1023 B');
  });

  test('returns 1 KB when input is 1024', () => {
    expect(utils.humanFileSize(1024)).toBe('1 KB');
  });

  test('formats KB values with up to two decimals', () => {
    expect(utils.humanFileSize(1536)).toBe('1.5 KB');
  });

  test('returns 1 MB for 1024^2', () => {
    expect(utils.humanFileSize(1024 ** 2)).toBe('1 MB');
  });

  test('returns 1 GB for 1024^3', () => {
    expect(utils.humanFileSize(1024 ** 3)).toBe('1 GB');
  });

  test('returns 1 TB for 1024^4', () => {
    expect(utils.humanFileSize(1024 ** 4)).toBe('1 TB');
  });

  test('returns NaN undefined for NaN input', () => {
    expect(utils.humanFileSize(NaN)).toBe('NaN undefined');
  });

  test('returns NaN undefined for negative numbers', () => {
    expect(utils.humanFileSize(-1)).toBe('NaN undefined');
  });

  test('returns 1 undefined for values beyond TB', () => {
    expect(utils.humanFileSize(1024 ** 5)).toBe('1 undefined');
  });
});

describe('updateStat', () => {
  test('subtracts study files from total files and formats volumeOfData', () => {
    const input = {
      numberOfStudyFiles: 5,
      numberOfFiles: 20,
      volumeOfData: 1024 ** 2,
      otherField: 'keep-me',
    };

    const result = utils.updateStat(input);

    expect(result).not.toBe(input);
    expect(result.numberOfFiles).toBe(15);
    expect(result.volumeOfData).toBe('1 MB');
    expect(result.otherField).toBe('keep-me');
    expect(input.numberOfFiles).toBe(20);
    expect(input.volumeOfData).toBe(1024 ** 2);
  });

  test('clamps numberOfFiles to 0 when subtraction is negative', () => {
    const input = {
      numberOfStudyFiles: 10,
      numberOfFiles: 3,
      volumeOfData: 0,
    };

    const result = utils.updateStat(input);

    expect(result.numberOfFiles).toBe(0);
    expect(result.volumeOfData).toBe('0 B');
  });

  test('sets numberOfFiles to 0 when counts are equal', () => {
    const input = {
      numberOfStudyFiles: 7,
      numberOfFiles: 7,
      volumeOfData: 1536,
    };

    const result = utils.updateStat(input);

    expect(result.numberOfFiles).toBe(0);
    expect(result.volumeOfData).toBe('1.5 KB');
  });

  test('formats volumeOfData using humanFileSize', () => {
    const input = {
      numberOfStudyFiles: 1,
      numberOfFiles: 2,
      volumeOfData: 1024,
    };

    const result = utils.updateStat(input);

    expect(result.volumeOfData).toBe('1 KB');
    expect(result.numberOfFiles).toBe(1);
  });

  test('handles missing properties by defaulting to 0 files and empty volume string', () => {
    const result = utils.updateStat({});

    expect(result.numberOfFiles).toBe(0);
    expect(result.volumeOfData).toBe('');
  });

  test('throws TypeError when stat is undefined', () => {
    expect(() => utils.updateStat(undefined)).toThrow(TypeError);
  });

  test('throws TypeError when stat is null', () => {
    expect(() => utils.updateStat(null)).toThrow(TypeError);
  });
});
