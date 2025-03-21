"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type FinancialData = {
  income: string
  expenses: string
  savings: string
  emergencyFund: string
  debt: string
  debtToIncome: string
  retirement: string
  investments: string
  financialGoals: string[]
  budgeting: string
}

type AssessmentContextType = {
  answers: FinancialData
  setAnswer: (key: keyof FinancialData, value: any) => void
  calculateScore: () => {
    overallScore: number
    scores: {
      category: string
      score: number
      maxScore: number
      recommendations: string[]
    }[]
  }
}

const defaultAnswers: FinancialData = {
  income: "",
  expenses: "",
  savings: "",
  emergencyFund: "",
  debt: "",
  debtToIncome: "",
  retirement: "",
  investments: "",
  financialGoals: [],
  budgeting: "",
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined)

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<FinancialData>(defaultAnswers)

  const setAnswer = (key: keyof FinancialData, value: any) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
  }

  const calculateScore = () => {
    // Calculate individual category scores
    const savingsScore = calculateSavingsScore(answers.savings, answers.emergencyFund)
    const debtScore = calculateDebtScore(answers.debt, answers.debtToIncome)
    const retirementScore = calculateRetirementScore(answers.retirement)
    const budgetingScore = calculateBudgetingScore(answers.budgeting)
    const investmentScore = calculateInvestmentScore(answers.investments)

    // Calculate overall score (weighted average)
    const overallScore = Math.round(
      savingsScore.score * 0.25 +
        debtScore.score * 0.25 +
        retirementScore.score * 0.2 +
        budgetingScore.score * 0.15 +
        investmentScore.score * 0.15,
    )

    return {
      overallScore,
      scores: [savingsScore, debtScore, retirementScore, budgetingScore, investmentScore],
    }
  }

  return (
    <AssessmentContext.Provider value={{ answers, setAnswer, calculateScore }}>{children}</AssessmentContext.Provider>
  )
}

export function useAssessment() {
  const context = useContext(AssessmentContext)
  if (context === undefined) {
    throw new Error("useAssessment must be used within an AssessmentProvider")
  }
  return context
}

// Helper functions to calculate scores for each category
function calculateSavingsScore(savings: string, emergencyFund: string) {
  let score = 0
  const maxScore = 100
  const recommendations: string[] = []

  // Score based on savings rate
  if (savings === "over20") score += 50
  else if (savings === "10to20") score += 40
  else if (savings === "5to10") score += 30
  else if (savings === "0to5") score += 15
  else if (savings === "negative") score += 0

  // Score based on emergency fund
  if (emergencyFund === "over6months") score += 50
  else if (emergencyFund === "3to6months") score += 40
  else if (emergencyFund === "1to3months") score += 25
  else if (emergencyFund === "less1month") score += 10
  else if (emergencyFund === "none") score += 0

  // Generate recommendations
  if (savings === "negative" || savings === "0to5") {
    recommendations.push("Try to increase your savings rate to at least 5-10% of your income")
  }

  if (emergencyFund === "none" || emergencyFund === "less1month") {
    recommendations.push("Work on building an emergency fund that covers at least 3-6 months of expenses")
  }

  if (recommendations.length === 0) {
    recommendations.push("You're doing well with your savings! Consider investing any excess for long-term growth")
  }

  return {
    category: "Savings & Emergency Fund",
    score,
    maxScore,
    recommendations,
  }
}

function calculateDebtScore(debt: string, debtToIncome: string) {
  let score = 0
  const maxScore = 100
  const recommendations: string[] = []

  // Score based on debt type
  if (debt === "none") score += 50
  else if (debt === "mortgage") score += 40
  else if (debt === "student") score += 30
  else if (debt === "car") score += 20
  else if (debt === "credit") score += 10
  else if (debt === "multiple") score += 0

  // Score based on debt-to-income ratio
  if (debtToIncome === "under20") score += 50
  else if (debtToIncome === "20to30") score += 40
  else if (debtToIncome === "30to40") score += 30
  else if (debtToIncome === "40to50") score += 20
  else if (debtToIncome === "over50") score += 0

  // Generate recommendations
  if (debt === "credit" || debt === "multiple") {
    recommendations.push("Focus on paying off high-interest debt like credit cards first")
  }

  if (debtToIncome === "over50" || debtToIncome === "40to50") {
    recommendations.push(
      "Your debt-to-income ratio is high. Consider debt consolidation or speaking with a financial advisor",
    )
  }

  if (recommendations.length === 0) {
    recommendations.push(
      "You're managing your debt well. Continue making regular payments and consider accelerating payments if possible",
    )
  }

  return {
    category: "Debt Management",
    score,
    maxScore,
    recommendations,
  }
}

function calculateRetirementScore(retirement: string) {
  let score = 0
  const maxScore = 100
  const recommendations: string[] = []

  // Score based on retirement savings
  if (retirement === "onTrack") score += 100
  else if (retirement === "contributing") score += 75
  else if (retirement === "started") score += 50
  else if (retirement === "planning") score += 25
  else if (retirement === "notStarted") score += 0

  // Generate recommendations
  if (retirement === "notStarted" || retirement === "planning") {
    recommendations.push("Start contributing to a retirement account as soon as possible, even if it's a small amount")
    recommendations.push("Take advantage of any employer matching programs for retirement contributions")
  } else if (retirement === "started" || retirement === "contributing") {
    recommendations.push("Consider increasing your retirement contributions to at least 15% of your income")
    recommendations.push(
      "Review your retirement investment allocation to ensure it aligns with your age and risk tolerance",
    )
  } else {
    recommendations.push(
      "Continue your current retirement savings strategy and consider meeting with a financial advisor for optimization",
    )
  }

  return {
    category: "Retirement Planning",
    score,
    maxScore,
    recommendations,
  }
}

function calculateBudgetingScore(budgeting: string) {
  let score = 0
  const maxScore = 100
  const recommendations: string[] = []

  // Score based on budgeting habits
  if (budgeting === "detailed") score += 100
  else if (budgeting === "basic") score += 75
  else if (budgeting === "mental") score += 50
  else if (budgeting === "occasional") score += 25
  else if (budgeting === "none") score += 0

  // Generate recommendations
  if (budgeting === "none" || budgeting === "occasional") {
    recommendations.push("Start tracking your expenses using a budgeting app or spreadsheet")
    recommendations.push(
      "Implement a simple budgeting method like the 50/30/20 rule (50% needs, 30% wants, 20% savings)",
    )
  } else if (budgeting === "mental") {
    recommendations.push("Consider formalizing your budget with a written plan or app to better track your progress")
  } else if (budgeting === "basic") {
    recommendations.push("Review your budget categories to identify areas where you might reduce spending")
  } else {
    recommendations.push("Continue your excellent budgeting habits and consider periodic reviews to optimize further")
  }

  return {
    category: "Budgeting & Expense Tracking",
    score,
    maxScore,
    recommendations,
  }
}

function calculateInvestmentScore(investments: string) {
  let score = 0
  const maxScore = 100
  const recommendations: string[] = []

  // Score based on investment approach
  if (investments === "diversified") score += 100
  else if (investments === "retirement") score += 75
  else if (investments === "some") score += 50
  else if (investments === "planning") score += 25
  else if (investments === "none") score += 0

  // Generate recommendations
  if (investments === "none" || investments === "planning") {
    recommendations.push("Start investing with a small amount in a low-cost index fund or ETF")
    recommendations.push("Consider opening a tax-advantaged investment account like an IRA")
  } else if (investments === "some") {
    recommendations.push("Diversify your investments across different asset classes to reduce risk")
    recommendations.push("Review your investment fees and consider lower-cost options if available")
  } else if (investments === "retirement") {
    recommendations.push("Consider expanding your investments beyond retirement accounts for more flexibility")
  } else {
    recommendations.push("Continue your diversified investment approach and consider periodic rebalancing")
  }

  return {
    category: "Investing",
    score,
    maxScore,
    recommendations,
  }
}

