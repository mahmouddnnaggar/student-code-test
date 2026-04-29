"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/features/auth/store/store";

interface ProvidersProps {
  children: ReactNode;
  preloadedState?: any; 
}

export default function Providers({ children, preloadedState }: ProvidersProps) {
  return <Provider store={store}>{children}</Provider>;
}