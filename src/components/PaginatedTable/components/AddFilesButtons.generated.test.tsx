// src/components/PaginatedTable/components/AddFilesButtons.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import { AddSelectedFilesButton } from './AddFilesButtons';
import type { TooltipConfig } from './AddFilesButtons';

type ButtonViewProps = {
  btnType?: string;
  title: string;
  clsName: string;
  dataKey: string;
  addFileQuery: string;
  responseKeys: string[];
  tooltipCofig: TooltipConfig;
  alertMessage: string;
  activeFilters: Record<string, unknown>;
  classes: Record<string, never>;
  maxFileLimit: number;
};

const mockButtonView = jest.fn<void, [ButtonViewProps]>();

jest.mock('../../../bento-core', () => ({
  ButtonView: (props: ButtonViewProps) => {
    mockButtonView(props);
    return <div data-testid="button-view" />;
  },
}));

describe('AddSelectedFilesButton', () => {
  const baseTooltipConfig: TooltipConfig = {
    src: 'path/to/icon.png',
    icon: 'info',
    alt: 'info alt',
    arrow: true,
    tooltipText: 'tooltip text',
    toolTipText: 'tooltip text (legacy key)',
    clsName: 'tooltip-class',
  };

  const requiredProps = {
    title: 'Add Selected Files',
    clsName: 'add-files-btn',
    dataKey: 'file_ids',
    addFileQuery: 'mutation addFiles { ... }',
    responseKeys: ['files', 'ids'],
    tooltipCofig: baseTooltipConfig,
    buttonType: 'primary',
    alertMessage: 'Added to cart',
    activeFilters: { program: ['ICDC'] },
  };

  beforeEach(() => {
    mockButtonView.mockClear();
  });

  const getPassedProps = (): ButtonViewProps => {
    const firstCall = mockButtonView.mock.calls[0];

    if (!firstCall) {
      throw new Error('ButtonView was not called');
    }

    return firstCall[0];
  };

  it('should render ButtonView once', () => {
    render(<AddSelectedFilesButton {...requiredProps} />);

    expect(screen.getByTestId('button-view')).toBeTruthy();
    expect(mockButtonView).toHaveBeenCalledTimes(1);
  });

  it('should pass through mapped props and fixed props', () => {
    render(<AddSelectedFilesButton {...requiredProps} />);

    const passedProps = getPassedProps();

    expect(passedProps.btnType).toBe(requiredProps.buttonType);
    expect(passedProps.title).toBe(requiredProps.title);
    expect(passedProps.clsName).toBe(requiredProps.clsName);
    expect(passedProps.dataKey).toBe(requiredProps.dataKey);
    expect(passedProps.addFileQuery).toBe(requiredProps.addFileQuery);
    expect(passedProps.responseKeys).toEqual(requiredProps.responseKeys);
    expect(passedProps.tooltipCofig).toEqual(requiredProps.tooltipCofig);
    expect(passedProps.alertMessage).toBe(requiredProps.alertMessage);
    expect(passedProps.activeFilters).toEqual(requiredProps.activeFilters);

    expect(passedProps.classes).toEqual({});
    expect(passedProps.maxFileLimit).toBe(10000);
  });

  it('should default alertMessage to empty string when undefined is provided', () => {
    render(
      <AddSelectedFilesButton
        {...{
          ...requiredProps,
          alertMessage: undefined as unknown as string,
        }}
      />
    );

    const passedProps = getPassedProps();
    expect(passedProps.alertMessage).toBe('');
  });

  it('should default activeFilters to empty object when undefined is provided', () => {
    render(
      <AddSelectedFilesButton
        {...{
          ...requiredProps,
          activeFilters: undefined as unknown as Record<string, unknown>,
        }}
      />
    );

    const passedProps = getPassedProps();
    expect(passedProps.activeFilters).toEqual({});
  });

  it('should handle empty responseKeys array', () => {
    render(
      <AddSelectedFilesButton
        {...{
          ...requiredProps,
          responseKeys: [],
        }}
      />
    );

    const passedProps = getPassedProps();
    expect(Array.isArray(passedProps.responseKeys)).toBe(true);
    expect(passedProps.responseKeys).toHaveLength(0);
  });

  it('should forward tooltipCofig object as-is', () => {
    const customTooltip: TooltipConfig = {
      src: 'custom.png',
      icon: 'help',
      alt: 'help alt',
      arrow: false,
      tooltipText: 'custom tooltip',
      toolTipText: 'custom tooltip legacy',
      clsName: 'custom-tooltip',
    };

    render(
      <AddSelectedFilesButton
        {...{
          ...requiredProps,
          tooltipCofig: customTooltip,
        }}
      />
    );

    const passedProps = getPassedProps();
    expect(passedProps.tooltipCofig).toEqual(customTooltip);
  });

  it('should pass different button types correctly (edge case)', () => {
    render(
      <AddSelectedFilesButton
        {...{
          ...requiredProps,
          buttonType: 'secondary',
        }}
      />
    );

    const passedProps = getPassedProps();
    expect(passedProps.btnType).toBe('secondary');
  });
});
