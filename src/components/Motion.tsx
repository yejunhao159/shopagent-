"use client";

import { useInView, useSpring, useTransform, MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

function AnimatedNumber({ value, className }: { value: MotionValue<number>; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const rounded = useTransform(value, (v) => Math.round(v));

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      if (ref.current) ref.current.textContent = String(latest);
    });
    return unsubscribe;
  }, [rounded]);

  return <span ref={ref} className={className} />;
}

export function CountUp({
  target,
  prefix = "",
  suffix = "",
  className = "",
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const spring = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (isInView) spring.set(target);
  }, [isInView, spring, target]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <AnimatedNumber value={spring} />
      {suffix}
    </span>
  );
}
