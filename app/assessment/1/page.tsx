"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useAssessment } from "@/components/assessment-context"

export default function IncomeQuestion() {
  const router = useRouter()
  const { answers, setAnswer } = useAssessment()
  const [selectedIncome, setSelectedIncome] = useState<string>(answers.income || "")

  const handleNext = () => {
    if (selectedIncome) {
      setAnswer("income", selectedIncome)
      router.push("/assessment/2")
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">What is your annual household income?</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedIncome} onValueChange={setSelectedIncome} className="space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="under25k" id="under25k" />
            <Label htmlFor="under25k">Under $25,000</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="25kto50k" id="25kto50k" />
            <Label htmlFor="25kto50k">$25,000 - $50,000</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="50kto75k" id="50kto75k" />
            <Label htmlFor="50kto75k">$50,000 - $75,000</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="75kto100k" id="75kto100k" />
            <Label htmlFor="75kto100k">$75,000 - $100,000</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="100kto150k" id="100kto150k" />
            <Label htmlFor="100kto150k">$100,000 - $150,000</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="over150k" id="over150k" />
            <Label htmlFor="over150k">Over $150,000</Label>
          </div>
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/">
          <Button variant="outline">Back</Button>
        </Link>
        <Button onClick={handleNext} disabled={!selectedIncome}>
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}

