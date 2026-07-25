import type { ReactNode } from "react";
import { ScrollToTop } from "@/components/ScrollToTop";

export default function WorkLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
}
