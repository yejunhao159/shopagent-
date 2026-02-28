"use client";

import { motion, useInView, useSpring, useTransform, MotionValue } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";

export function FadeInUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

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
