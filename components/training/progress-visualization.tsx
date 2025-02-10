"use client"

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { TrainingProgress } from '@/types/ml-types'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface ProgressVisualizationProps {
  progress: TrainingProgress[]
  currentEpoch: number
  totalEpochs: number
}

export function ProgressVisualization({
  progress = [],
  currentEpoch = 0,
  totalEpochs = 1,
}: ProgressVisualizationProps) {
  const progressPercent = totalEpochs > 0 ? (currentEpoch / totalEpochs) * 100 : 0;
  const lastProgress = progress.length > 0 ? progress[progress.length - 1] : { loss: 0, validationLoss: 0 };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Training Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <Progress value={progressPercent} />
          <div className="text-sm text-muted-foreground">
            Epoch {currentEpoch} of {totalEpochs}
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="epoch" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="loss"
                stroke="#8884d8"
                name="Training Loss"
              />
              <Line
                type="monotone"
                dataKey="validationLoss"
                stroke="#82ca9d"
                name="Validation Loss"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{lastProgress.loss.toFixed(4)}</div>
              <div className="text-sm text-muted-foreground">
                Current Training Loss
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{lastProgress.validationLoss.toFixed(4)}</div>
              <div className="text-sm text-muted-foreground">
                Current Validation Loss
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProgressVisualization;
