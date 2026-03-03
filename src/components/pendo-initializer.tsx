'use client';

import { useEffect } from 'react';

export default function PendoInitializer() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.pendo) {
      window.pendo.initialize({
        visitor: {
          id: 'ANONYMOUS_VISITOR_ID',
        },
      });
    }
  }, []);

  return null;
}
