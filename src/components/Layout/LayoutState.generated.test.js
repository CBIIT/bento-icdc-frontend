// LayoutState.test.js

import LayoutReducer, {
  initialState,
  TOGGLE_SIDEBAR,
  toggleSidebar,
} from './LayoutState';

describe('LayoutState actions', () => {
  it('toggleSidebar should create TOGGLE_SIDEBAR action', () => {
    expect(toggleSidebar()).toEqual({ type: TOGGLE_SIDEBAR });
  });
});

describe('LayoutState reducer', () => {
  it('should return initialState when state is undefined and action is unknown', () => {
    const next = LayoutReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(next).toEqual(initialState);
    // Ensure a new reference is not created unnecessarily for unknown action with undefined -> returns initialState reference
    expect(next).toBe(initialState);
  });

  it('should return initialState when state is undefined and action is empty', () => {
    const next = LayoutReducer(undefined, {});
    expect(next).toEqual(initialState);
    expect(next).toBe(initialState);
  });

  it('should toggle isSidebarOpened from true to false', () => {
    const prev = { ...initialState };
    const next = LayoutReducer(prev, toggleSidebar());
    expect(next.isSidebarOpened).toBe(false);
  });

  it('should toggle isSidebarOpened from false to true and preserve other keys', () => {
    const prev = Object.freeze({
      isSidebarOpened: false,
      otherKey: 'preserved',
    });
    const next = LayoutReducer(prev, toggleSidebar());
    expect(next.isSidebarOpened).toBe(true);
    expect(next.otherKey).toBe('preserved');
  });

  it('should not mutate previous state object', () => {
    const prev = { isSidebarOpened: true };
    Object.freeze(prev);

    const next = LayoutReducer(prev, toggleSidebar());
    expect(next).not.toBe(prev);
    expect(prev.isSidebarOpened).toBe(true);
    expect(next.isSidebarOpened).toBe(false);
  });

  it('should return the same state reference for unknown actions', () => {
    const prev = { isSidebarOpened: false };
    const next = LayoutReducer(prev, { type: 'NO_OP' });
    expect(next).toBe(prev);
  });

  it('should toggle twice and end up with original isSidebarOpened value', () => {
    const prev = { isSidebarOpened: true };
    const once = LayoutReducer(prev, toggleSidebar());
    const twice = LayoutReducer(once, toggleSidebar());

    expect(once.isSidebarOpened).toBe(false);
    expect(twice.isSidebarOpened).toBe(true);
    // Each reduce on toggle returns a new object
    expect(once).not.toBe(prev);
    expect(twice).not.toBe(once);
  });

  it('throws error if state is null on TOGGLE_SIDEBAR (invalid input)', () => {
    expect(() => LayoutReducer(null, toggleSidebar())).toThrow(TypeError);
  });
});
