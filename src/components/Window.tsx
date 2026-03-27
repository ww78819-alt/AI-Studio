import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Maximize2 } from 'lucide-react';
import { ReactNode } from 'react';

interface WindowProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

export default function Window({ isOpen, onClose, title, children, className = "" }: WindowProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 20, stiffness: 150 }}
          className={`fixed inset-4 md:inset-10 lg:inset-20 glass rounded-3xl z-40 flex flex-col overflow-hidden ${className}`}
        >
          {/* Window Header */}
          <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-white/20">
            <div className="flex items-center gap-1.5 md:gap-2">
              <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors flex items-center justify-center group">
                <X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100" />
              </button>
              <div className="w-3 h-3 rounded-full bg-yellow-400 flex items-center justify-center group">
                <Minus className="w-2 h-2 text-yellow-900 opacity-0 group-hover:opacity-100" />
              </div>
              <div className="w-3 h-3 rounded-full bg-green-400 flex items-center justify-center group">
                <Maximize2 className="w-2 h-2 text-green-900 opacity-0 group-hover:opacity-100" />
              </div>
            </div>
            <div className="flex-1 text-center text-[10px] md:text-sm font-medium text-dark-gray/60 serif uppercase tracking-widest truncate px-2">
              {title}
            </div>
            <div className="w-12 md:w-16" /> {/* Spacer to balance the buttons */}
          </div>

          {/* Window Content */}
          <div className="flex-1 overflow-y-auto p-8 md:p-12 pb-32 md:pb-12">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
