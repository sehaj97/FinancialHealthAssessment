"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useAssessment } from "@/components/assessment-context"

export default function EmergencyFundQuestion() {
  const router = useRouter()
  const { answers, setAnswer } = useAssessment()
  const [selectedFund, setSelectedFund] = useState<string>(answers.emergencyFund || "")

  const handleNext = () => {
    if (selectedFund) {
      setAnswer("emergencyFund", selectedFund)
      router.push("/assessment/5")
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">How much do you have saved in an emergency fund?</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          An emergency fund is money set aside specifically for unexpected expenses or financial emergencies.
        </p>
        <RadioGroup value={selectedFund} onValueChange={setSelectedFund} className="space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="over6months" id="over6months" />
            <Label htmlFor="over6months">More than 6 months of expenses</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3to6months" id="3to6months" />
            <Label htmlFor="3to6months">3-6 months of expenses</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1to3months" id="1to3months" />
            <Label htmlFor="1to3months">1-3 months of expenses</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="less1month" id="less1month" />
            <Label htmlFor="less1month">Less than 1 month of expenses</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="none" id="none" />
            <Label htmlFor="none">I don't have an emergency fund</Label>
          </div>
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/assessment/3">
          <Button variant="outline">Back</Button>
        </Link>
        <Button onClick={handleNext} disabled={!selectedFund}>
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}

