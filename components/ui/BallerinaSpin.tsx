'use client';

import { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Pause, Play, RotateCw } from "lucide-react";

interface BallerinaSpinProps {
  imageSrc?: string;
  title?: string;
  className?: string;
  autoSpinDuration?: number; // seconds per 360 turn
}

export default function BallerinaSpin({
  imageSrc = "/images/products/capri-track-pant.jpg",
  title = "Capri Track Pant Set",
  className = "",
  autoSpinDuration = 18,
}: BallerinaSpinProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [dragRotation, setDragRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const startRotRef = useRef(0);

  const handlePointerDown = (clientX: number) => {
    setIsDragging(true);
    startXRef.current = clientX;
    startRotRef.current = dragRotation;
  };

  const handlePointerMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - startXRef.current;
    setDragRotation(startRotRef.current + deltaX * 0.75);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={"relative w-full bg-[#5C4D45] rounded-2xl overflow-hidden select-none text-[#E7DED5] border border-[#8E786F]/30 shadow-2xl flex flex-col justify-between p-6 sm:p-10 " + className}
      style={{ minHeight: "540px" }}
    >
      {/* Atmosphere Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#362A24]/70 via-[#5C4D45]/30 to-[#362A24]/90 pointer-events-none" />
      <div className="absolute inset-0 grain pointer-events-none" />

      {/* Top Header Label */}
      <div className="relative z-10 flex justify-between items-center border-b border-[#E7DED5]/15 pb-4">
        <div className="flex items-center gap-2">
          <Sparkles size={12} className="text-[#C8A86A] fill-[#C8A86A]" />
          <span className="text-[10px] tracking-[0.35em] uppercase font-sans text-[#E7DED5]/80">
            Music-Box Turntable
          </span>
        </div>
        <div className="flex items-center gap-2 text-[9px] tracking-[0.25em] uppercase font-sans text-[#C8A86A] bg-[#362A24]/80 px-3 py-1 rounded-full border border-[#C8A86A]/30">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8A86A] animate-ping" />
          <span>360° Continuous Motion</span>
        </div>
      </div>

      {/* Center Ballerina Stage */}
      <div
        className="relative z-10 my-auto h-[360px] sm:h-[420px] w-full flex flex-col items-center justify-center cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          handlePointerUp();
        }}
        onMouseDown={(e) => handlePointerDown(e.clientX)}
        onMouseMove={(e) => handlePointerMove(e.clientX)}
        onMouseUp={handlePointerUp}
        onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
        onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
        onTouchEnd={handlePointerUp}
      >
        {/* Glowing Circular Music-Box Pedestal Base */}
        <div className="absolute bottom-6 w-56 sm:w-72 h-14 rounded-full bg-gradient-to-r from-[#C8A86A]/40 via-[#E7DED5]/30 to-[#C8A86A]/40 border border-[#C8A86A]/60 shadow-[0_0_30px_rgba(200,168,106,0.25)] transform rotate-x-60">
          <div className="absolute inset-1.5 rounded-full border border-[#E7DED5]/30 bg-[#362A24]/60" />
        </div>

        {/* Continuous 3D Ballerina Spin Stage */}
        <div className="relative w-60 sm:w-72 h-[320px] sm:h-[370px] flex items-center justify-center perspective-[1000px]">
          <motion.div
            className="relative w-full h-full"
            animate={
              isDragging
                ? { rotateY: dragRotation }
                : isPaused
                ? {}
                : { rotateY: [0, 360] }
            }
            transition={
              isDragging || isPaused
                ? { duration: 0 }
                : {
                    repeat: Infinity,
                    duration: autoSpinDuration,
                    ease: "linear",
                  }
            }
            style={{ transformStyle: "preserve-3d" }}
          >
            <Image
              src={imageSrc}
              alt={title}
              fill
              priority
              sizes="300px"
              className="object-contain pointer-events-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)]"
            />
          </motion.div>
        </div>

        {/* Hover / Drag Hint */}
        <div className="absolute bottom-1 bg-[#362A24]/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] tracking-[0.25em] uppercase text-[#E7DED5] border border-[#C8A86A]/30">
          {isDragging
            ? "Dragging 360°"
            : isPaused
            ? "Paused on Hover — Drag to inspect"
            : "Hover to pause • Drag to inspect"}
        </div>
      </div>

      {/* Control Footer */}
      <div className="relative z-10 flex justify-between items-center border-t border-[#E7DED5]/15 pt-4">
        <div className="font-serif text-sm italic text-[#E7DED5]">
          {title}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="inline-flex items-center gap-2 bg-[#E7DED5]/10 hover:bg-[#C8A86A] hover:text-[#362A24] border border-[#E7DED5]/30 px-4 py-2 rounded-full text-[9px] tracking-[0.2em] uppercase transition-all"
          >
            {isPaused ? (
              <>
                <Play size={10} />
                <span>Resume Turn</span>
              </>
            ) : (
              <>
                <Pause size={10} />
                <span>Pause Turn</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              setDragRotation(0);
              setIsPaused(false);
            }}
            className="p-2 rounded-full border border-[#E7DED5]/20 hover:border-[#C8A86A] text-[#E7DED5] hover:text-[#C8A86A] transition"
            title="Reset Spin"
          >
            <RotateCw size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
