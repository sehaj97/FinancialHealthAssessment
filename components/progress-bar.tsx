"use client"

import { usePathname } from "next/navigation"

export function ProgressBar() {
  const pathname = usePathname()
  const currentStep = pathname.includes("/assessment/results") ? 10 : Number.parseInt(pathname.split("/").pop() || "1")

  const totalSteps = 9
  const progress = pathname.includes("/assessment/results") ? 100 : Math.round((currentStep / totalSteps) * 100)

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2 text-sm">
        <span>
          Question {currentStep} of {totalSteps}
        </span>
        <span>{progress}% Complete</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2.5">
        <div
          className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}

