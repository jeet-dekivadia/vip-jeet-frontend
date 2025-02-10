"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
  Brush,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, ZoomIn, ZoomOut } from "lucide-react"

interface DataPoint {
  x: number
  y: number
  z?: number
  category?: string
}

interface ChartProps {
  data: DataPoint[]
  type?: "scatter" | "line" | "bubble"
  title: string
  xLabel: string
  yLabel: string
}

export function InteractiveChart({ data, type = "scatter", title, xLabel, yLabel }: ChartProps) {
  const [chartType, setChartType] = useState(type)
  const [zoomDomain, setZoomDomain] = useState<{ x: [number, number]; y: [number, number] } | null>(null)

  const handleZoomIn = () => {
    if (!zoomDomain) {
      const xValues = data.map((d) => d.x)
      const yValues = data.map((d) => d.y)
      const xMid = (Math.min(...xValues) + Math.max(...xValues)) / 2
      const yMid = (Math.min(...yValues) + Math.max(...yValues)) / 2
      const xRange = (Math.max(...xValues) - Math.min(...xValues)) / 4
      const yRange = (Math.max(...yValues) - Math.min(...yValues)) / 4

      setZoomDomain({
        x: [xMid - xRange, xMid + xRange],
        y: [yMid - yRange, yMid + yRange],
      })
    }
  }

  const handleZoomOut = () => {
    setZoomDomain(null)
  }

  const handleDownload = () => {
    // Implementation for downloading chart data/image
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <div className="flex items-center gap-2">
          <Select value={chartType} onValueChange={(value: any) => setChartType(value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Chart Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="scatter">Scatter</SelectItem>
              <SelectItem value="line">Line</SelectItem>
              <SelectItem value="bubble">Bubble</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer>
            {chartType === "scatter" ? (
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="x" name={xLabel} domain={zoomDomain ? zoomDomain.x : ["auto", "auto"]} />
                <YAxis type="number" dataKey="y" name={yLabel} domain={zoomDomain ? zoomDomain.y : ["auto", "auto"]} />
                <ZAxis type="number" range={[64, 144]} />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Legend />
                <Scatter name="Data Points" data={data} fill="#8884d8" />
                <Brush />
              </ScatterChart>
            ) : chartType === "line" ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" domain={zoomDomain ? zoomDomain.x : ["auto", "auto"]} />
                <YAxis domain={zoomDomain ? zoomDomain.y : ["auto", "auto"]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="y" stroke="#8884d8" dot={false} />
                <Brush />
              </LineChart>
            ) : (
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="x" name={xLabel} domain={zoomDomain ? zoomDomain.x : ["auto", "auto"]} />
                <YAxis type="number" dataKey="y" name={yLabel} domain={zoomDomain ? zoomDomain.y : ["auto", "auto"]} />
                <ZAxis type="number" range={[64, 144]} dataKey="z" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Legend />
                <Scatter name="Data Points" data={data} fill="#8884d8" />
                <Brush />
              </ScatterChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

