"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ModelConfig } from "@/types/ml-types"

interface HyperparameterTuningProps {
  config: ModelConfig
  onChange: (config: ModelConfig) => void
}

export function HyperparameterTuning({ config, onChange }: HyperparameterTuningProps) {
  const [advanced, setAdvanced] = useState(false)

  const updateConfig = (path: string, value: any) => {
    const newConfig = { ...config }
    const keys = path.split(".")
    let current: any = newConfig

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]]
    }

    current[keys[keys.length - 1]] = value
    onChange(newConfig)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hyperparameter Tuning</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="advanced">Advanced Mode</Label>
          <Switch id="advanced" checked={advanced} onCheckedChange={setAdvanced} />
        </div>

        {config.type === "classification" && (
          <>
            <div className="space-y-2">
              <Label>Learning Rate</Label>
              <Slider
                value={[config.hyperparameters.learningRate as number]}
                onValueChange={([value]) => updateConfig("hyperparameters.learningRate", value)}
                min={0.0001}
                max={0.1}
                step={0.0001}
              />
              <div className="text-xs text-muted-foreground">{config.hyperparameters.learningRate}</div>
            </div>

            <div className="space-y-2">
              <Label>Batch Size</Label>
              <Select
                value={String(config.hyperparameters.batchSize)}
                onValueChange={(value) => updateConfig("hyperparameters.batchSize", Number.parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select batch size" />
                </SelectTrigger>
                <SelectContent>
                  {[16, 32, 64, 128, 256].map((size) => (
                    <SelectItem key={size} value={String(size)}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {advanced && (
              <>
                <div className="space-y-2">
                  <Label>L1 Regularization</Label>
                  <Input
                    type="number"
                    value={config.hyperparameters.l1Regularization}
                    onChange={(e) =>
                      updateConfig("hyperparameters.l1Regularization", Number.parseFloat(e.target.value))
                    }
                    step={0.01}
                  />
                </div>

                <div className="space-y-2">
                  <Label>L2 Regularization</Label>
                  <Input
                    type="number"
                    value={config.hyperparameters.l2Regularization}
                    onChange={(e) =>
                      updateConfig("hyperparameters.l2Regularization", Number.parseFloat(e.target.value))
                    }
                    step={0.01}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Dropout Rate</Label>
                  <Slider
                    value={[config.hyperparameters.dropoutRate as number]}
                    onValueChange={([value]) => updateConfig("hyperparameters.dropoutRate", value)}
                    min={0}
                    max={0.5}
                    step={0.1}
                  />
                </div>
              </>
            )}
          </>
        )}

        {/* Add similar sections for regression, clustering, and timeseries */}
      </CardContent>
    </Card>
  )
}

