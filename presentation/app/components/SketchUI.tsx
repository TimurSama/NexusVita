import React from 'react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Irregular border radius constant
const sketchRadius = "rounded-[255px_25px_225px_15px/15px_225px_15px_255px]";

export const SketchButton = ({ 
  children, 
  className, 
  variant = 'primary',
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.04, rotate: -1 }}
      whileTap={{ scale: 0.96, rotate: 1 }}
      className={cn(
        "relative px-10 py-5 font-serif text-xl font-bold transition-all duration-300",
        sketchRadius,
        variant === 'primary' 
          ? "bg-parchment text-ink border-2 border-ink neumorph-sketch-shadow" 
          : "bg-ink text-parchment border-2 border-ink",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 hatching opacity-0 hover:opacity-100 transition-opacity pointer-events-none rounded-inherit" />
      <span className="relative z-10 flex items-center justify-center gap-3">
        {children}
      </span>
      {/* Hand-drawn scribble edges */}
      <svg className="absolute -inset-[2px] w-[calc(100%+4px)] h-[calc(100%+4px)] pointer-events-none overflow-visible">
        <rect
          x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="opacity-40"
          rx="12"
        />
      </svg>
    </motion.button>
  );
};

export const SketchCard = ({ children, className, title, subtitle, icon: Icon }: any) => (
  <div className={cn(
    "relative p-10 bg-parchment border border-ink/30",
    sketchRadius,
    "neumorph-sketch-shadow",
    className
  )}>
    <div className="absolute inset-0 hatching opacity-5 pointer-events-none rounded-inherit" />
    
    {(title || Icon) && (
      <div className="mb-8 flex items-start gap-4">
        {Icon && <div className="p-4 bg-ink text-parchment rounded-xl sketch-border"><Icon className="w-8 h-8" /></div>}
        <div>
          {title && <h3 className="text-3xl font-bold font-serif text-ink tracking-tight">{title}</h3>}
          {subtitle && <p className="font-sketch text-xl text-ink/70 mt-1">{subtitle}</p>}
        </div>
      </div>
    )}
    
    <div className="relative z-10 font-sans text-ink/90 leading-relaxed">
      {children}
    </div>
    
    <div className="absolute bottom-3 right-5 font-mono text-[10px] opacity-30 uppercase tracking-widest">
      nexus_vita_core_mod_v2
    </div>
  </div>
);

export const BlueprintLabel = ({ children, className }: any) => (
  <span className={cn(
    "font-mono text-xs uppercase tracking-[0.2em] px-3 py-1 bg-ink text-parchment sketch-border inline-block",
    className
  )}>
    {children}
  </span>
);

export const SketchSlider = ({ label, min, max, value, onChange, unit }: any) => (
  <div className="space-y-4 py-4">
    <div className="flex justify-between items-end">
      <label className="font-mono text-xs uppercase text-ink/60">{label}</label>
      <span className="font-serif text-2xl font-bold text-ink">{value}{unit}</span>
    </div>
    <div className="relative h-12 flex items-center">
      <div className="absolute inset-0 bg-ink/5 sketch-border neumorph-sketch-inset" />
      <input 
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-full opacity-0 cursor-pointer z-20"
      />
      <motion.div 
        className="absolute left-0 h-full bg-ink/10 sketch-border"
        style={{ width: `${((value - min) / (max - min)) * 100}%` }}
      />
      <motion.div 
        className="absolute w-8 h-12 bg-parchment border-2 border-ink sketch-border neumorph-sketch-shadow"
        style={{ left: `calc(${((value - min) / (max - min)) * 100}% - 16px)` }}
      />
    </div>
  </div>
);

export const Annotation = ({ children, className }: any) => (
  <p className={cn("font-sketch text-2xl text-ink/60 rotate-[-1deg]", className)}>
    {children}
  </p>
);
