import React, { useLayoutEffect, useRef, useState } from 'react';
import { Skeleton } from '@mui/material';

// Keep the space occupied by the results while their replacement is loading.
const LoadingSection = ({ loading, children, initialHeight = 400 }) => {
  const container = useRef(null);
  const [height, setHeight] = useState(initialHeight);

  useLayoutEffect(() => {
    if (loading) return;

    const measure = () => {
      const measuredHeight = container.current?.getBoundingClientRect().height;
      if (measuredHeight > 0) setHeight(measuredHeight);
    };
    measure();
    if (typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(measure);
    observer.observe(container.current);
    return () => observer.disconnect();
  }, [loading]);

  return (
    <div ref={container} aria-busy={loading}>
      {loading ? <Skeleton variant="rectangular" height={height} /> : children}
    </div>
  );
};

export default LoadingSection;
