"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useAssessment } from "@/components/assessment-context"

export default function InvestmentsQuestion() {
  const router = useRouter()
  const { answers, setAnswer } = useAssessment()
  const [selectedInvestments, setSelectedInvestments] = useState<string>(answers.investments || "")

  const handleNext = () => {
    if (selectedInvestments) {
      setAnswer("investments", selectedInvestments)
      router.push("/assessment/9")
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">How would you describe your investment strategy?</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedInvestments} onValueChange={setSelectedInvestments} className="space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="diversified" id="diversified" />
            <Label htmlFor="diversified">I have a diversified investment portfolio (stocks, bonds, etc.)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="retirement" id="retirement" />
            <Label htmlFor="retirement">I only invest in retirement accounts</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="some" id="some" />
            <Label htmlFor="some">I have some investments but no clear strategy</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="planning" id="planning" />
            <Label htmlFor="planning">I'm planning to start investing soon</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="none" id="none" />
            <Label htmlFor="none">I don't have any investments</Label>
          </div>
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/assessment/7">
          <Button variant="outline">Back</Button>
        </Link>
        <Button onClick={handleNext} disabled={!selectedInvestments}>
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}

