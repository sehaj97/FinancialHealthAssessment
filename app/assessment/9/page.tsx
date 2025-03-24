"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useAssessment } from "@/components/assessment-context"

export default function BudgetingQuestion() {
  const router = useRouter()
  const { answers, setAnswer } = useAssessment()
  const [selectedBudgeting, setSelectedBudgeting] = useState<string>(answers.budgeting || "")

  const handleNext = () => {
    if (selectedBudgeting) {
      setAnswer("budgeting", selectedBudgeting)
      router.push("/assessment/results")
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">How do you track your spending and budget?</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedBudgeting} onValueChange={setSelectedBudgeting} className="space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="detailed" id="detailed" />
            <Label htmlFor="detailed">I use a detailed budget and track all expenses</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="basic" id="basic" />
            <Label htmlFor="basic">I have a basic budget for major categories</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mental" id="mental" />
            <Label htmlFor="mental">I keep a mental budget but don't track expenses closely</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="occasional" id="occasional" />
            <Label htmlFor="occasional">I occasionally check my spending but don't have a budget</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="none" id="none" />
            <Label htmlFor="none">I don't track my spending or use a budget</Label>
          </div>
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/assessment/8">
          <Button variant="outline">Back</Button>
        </Link>
        <Button onClick={handleNext} disabled={!selectedBudgeting}>
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}

