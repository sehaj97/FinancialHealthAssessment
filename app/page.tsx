import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Financial Health Assessment</CardTitle>
          <CardDescription className="text-lg mt-2">
            Discover your financial wellness score and get personalized recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="space-y-2">
            <h3 className="text-xl font-medium">What you'll learn:</h3>
            <ul className="space-y-2 text-left mx-auto max-w-md">
              <li className="flex items-start">
                <span className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center mr-2 mt-0.5">
                  1
                </span>
                <span>Your overall financial health score</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center mr-2 mt-0.5">
                  2
                </span>
                <span>Areas where you're doing well</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center mr-2 mt-0.5">
                  3
                </span>
                <span>Opportunities to improve your financial situation</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center mr-2 mt-0.5">
                  4
                </span>
                <span>Personalized recommendations based on your answers</span>
              </li>
            </ul>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm">
              This assessment takes about 5 minutes to complete. Your information is not stored or shared.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/assessment/1">
            <Button size="lg" className="px-8">
              Start Assessment
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

