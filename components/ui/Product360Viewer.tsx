'use client';

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { RotateCw, Play, Pause, Sparkles } from "lucide-react";

interface Product360ViewerProps {
  imageSrc?: string;
  title?: string;
  className?: string;
}

export default function Product360Viewer({
  imageSrc = "/images/products/capri-track-pant.jpg",
  title = "Capri Track Pant",
  className = "",
}: Product360ViewerProps) {
  const [rotation, setRotation] = useState<number>(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const startXRef = useRef<number>(0);
  const startRotationRef = useRef<number>(0);

  // Auto-turntable spin loop
  useEffect(() => {
    let animationFrameId: number;
    if (isAutoSpinning && !isDragging) {
      const spin = () => {
        setRotation((prev) => (prev + 1.2) % 360);
        animationFrameId = requestAnimationFrame(spin);
      };
      animationFrameId = requestAnimationFrame(spin);
    }
    return () => cancelAnimationFrame(animationFrameId);
  }, [isAutoSpinning, isDragging]);

  // Mouse / Touch Drag Handlers for 360° Rotation
  const handlePointerDown = (clientX: number) => {
    setIsDragging(true);
    startXRef.current = clientX;
    startRotationRef.current = rotation;
  };

  const handlePointerMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - startXRef.current;
    // Sensitivity: 1px movement = 0.8 degrees of rotation
    let newAngle = (startRotationRef.current + deltaX * 0.8) % 360;
    if (newAngle < 0) newAngle += 360;
    setRotation(newAngle);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const currentDegree = Math.round(rotation);

  // Hotspot annotations based on current 360 degree angle
  const showFrontHotspot = currentDegree >= 330 || currentDegree <= 45;
  const showSideHotspot = currentDegree >= 46 && currentDegree <= 135;
  const showBackHotspot = currentDegree >= 136 && currentDegree <= 225;

  return (
    <div
      className={"relative w-full bg-[#5C4D45] rounded-xl overflow-hidden select-none text-[#E7DED5] border border-[#8E786F]/30 shadow-2xl flex flex-col justify-between p-6 sm:p-8 " + className}
      style={{ minHeight: "520px" }}
    >
      {/* Background Architectural Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#362A24]/60 via-[#5C4D45]/40 to-[#362A24]/80 pointer-events-none" />
      <div className="absolute inset-0 grain pointer-events-none" />

      {/* Header Info Bar */}
      <div className="relative z-10 flex justify-between items-center border-b border-[#E7DED5]/15 pb-4">
        <div className="flex items-center gap-2">
          <Sparkles size={12} className="text-[#C8A86A] fill-[#C8A86A]" />
          <span className="text-[10px] tracking-[0.3em] uppercase font-sans text-[#E7DED5]/80">
            360° Interactive Studio
          </span>
        </div>
        <div className="flex items-center gap-2 bg-[#362A24]/70 px-3 py-1 rounded-full border border-[#C8A86A]/40 text-[#C8A86A] font-mono text-[10px] tracking-widest">
          <RotateCw size={11} className={isAutoSpinning ? "animate-spin" : ""} />
          <span>{currentDegree}°</span>
        </div>
      </div>

      {/* Center Interactive 360 Canvas Stage */}
      <div
        className="relative z-10 my-auto h-[340px] sm:h-[400px] w-full flex items-center justify-center cursor-grab active:cursor-grabbing"
        onMouseDown={(e) => handlePointerDown(e.clientX)}
        onMouseMove={(e) => handlePointerMove(e.clientX)}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
        onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
        onTouchEnd={handlePointerUp}
      >
        {/* Rotating Podium Base */}
        <div className="absolute bottom-4 w-52 sm:w-64 h-12 rounded-full bg-gradient-to-r from-[#C8A86A]/30 via-[#E7DED5]/20 to-[#C8A86A]/30 border border-[#C8A86A]/40 shadow-inner transform rotate-x-60">
          <div className="absolute inset-1 rounded-full border border-[#E7DED5]/30 bg-[#362A24]/40" />
        </div>

        {/* 360 Rotatable Garment Stage */}
        <motion.div
          className="relative w-56 sm:w-64 h-[300px] sm:h-[350px] flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            perspective: 1000,
          }}
        >
          <motion.div
            style={{
              rotateY: rotation,
              transformStyle: "preserve-3d",
            }}
            className="relative w-full h-full"
          >
            <Image
              src={imageSrc}
              alt={title + " 360 view"}
              fill
              priority
              sizes="280px"
              className="object-contain pointer-events-none drop-shadow-2xl"
            />
          </motion.div>
        </motion.div>

        {/* 3D Angle-Based Feature Hotspots */}
        {showFrontHotspot && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-12 left-6 sm:left-12 bg-[#362A24]/90 backdrop-blur-md px-3 py-1.5 rounded border border-[#C8A86A]/50 text-[9px] tracking-[0.2em] uppercase text-[#E7DED5] shadow-lg pointer-events-none flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A86A] animate-ping" />
            <span>High-Rise Waistband (Front 0°)</span>
          </motion.div>
        )}

        {showSideHotspot && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-1/2 right-4 sm:right-8 bg-[#362A24]/90 backdrop-blur-md px-3 py-1.5 rounded border border-[#C8A86A]/50 text-[9px] tracking-[0.2em] uppercase text-[#E7DED5] shadow-lg pointer-events-none flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A86A] animate-ping" />
            <span>Contrast Side Piping (Side 90°)</span>
          </motion.div>
        )}

        {showBackHotspot && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute bottom-16 left-6 sm:left-12 bg-[#362A24]/90 backdrop-blur-md px-3 py-1.5 rounded border border-[#C8A86A]/50 text-[9px] tracking-[0.2em] uppercase text-[#E7DED5] shadow-lg pointer-events-none flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A86A] animate-ping" />
            <span>Relaxed Drop-Crotch (Back 180°)</span>
          </motion.div>
        )}

        {/* Drag Hint Instruction */}
        {!isDragging && !isAutoSpinning && (
          <div className="absolute bottom-1 bg-[#E7DED5]/15 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] tracking-[0.25em] uppercase text-[#E7DED5] border border-[#E7DED5]/20 animate-pulse pointer-events-none">
            Drag Left/Right to Spin 360°
          </div>
        )}
      </div>

      {/* Control Actions Bar */}
      <div className="relative z-10 flex justify-between items-center border-t border-[#E7DED5]/15 pt-4">
        <div className="text-[10px] tracking-[0.2em] uppercase text-[#E7DED5]/80 font-serif italic">
          {title}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAutoSpinning(!isAutoSpinning)}
            className="inline-flex items-center gap-2 bg-[#E7DED5]/10 hover:bg-[#C8A86A] hover:text-[#362A24] border border-[#E7DED5]/30 px-4 py-2 rounded-full text-[9px] tracking-[0.2em] uppercase font-sans transition-all"
          >
            {isAutoSpinning ? (
              <>
                <Pause size={10} />
                <span>Pause Spin</span>
              </>
            ) : (
              <>
                <Play size={10} />
                <span>Auto Turntable</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              setIsAutoSpinning(false);
              setRotation(0);
            }}
            className="p-2 rounded-full border border-[#E7DED5]/20 hover:border-[#C8A86A] text-[#E7DED5] hover:text-[#C8A86A] transition"
            title="Reset to 0°"
          >
            <RotateCw size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
