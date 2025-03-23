"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useAssessment } from "@/components/assessment-context"

export default function DebtToIncomeQuestion() {
  const router = useRouter()
  const { answers, setAnswer } = useAssessment()
  const [selectedRatio, setSelectedRatio] = useState<string>(answers.debtToIncome || "")

  const handleNext = () => {
    if (selectedRatio) {
      setAnswer("debtToIncome", selectedRatio)
      router.push("/assessment/7")
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">What is your debt-to-income ratio?</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Your debt-to-income ratio is your total monthly debt payments divided by your gross monthly income.
        </p>
        <RadioGroup value={selectedRatio} onValueChange={setSelectedRatio} className="space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="under20" id="under20" />
            <Label htmlFor="under20">Less than 20%</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="20to30" id="20to30" />
            <Label htmlFor="20to30">20% - 30%</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="30to40" id="30to40" />
            <Label htmlFor="30to40">30% - 40%</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="40to50" id="40to50" />
            <Label htmlFor="40to50">40% - 50%</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="over50" id="over50" />
            <Label htmlFor="over50">Over 50%</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="unknown" id="unknown" />
            <Label htmlFor="unknown">I don't know</Label>
          </div>
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/assessment/5">
          <Button variant="outline">Back</Button>
        </Link>
        <Button onClick={handleNext} disabled={!selectedRatio}>
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}

