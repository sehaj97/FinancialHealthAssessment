"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAssessment } from "@/components/assessment-context"

type ScoreCategory = {
  category: string
  score: number
  maxScore: number
  recommendations: string[]
}

export default function ResultsPage() {
  const { calculateScore } = useAssessment()
  const [results, setResults] = useState<{ overallScore: number; scores: ScoreCategory[] } | null>(null)

  useEffect(() => {
    const scoreResults = calculateScore()
    setResults(scoreResults)
  }, [calculateScore])

  if (!results) {
    return <div className="flex justify-center items-center p-8">Loading your results...</div>
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreDescription = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 70) return "Good"
    if (score >= 60) return "Fair"
    if (score >= 40) return "Needs Improvement"
    return "Critical Attention Needed"
  }

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-600"
    if (score >= 60) return "bg-yellow-600"
    return "bg-red-600"
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Your Financial Health Score</CardTitle>
          <CardDescription>Based on your responses to the assessment</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className={`text-6xl font-bold mb-2 ${getScoreColor(results.overallScore)}`}>{results.overallScore}</div>
          <div className="text-xl mb-6">{getScoreDescription(results.overallScore)}</div>
          <Progress
            value={results.overallScore}
            className="w-full h-3 mb-4"
            indicatorClassName={getProgressColor(results.overallScore)}
          />
          <p className="text-center text-muted-foreground mt-4 max-w-md">
            This score represents your overall financial health based on the information you provided. Review the
            detailed breakdown below for specific insights and recommendations.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="breakdown" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="breakdown">Score Breakdown</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        <TabsContent value="breakdown" className="space-y-4 mt-4">
          {results.scores.map((category, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                  <div className={`font-bold ${getScoreColor(category.score)}`}>
                    {category.score}/{category.maxScore}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Progress
                  value={(category.score / category.maxScore) * 100}
                  className="h-2"
                  indicatorClassName={getProgressColor(category.score)}
                />
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="recommendations" className="space-y-4 mt-4">
          {results.scores.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{category.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {category.recommendations.map((rec, recIndex) => (
                    <li key={recIndex}>{rec}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Now that you have a better understanding of your financial health, consider these next steps:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Review your detailed recommendations and choose 1-2 areas to focus on first</li>
            <li>Create a specific action plan with measurable goals</li>
            <li>Consider consulting with a financial advisor for personalized guidance</li>
            <li>Reassess your financial health in 3-6 months to track your progress</li>
          </ul>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

