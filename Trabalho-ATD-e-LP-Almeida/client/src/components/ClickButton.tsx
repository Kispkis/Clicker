import { motion } from "framer-motion";
import { MousePointerClick } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClickButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  colorClass?: string;
  delay?: number;
}

export function ClickButton({ 
  label, 
  onClick, 
  disabled, 
  colorClass = "bg-primary text-primary-foreground",
  delay = 0
}: ClickButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95, y: 0 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative group flex flex-col items-center justify-center gap-3",
        "w-full h-40 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300",
        "border border-white/10 backdrop-blur-sm",
        disabled && "opacity-50 cursor-not-allowed transform-none",
        colorClass
      )}
    >
      <div className="p-4 rounded-full bg-white/20 backdrop-blur-md group-hover:scale-110 transition-transform duration-300">
        <MousePointerClick className="w-8 h-8" />
      </div>
      <span className="text-xl font-bold tracking-wide font-display">{label}</span>
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/5 to-white/20 pointer-events-none" />
    </motion.button>
  );
}
