"use client"

import { useState } from "react"
import type { ModelConfig, ProjectState } from "@/types/ml-types"
import { DataInputForm } from "@/components/data-input-form"
import { ChatInterface } from "@/components/chat-interface"
import { ModelViewer3D } from "@/components/ui/3d-model-viewer"
import { HyperparameterTuning } from "@/components/model-config/hyperparameter-tuning"
import { ArchitectureBuilder } from "@/components/model-config/architecture-builder"
import { ProgressVisualization } from "@/components/training/progress-visualization"
import { ModelEvaluation } from "@/components/results/model-evaluation"
import { useModelTraining } from "@/lib/hooks/use-model-training"
import { useDatasetAnalysis } from "@/lib/hooks/use-dataset-analysis"

export default function Home() {
  const [projectState, setProjectState] = useState<ProjectState>({
    id: "default",
    name: "New Project",
    description: "",
    created: new Date(),
    modified: new Date(),
    dataset: null,
    modelConfig: null,
    currentProgress: null,
    metrics: null,
    status: "idle",
  })

  const { isAnalyzing, analyzeDataset } = useDatasetAnalysis()
  const { isTraining, progress, metrics, startTraining } = useModelTraining(
    projectState.modelConfig || {
      type: "classification",
      hyperparameters: {},
      preprocessing: {
        scaling: "standard",
        encoding: "label",
        missingValues: "mean",
        featureSelection: { method: "none" },
      },
      validation: {
        method: "kfold",
        splits: 5,
        testSize: 0.2,
        shuffle: true,
        metrics: ["accuracy", "f1"],
      },
    },
  )

  const handleDatasetUpload = async (file: File) => {
    try {
      const metadata = await analyzeDataset(file)
      setProjectState((prev) => ({
        ...prev,
        dataset: metadata,
        modified: new Date(),
      }))
    } catch (error) {
      console.error("Error analyzing dataset:", error)
    }
  }

  const handleConfigUpdate = (config: ModelConfig) => {
    setProjectState((prev) => ({
      ...prev,
      modelConfig: config,
      modified: new Date(),
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto p-4 space-y-8">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent animate-gradient">
          VIP VP4 AIMN Virtual Assistant
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <DataInputForm onFileUpload={handleDatasetUpload} isAnalyzing={isAnalyzing} />

            {projectState.dataset && (
              <>
                <HyperparameterTuning config={projectState.modelConfig!} onChange={handleConfigUpdate} />
                <ArchitectureBuilder
                  architecture={projectState.modelConfig?.architecture!}
                  onChange={(architecture) =>
                    handleConfigUpdate({
                      ...projectState.modelConfig!,
                      architecture,
                    })
                  }
                />
              </>
            )}
          </div>

          <div className="space-y-8">
            <ChatInterface />
            <ModelViewer3D />
          </div>
        </div>

        {isTraining && progress.length > 0 && (
          <ProgressVisualization progress={progress} currentEpoch={progress.length} totalEpochs={10} />
        )}

        {metrics && <ModelEvaluation metrics={metrics} />}
      </main>
    </div>
  )
}

