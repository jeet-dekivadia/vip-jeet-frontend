import type React from "react"

export type ModelType = "classification" | "regression" | "clustering" | "timeseries"

export interface DatasetMetadata {
  name: string
  rows: number
  columns: number
  features: string[]
  target: string
  missingValues: number
  dateCreated: Date
  lastModified: Date
  size: number
}

export interface ModelConfig {
  type: ModelType
  hyperparameters: Record<string, number | string | boolean>
  preprocessing: PreprocessingConfig
  validation: ValidationConfig
  architecture?: NeuralNetworkArchitecture
}

export interface PreprocessingConfig {
  scaling: "standard" | "minmax" | "robust" | "none"
  encoding: "label" | "onehot" | "target" | "none"
  missingValues: "mean" | "median" | "mode" | "drop" | "interpolate"
  featureSelection: {
    method: "pca" | "lda" | "none"
    nComponents?: number
  }
}

export interface ValidationConfig {
  method: "kfold" | "stratified" | "timeseries" | "holdout"
  splits: number
  testSize: number
  shuffle: boolean
  metrics: string[]
}

export interface NeuralNetworkArchitecture {
  layers: Layer[]
  optimizer: string
  learningRate: number
  batchSize: number
  epochs: number
}

export interface Layer {
  type: "dense" | "dropout" | "batch_norm" | "conv1d" | "lstm"
  units?: number
  activation?: string
  rate?: number
}

export interface ModelMetrics {
  accuracy?: number
  precision?: number
  recall?: number
  f1Score?: number
  mse?: number
  rmse?: number
  mae?: number
  r2?: number
  silhouetteScore?: number
  confusionMatrix?: number[][]
  rocCurve?: [number, number][]
  prCurve?: [number, number][]
  featureImportance: Record<string, number>
}

export interface TrainingProgress {
  epoch: number
  loss: number
  metrics: Record<string, number>
  validationLoss: number
  validationMetrics: Record<string, number>
  timestamp: Date
}

export interface ChatMessage {
  id: string
  content: string | React.ReactNode
  type: "text" | "code" | "error" | "warning" | "success" | "file" | "image"
  sender: "user" | "assistant"
  timestamp: Date
  metadata?: {
    language?: string
    fileName?: string
    fileSize?: number
    imageUrl?: string
    error?: Error
  }
}

export interface ProjectState {
  id: string
  name: string
  description: string
  created: Date
  modified: Date
  dataset: DatasetMetadata | null
  modelConfig: ModelConfig | null
  currentProgress: TrainingProgress | null
  metrics: ModelMetrics | null
  status: "idle" | "preprocessing" | "training" | "evaluating" | "complete" | "error"
  error?: Error
}

