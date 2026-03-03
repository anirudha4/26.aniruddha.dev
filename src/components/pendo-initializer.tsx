'use client';

import { useEffect } from 'react';

function getOrCreateVisitorId(): string {
  const storageKey = 'pendo_visitor_id';
  let visitorId = localStorage.getItem(storageKey);
  if (!visitorId) {
    visitorId = 'visitor-' + crypto.randomUUID();
    localStorage.setItem(storageKey, visitorId);
  }
  return visitorId;
}

export default function PendoInitializer() {
  useEffect(() => {
    pendo.initialize({
      visitor: {
        id: getOrCreateVisitorId(),
      },
    });
  }, []);

  return null;
}
