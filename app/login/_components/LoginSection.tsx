"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-background";

export default function LoginSection() {
  return (
    <section
      className="w-full relative"
    >
      <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full absolute inset-0"
          >
            <CanvasRevealEffect
              animationSpeed={5}
              containerClassName="bg-transparent"
              colors={[
                [59, 130, 246],
                [139, 92, 246],
              ]}
              opacities={[0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 1]}
              showGradient={false}
              dotSize={2}
            />
          </motion.div>
      </AnimatePresence>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 bg-white rounded bg-opacity-75">
        <p className="text-xl">In real open source, you have the right to control your own destiny. - Linus Torvalds</p>
      </div>
    </section>
  );
}
