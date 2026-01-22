import { motion } from "framer-motion";
import { Clock, Hash, Calendar } from "lucide-react";
import type { ClickResponse } from "@shared/routes";

interface HistoryItemProps {
  item: ClickResponse;
  index: number;
}

export function HistoryItem({ item, index }: HistoryItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20, height: 0 }}
      animate={{ opacity: 1, x: 0, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="mb-3"
    >
      <div className="bg-card border border-border/50 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-border transition-all duration-300 flex items-center justify-between group">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold font-mono group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
            {item.sequence}
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{item.buttonLabel}</h4>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {item.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {item.time}
              </span>
            </div>
          </div>
        </div>
        
        <div className="hidden sm:block">
          <div className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
            Recorded
          </div>
        </div>
      </div>
    </motion.div>
  );
}
