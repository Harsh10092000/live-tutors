'use client';

import { useEffect } from 'react';
import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

const useSlider = (selector, options = {}) => {
  useEffect(() => {
    const splide = new Splide(selector, {
      type: 'loop',
      perPage: 4,
      perMove: 1,
      gap: 24,
      pagination: true,
      arrows: true,
      breakpoints: {
        1399: {
          perPage: 3,
        },
        991: {
          perPage: 2,
        },
        575: {
          perPage: 1,
        }
      },
      ...options
    });

    splide.mount();

    return () => {
      if (splide) {
        splide.destroy();
      }
    };
  }, [selector]);
};

export default useSlider; 