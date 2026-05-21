// src/components/PaginatedTable/TableTheme.test.js

import {
  headerTheme,
  extendedView,
  tablePag,
  tblContainer,
  customTheme,
  themeConfig,
} from './TableTheme';

describe('TableTheme module', () => {
  describe('headerTheme', () => {
    it('should use provided primaryColor in tblHeader.MuiTableRow.head.borderBottom', () => {
      const color = '#112233';
      const theme = headerTheme({ primaryColor: color });
      expect(theme.tblHeader.MuiTableRow.head.borderBottom).toBe(
        `3px solid ${color}`
      );
      // sanity checks for structure
      expect(theme.tblHeader.MuiTableSortLabel.root.color).toBe('#13344A');
      expect(theme.tblHeader.MuiTableCell.root.paddingLeft).toBe('5px');
    });

    it('should use default primaryColor when primaryColor is undefined in argument object', () => {
      const theme = headerTheme({}); // primaryColor defaults to '#004c73'
      expect(theme.tblHeader.MuiTableRow.head.borderBottom).toBe(
        '3px solid #004c73'
      );
    });

    it('throws error if called without arguments (cannot destructure undefined)', () => {
      expect(() => headerTheme()).toThrow(TypeError);
    });

    it('throws error if called with null (cannot destructure null)', () => {
      // @ts-expect-error - testing runtime invalid input
      expect(() => headerTheme(null)).toThrow(TypeError);
    });
  });

  describe('tblBody (via themeConfig)', () => {
    it('exposes tblBody with expected nested rules in composed theme', () => {
      const theme = themeConfig({}, {}); // provide empty objects to avoid spread errors
      expect(theme.tblBody).toBeDefined();
      expect(theme.tblBody.MuiTableCell).toBeDefined();
      expect(theme.tblBody.MuiTableCell.root.minHeight).toBe('45px');
      expect(theme.tblBody.MuiSvgIcon.root.color).toBe('#0B3556');
    });
  });

  describe('extendedView', () => {
    it('should use default primaryColor when none provided', () => {
      const result = extendedView({});
      const toolbar =
        result.extendedView.MuiToolbar.root['&.downloadAndColumnView'];
      expect(toolbar.borderBottom).toBe('3px solid #FF9742');
    });

    it('should use provided primaryColor', () => {
      const color = '#aabbcc';
      const result = extendedView({ primaryColor: color });
      const toolbar =
        result.extendedView.MuiToolbar.root['&.downloadAndColumnView'];
      expect(toolbar.borderBottom).toBe(`3px solid ${color}`);
    });

    it('throws error if called without arguments (cannot destructure undefined)', () => {
      expect(() => extendedView()).toThrow(TypeError);
    });
  });

  describe('tablePag', () => {
    it('should apply primaryColor to top and bottom borders', () => {
      const color = '#556677';
      const result = tablePag({ primaryColor: color });
      const root = result.tblPgn.MuiTablePagination.root;
      expect(root.borderTop).toBe(`3px solid ${color}`);
      expect(root.borderBottom).toBe(`3px solid ${color}`);
    });

    it('should use default primaryColor when missing in argument object', () => {
      const result = tablePag({});
      const root = result.tblPgn.MuiTablePagination.root;
      expect(root.borderTop).toBe('3px solid #004c73');
      expect(root.borderBottom).toBe('3px solid #004c73');
    });

    it('throws error if called without arguments (cannot destructure undefined)', () => {
      expect(() => tablePag()).toThrow(TypeError);
    });
  });

  describe('tblContainer', () => {
    it('should apply primaryColor to table borderTop', () => {
      const color = '#0099aa';
      const result = tblContainer({ primaryColor: color });
      expect(result.tblContainer.MuiTable.root.borderTop).toBe(
        `3px solid ${color}`
      );
    });

    it('should use default primaryColor when missing in argument object', () => {
      const result = tblContainer({});
      expect(result.tblContainer.MuiTable.root.borderTop).toBe(
        '3px solid #004c73'
      );
    });

    it('throws error if called without arguments (cannot destructure undefined)', () => {
      expect(() => tblContainer()).toThrow(TypeError);
    });
  });

  describe('customTheme (static shape)', () => {
    it('should expose expected top-level keys and nested rules', () => {
      expect(
        customTheme.MuiButton.root['&.add_selected_button'].backgroundColor
      ).toBe('#B35000');
      expect(customTheme.MuiDialog.paper.border).toBe('2px solid #A61401');
      expect(customTheme.MuiContainer.root['& img'].width).toBe('17px');
    });
  });

  describe('themeConfig (composition)', () => {
    it('composes sub-themes and respects primaryColor from styles for header/tbl/pagination', () => {
      const stylesColor = '#123456';
      const tableColor = '#abcdef';
      const theme = themeConfig(
        { primaryColor: stylesColor },
        { primaryColor: tableColor }
      );

      // headerTheme -> uses stylesColor
      expect(theme.tblHeader.MuiTableRow.head.borderBottom).toBe(
        `3px solid ${stylesColor}`
      );

      // tblContainer -> uses stylesColor
      expect(theme.tblContainer.MuiTable.root.borderTop).toBe(
        `3px solid ${stylesColor}`
      );

      // tablePag -> uses stylesColor
      expect(theme.tblPgn.MuiTablePagination.root.borderTop).toBe(
        `3px solid ${stylesColor}`
      );
      expect(theme.tblPgn.MuiTablePagination.root.borderBottom).toBe(
        `3px solid ${stylesColor}`
      );

      // extendedView -> merges styles and table; table primaryColor should win due to spread order
      const evToolbar =
        theme.extendedView.MuiToolbar.root['&.downloadAndColumnView'];
      expect(evToolbar.borderBottom).toBe(`3px solid ${tableColor}`);
    });

    it('includes tblBody block with expected shape', () => {
      const theme = themeConfig(
        { primaryColor: '#000000' },
        { primaryColor: '#ffffff' }
      );
      expect(theme.tblBody).toBeDefined();
      expect(theme.tblBody.MuiTooltip.tooltip.backgroundColor).toBe('#ffffff');
      expect(theme.tblBody.MuiTableCell.body['&.acl'].textAlign).toBe('center');
    });

    it('throws error if called with undefined table argument (due to object spread on undefined)', () => {
      // styles has a default of {}, but spreading undefined "table" will throw
      expect(() => themeConfig()).toThrow(TypeError);
      expect(() => themeConfig({})).toThrow(TypeError);
    });

    it('does not throw when table is an empty object', () => {
      expect(() => themeConfig({}, {})).not.toThrow();
    });
  });
});
