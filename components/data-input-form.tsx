"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

export function DataInputForm() {
  const [selectedMode, setSelectedMode] = useState("classification")
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader>
          <CardTitle>Describe your problem below:</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="target">Target variable:</Label>
              <Input id="target" placeholder="Enter target variable" className="w-full" />
            </div>

            <div className="space-y-2">
              <Label>Upload your data here:</Label>
              <Input
                type="file"
                accept=".csv"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Select mode:</Label>
              <RadioGroup
                defaultValue="classification"
                onValueChange={setSelectedMode}
                className="flex flex-wrap gap-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="classification" id="classification" />
                  <Label htmlFor="classification">Classification</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="regression" id="regression" />
                  <Label htmlFor="regression">Regression</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="timeseries" id="timeseries" />
                  <Label htmlFor="timeseries">Time Series Forecasting</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="clustering" id="clustering" />
                  <Label htmlFor="clustering">Clustering</Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

