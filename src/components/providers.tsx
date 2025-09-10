"use client"; // Bu katman, tamamen istemci tarafında çalışır.

import { LanguageProvider } from "@/contexts/LanguageContext";
import SmoothScroller from "./SmoothScroller";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <SmoothScroller>
        {children}
      </SmoothScroller>
    </LanguageProvider>
  );
}