"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"
import { Download } from "lucide-react"

// Sample data - replace with actual data from your ML model
const data = [
  { name: "Point 1", value: 400 },
  { name: "Point 2", value: 300 },
  { name: "Point 3", value: 600 },
  { name: "Point 4", value: 200 },
  { name: "Point 5", value: 700 },
  { name: "Point 6", value: 400 },
]

export function ModelVisualization() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Generated Plot</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-center">
            <Button className="gap-2">
              <Download className="w-4 h-4" />
              Download Model
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

