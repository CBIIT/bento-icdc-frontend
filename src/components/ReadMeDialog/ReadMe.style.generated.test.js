// ReadMe.style.test.js
import getStyles from './ReadMe.style';

describe('ReadMe.style', () => {
  test('should not throw when invoked', () => {
    expect(() => getStyles()).not.toThrow();
  });

  test('should return an object with expected top-level style keys', () => {
    const styles = getStyles();

    const expectedKeys = [
      'dialogBox',
      'dialogPaper',
      'titleContent',
      'title',
      'closeBtn',
      'downloadBtn',
      'closBtnContainer',
      'downloadIcon',
      'content',
    ];

    expect(Object.keys(styles).sort()).toEqual(expectedKeys.sort());
  });

  test('should include correct values for specific style properties', () => {
    const styles = getStyles();

    // dialogBox
    expect(styles.dialogBox).toEqual({
      minWidth: '750px',
      overflowY: 'scroll',
    });

    // dialogPaper
    expect(styles.dialogPaper).toEqual({ paddingBottom: '10px' });

    // title
    expect(styles.title).toMatchObject({
      fontSize: '23px',
      marginTop: '20px',
      display: 'inherit',
      fontWeight: '500',
      color: '#0d71a3',
      float: 'left',
      fontFamily: 'Nunito Light',
    });

    // closeBtn
    expect(styles.closeBtn).toEqual({
      padding: '5px',
      textAlign: 'right',
      fontSize: '30px',
    });

    // downloadBtn
    expect(styles.downloadBtn).toMatchObject({
      height: '30px',
      width: '30px',
      marginBottom: '-10px',
      marginRight: '7px',
    });

    // closBtnContainer
    expect(styles.closBtnContainer).toEqual({ paddingTop: '8px' });

    // downloadIcon
    expect(styles.downloadIcon).toEqual({
      color: '#fff',
      height: '30px',
      width: '30px',
    });
  });

  test('should include nested selectors under content with correct styles', () => {
    const styles = getStyles();

    expect(styles.content).toMatchObject({
      height: '700px',
      overflowY: 'scroll',
      paddingRight: '20px',
      paddingLeft: '25px',
      lineHeight: '1.5',
    });

    // Nested header selectors
    expect(styles.content['& h1, h2, h3, h4, h5']).toEqual({
      color: '#000000',
      marginBottom: '0px',
      fontWeight: '700',
      lineHeight: '40px',
    });

    // Nested paragraph selector
    expect(styles.content['& p']).toEqual({
      marginTop: '5px',
      fontSize: '14px',
      fontWeight: '300',
      marginBottom: '0px',
    });
  });

  test('should create a new styles object on each call (no shared references)', () => {
    const a = getStyles();
    const b = getStyles();

    expect(a).not.toBe(b); // root object is new

    // Check a few nested objects are also different references
    expect(a.dialogBox).not.toBe(b.dialogBox);
    expect(a.title).not.toBe(b.title);
    expect(a.content).not.toBe(b.content);
    expect(a.content['& p']).not.toBe(b.content['& p']);
  });

  test('mutating one returned styles object should not affect subsequent calls', () => {
    const first = getStyles();
    // Mutate some values
    first.dialogBox.minWidth = '999px';
    first.content['& p'].fontSize = '99px';

    const second = getStyles();
    // Ensure defaults are intact on new call
    expect(second.dialogBox.minWidth).toBe('750px');
    expect(second.content['& p'].fontSize).toBe('14px');
  });
});
