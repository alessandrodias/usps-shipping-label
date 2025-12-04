"use client";

import { ReactNode } from "react";
import { AppProvider } from "./app-context";

export function AppProviders({ children }: { children: ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}
