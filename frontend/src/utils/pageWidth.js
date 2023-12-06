import React from 'react';
import { useLayoutEffect } from 'react';

function usePageWidth() {

  const [width, setWidth] = React.useState([]);

  useLayoutEffect(() => {
    function updateSize() {
      setWidth([window.innerWidth]);
    }

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return width
}

export default usePageWidth;