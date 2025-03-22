"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useAssessment } from "@/components/assessment-context"

export default function SavingsQuestion() {
  const router = useRouter()
  const { answers, setAnswer } = useAssessment()
  const [selectedSavings, setSelectedSavings] = useState<string>(answers.savings || "")

  const handleNext = () => {
    if (selectedSavings) {
      setAnswer("savings", selectedSavings)
      router.push("/assessment/4")
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">How much of your income do you save each month?</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Include all savings: emergency fund, retirement accounts, and other savings goals.
        </p>
        <RadioGroup value={selectedSavings} onValueChange={setSelectedSavings} className="space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="over20" id="over20" />
            <Label htmlFor="over20">More than 20% of my income</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="10to20" id="10to20" />
            <Label htmlFor="10to20">10% - 20% of my income</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="5to10" id="5to10" />
            <Label htmlFor="5to10">5% - 10% of my income</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0to5" id="0to5" />
            <Label htmlFor="0to5">0% - 5% of my income</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="negative" id="negative" />
            <Label htmlFor="negative">I'm not saving/I'm spending more than I earn</Label>
          </div>
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/assessment/2">
          <Button variant="outline">Back</Button>
        </Link>
        <Button onClick={handleNext} disabled={!selectedSavings}>
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}

