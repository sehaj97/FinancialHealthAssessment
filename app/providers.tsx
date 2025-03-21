"use client"

import type { ReactNode } from "react"
import { AssessmentProvider } from "@/components/assessment-context"

export function Providers({ children }: { children: ReactNode }) {
  return <AssessmentProvider>{children}</AssessmentProvider>
}

