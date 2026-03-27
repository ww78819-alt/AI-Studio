import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { User, Briefcase, Mail, Home } from 'lucide-react';
import { AppWindow } from '../types';
import { useRef } from 'react';

interface DockProps {
  onOpen: (window: AppWindow) => void;
  activeWindow: AppWindow;
}

const DOCK_ITEMS = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'about', icon: User, label: 'About' },
  { id: 'projects', icon: Briefcase, label: 'Projects' },
  { id: 'contact', icon: Mail, label: 'Contact' },
];

export default function Dock({ onOpen, activeWindow }: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-end gap-4 px-4 py-3 glass rounded-2xl z-50"
    >
      {DOCK_ITEMS.map((item) => (
        <DockIcon
          key={item.id}
          mouseX={mouseX}
          item={item}
          onClick={() => onOpen(item.id as AppWindow)}
          isActive={activeWindow === item.id}
        />
      ))}
    </motion.div>
  );
}

interface DockIconProps {
  mouseX: any;
  item: any;
  onClick: () => void;
  isActive: boolean;
}

const DockIcon: React.FC<DockIconProps> = ({ mouseX, item, onClick, isActive }) => {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [48, 80, 48]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      onClick={onClick}
      className="relative aspect-square flex items-center justify-center rounded-xl bg-white/20 hover:bg-white/40 cursor-pointer transition-colors group"
    >
      <item.icon className="w-1/2 h-1/2 text-dark-gray" />
      {isActive && (
        <div className="absolute -bottom-1.5 w-1 h-1 bg-dark-gray rounded-full" />
      )}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-dark-gray text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {item.label}
      </div>
    </motion.div>
  );
}
