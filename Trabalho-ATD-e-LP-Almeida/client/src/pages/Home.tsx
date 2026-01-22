import { useState } from "react";
import { useCreateClick } from "@/hooks/use-clicks";
import { ClickButton } from "@/components/ClickButton";
import { HistoryItem } from "@/components/HistoryItem";
import type { ClickResponse } from "@shared/routes";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, Trash2 } from "lucide-react";

export default function Home() {
  const [history, setHistory] = useState<ClickResponse[]>([]);
  const { mutate: registerClick, isPending } = useCreateClick();

  const handleButtonClick = (label: string) => {
    registerClick(
      { buttonLabel: label },
      {
        onSuccess: (data) => {
          setHistory((prev) => [data, ...prev]);
        },
      }
    );
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-background bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 text-primary mb-6">
            <Activity className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Click Tracker
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Track your interactions in real-time. The sequence resets daily. 
            Click a button below to generate a new timestamped entry.
          </p>
        </motion.div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <ClickButton 
            label="Botão 1" 
            onClick={() => handleButtonClick("Botão 1")}
            disabled={isPending}
            delay={0.1}
            colorClass="bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/25"
          />
          <ClickButton 
            label="Botão 2" 
            onClick={() => handleButtonClick("Botão 2")}
            disabled={isPending}
            delay={0.2}
            colorClass="bg-violet-500 hover:bg-violet-600 text-white shadow-violet-500/25"
          />
          <ClickButton 
            label="Botão 3" 
            onClick={() => handleButtonClick("Botão 3")}
            disabled={isPending}
            delay={0.3}
            colorClass="bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/25"
          />
          <ClickButton 
            label="Botão 4" 
            onClick={() => handleButtonClick("Botão 4")}
            disabled={isPending}
            delay={0.4}
            colorClass="bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/25"
          />
        </div>

        {/* Activity Feed */}
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-display flex items-center gap-2">
              Recent Activity
              {history.length > 0 && (
                <span className="text-sm font-normal bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
                  {history.length}
                </span>
              )}
            </h2>
            
            {history.length > 0 && (
              <button 
                onClick={clearHistory}
                className="text-sm text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
                Clear list
              </button>
            )}
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {history.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12 px-4 rounded-2xl border-2 border-dashed border-border bg-card/50"
                >
                  <p className="text-muted-foreground font-medium">No activity recorded yet today.</p>
                  <p className="text-sm text-muted-foreground/60 mt-1">Start clicking buttons to see the sequence build up.</p>
                </motion.div>
              ) : (
                history.map((item, index) => (
                  <HistoryItem key={`${item.sequence}-${item.time}`} item={item} index={index} />
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
