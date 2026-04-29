'use client';

import { ReactNode, useState } from 'react';
import { Provider } from 'react-redux';
import {
  makeStore,
  type RootState,
} from '@/features/auth/store/store';

interface ProvidersProps {
  children: ReactNode;
  preloadedState?: Partial<RootState>;
}

export default function Providers({
  children,
  preloadedState,
}: ProvidersProps) {
  const [store] = useState(() => makeStore(preloadedState));

  return <Provider store={store}>{children}</Provider>;
}
