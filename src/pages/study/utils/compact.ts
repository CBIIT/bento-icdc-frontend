const compact = <T>(
  value: Array<T | null | undefined> | null | undefined
): T[] => (value ?? []).filter((item): item is T => item != null);

export default compact;
