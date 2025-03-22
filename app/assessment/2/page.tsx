"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useAssessment } from "@/components/assessment-context"

export default function ExpensesQuestion() {
  const router = useRouter()
  const { answers, setAnswer } = useAssessment()
  const [selectedExpenses, setSelectedExpenses] = useState<string>(answers.expenses || "")

  const handleNext = () => {
    if (selectedExpenses) {
      setAnswer("expenses", selectedExpenses)
      router.push("/assessment/3")
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">How much of your monthly income goes toward essential expenses?</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Essential expenses include housing, utilities, groceries, transportation, and minimum debt payments.
        </p>
        <RadioGroup value={selectedExpenses} onValueChange={setSelectedExpenses} className="space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="under30" id="under30" />
            <Label htmlFor="under30">Less than 30% of my income</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="30to50" id="30to50" />
            <Label htmlFor="30to50">30% - 50% of my income</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="50to70" id="50to70" />
            <Label htmlFor="50to70">50% - 70% of my income</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="70to90" id="70to90" />
            <Label htmlFor="70to90">70% - 90% of my income</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="over90" id="over90" />
            <Label htmlFor="over90">Over 90% of my income</Label>
          </div>
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/assessment/1">
          <Button variant="outline">Back</Button>
        </Link>
        <Button onClick={handleNext} disabled={!selectedExpenses}>
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}

