import type React from "react"
import { Providers } from "@/app/providers"
import { ProgressBar } from "@/components/progress-bar"

export default function AssessmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <div className="container max-w-3xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-center mb-6">Financial Health Assessment</h1>
          <ProgressBar />
        </div>
        {children}
      </div>
    </Providers>
  )
}

