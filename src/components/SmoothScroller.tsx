// src/components/SmoothScroller.tsx
"use client";

import { ReactLenis } from '@studio-freight/react-lenis';
import { ReactNode } from 'react';

function SmoothScroller({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.12,
        duration: 1.2,
      }}
    >
      {children}
    </ReactLenis>
  );
}

export default SmoothScroller;