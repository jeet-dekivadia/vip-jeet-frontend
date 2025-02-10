"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, LayersIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Layer, NeuralNetworkArchitecture } from "@/types/ml-types"

interface ArchitectureBuilderProps {
  architecture: NeuralNetworkArchitecture
  onChange: (architecture: NeuralNetworkArchitecture) => void
}

export function ArchitectureBuilder({ architecture, onChange }: ArchitectureBuilderProps) {
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null)

  const addLayer = (type: Layer["type"]) => {
    const newLayer: Layer = {
      type,
      units: type === "dense" ? 64 : undefined,
      activation: type === "dense" ? "relu" : undefined,
      rate: type === "dropout" ? 0.5 : undefined,
    }

    const newArchitecture = {
      ...architecture,
      layers: [...architecture.layers, newLayer],
    }

    onChange(newArchitecture)
  }

  const removeLayer = (index: number) => {
    const newLayers = architecture.layers.filter((_, i) => i !== index)
    onChange({ ...architecture, layers: newLayers })
  }

  const updateLayer = (index: number, updates: Partial<Layer>) => {
    const newLayers = architecture.layers.map((layer, i) => (i === index ? { ...layer, ...updates } : layer))
    onChange({ ...architecture, layers: newLayers })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Architecture</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => addLayer("dense")}>
            <Plus className="w-4 h-4 mr-2" />
            Dense Layer
          </Button>
          <Button variant="outline" size="sm" onClick={() => addLayer("dropout")}>
            <Plus className="w-4 h-4 mr-2" />
            Dropout
          </Button>
          <Button variant="outline" size="sm" onClick={() => addLayer("batch_norm")}>
            <Plus className="w-4 h-4 mr-2" />
            Batch Norm
          </Button>
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {architecture.layers.map((layer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative"
              >
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-4">
                      <LayersIcon className="w-4 h-4" />
                      <div className="flex-1">
                        <div className="font-medium">
                          Layer {index + 1}: {layer.type}
                        </div>
                        {layer.type === "dense" && (
                          <div className="mt-2 space-y-2">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <Label>Units</Label>
                                <Input
                                  type="number"
                                  value={layer.units}
                                  onChange={(e) =>
                                    updateLayer(index, {
                                      units: Number.parseInt(e.target.value),
                                    })
                                  }
                                />
                              </div>
                              <div>
                                <Label>Activation</Label>
                                <Select
                                  value={layer.activation}
                                  onValueChange={(value) => updateLayer(index, { activation: value })}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="relu">ReLU</SelectItem>
                                    <SelectItem value="sigmoid">Sigmoid</SelectItem>
                                    <SelectItem value="tanh">Tanh</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        )}
                        {layer.type === "dropout" && (
                          <div className="mt-2">
                            <Label>Rate</Label>
                            <Input
                              type="number"
                              value={layer.rate}
                              onChange={(e) =>
                                updateLayer(index, {
                                  rate: Number.parseFloat(e.target.value),
                                })
                              }
                              step={0.1}
                              min={0}
                              max={1}
                            />
                          </div>
                        )}
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeLayer(index)}>
                        <Minus className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}

