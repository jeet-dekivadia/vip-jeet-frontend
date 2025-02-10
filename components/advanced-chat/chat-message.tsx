"use client"

import { motion } from "framer-motion"
import type { ChatMessage } from "@/types/ml-types"
import { CodeBlock } from "./code-block"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ChatMessageProps {
  message: ChatMessage
}

export function ChatMessageItem({ message }: ChatMessageProps) {
  const isAssistant = message.sender === "assistant"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isAssistant ? "" : "flex-row-reverse"}`}
    >
      <Avatar>
        <AvatarImage src={isAssistant ? "/ai-avatar.png" : "/user-avatar.png"} />
        <AvatarFallback>{isAssistant ? "AI" : "U"}</AvatarFallback>
      </Avatar>

      <div className={`flex flex-col gap-2 max-w-[80%] ${isAssistant ? "" : "items-end"}`}>
        <Card className="p-4">
          {message.type === "code" ? (
            <CodeBlock code={message.content as string} language={message.metadata?.language || "python"} />
          ) : message.type === "image" ? (
            <img
              src={message.metadata?.imageUrl || "/placeholder.svg"}
              alt="Shared image"
              className="max-w-full rounded-lg"
            />
          ) : (
            <div className="prose dark:prose-invert">{message.content}</div>
          )}
        </Card>
        <span className="text-xs text-muted-foreground">{message.timestamp.toLocaleTimeString()}</span>
      </div>
    </motion.div>
  )
}

