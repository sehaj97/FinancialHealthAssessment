"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useAssessment } from "@/components/assessment-context"

export default function DebtQuestion() {
  const router = useRouter()
  const { answers, setAnswer } = useAssessment()
  const [selectedDebt, setSelectedDebt] = useState<string>(answers.debt || "")

  const handleNext = () => {
    if (selectedDebt) {
      setAnswer("debt", selectedDebt)
      router.push("/assessment/6")
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">What types of debt do you currently have?</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">Select the option that best describes your current debt situation.</p>
        <RadioGroup value={selectedDebt} onValueChange={setSelectedDebt} className="space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="none" id="none" />
            <Label htmlFor="none">I don't have any debt</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mortgage" id="mortgage" />
            <Label htmlFor="mortgage">I only have mortgage/housing debt</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="student" id="student" />
            <Label htmlFor="student">I primarily have student loan debt</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="car" id="car" />
            <Label htmlFor="car">I primarily have auto loan debt</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="credit" id="credit" />
            <Label htmlFor="credit">I primarily have credit card debt</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="multiple" id="multiple" />
            <Label htmlFor="multiple">I have multiple types of debt (credit cards, loans, etc.)</Label>
          </div>
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/assessment/4">
          <Button variant="outline">Back</Button>
        </Link>
        <Button onClick={handleNext} disabled={!selectedDebt}>
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}

