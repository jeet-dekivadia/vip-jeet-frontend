"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ModelMetrics } from "@/types/ml-types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface ModelEvaluationProps {
  metrics: ModelMetrics
}

export function ModelEvaluation({ metrics }: ModelEvaluationProps) {
  const featureImportanceData = Object.entries(metrics.featureImportance).map(([feature, importance]) => ({
    feature,
    importance,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Evaluation</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="metrics">
          <TabsList>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="features">Feature Importance</TabsTrigger>
            {metrics.confusionMatrix && <TabsTrigger value="confusion">Confusion Matrix</TabsTrigger>}
          </TabsList>

          <TabsContent value="metrics" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {metrics.accuracy && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">{(metrics.accuracy * 100).toFixed(2)}%</div>
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                  </CardContent>
                </Card>
              )}
              {metrics.f1Score && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">{metrics.f1Score.toFixed(4)}</div>
                    <div className="text-sm text-muted-foreground">F1 Score</div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="features">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={featureImportanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="feature" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="importance" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

