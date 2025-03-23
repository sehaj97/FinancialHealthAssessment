"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useAssessment } from "@/components/assessment-context"

export default function RetirementQuestion() {
  const router = useRouter()
  const { answers, setAnswer } = useAssessment()
  const [selectedRetirement, setSelectedRetirement] = useState<string>(answers.retirement || "")

  const handleNext = () => {
    if (selectedRetirement) {
      setAnswer("retirement", selectedRetirement)
      router.push("/assessment/8")
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">How would you describe your retirement savings?</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedRetirement} onValueChange={setSelectedRetirement} className="space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="onTrack" id="onTrack" />
            <Label htmlFor="onTrack">I'm on track to meet my retirement goals</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="contributing" id="contributing" />
            <Label htmlFor="contributing">I'm regularly contributing to retirement accounts</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="started" id="started" />
            <Label htmlFor="started">I've started saving for retirement but not consistently</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="planning" id="planning" />
            <Label htmlFor="planning">I'm planning to start saving for retirement soon</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="notStarted" id="notStarted" />
            <Label htmlFor="notStarted">I haven't started saving for retirement</Label>
          </div>
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/assessment/6">
          <Button variant="outline">Back</Button>
        </Link>
        <Button onClick={handleNext} disabled={!selectedRetirement}>
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}

