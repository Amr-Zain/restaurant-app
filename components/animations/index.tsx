"use client";
import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
}

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  ...props
}: FadeInProps) {
  const initialVariants = {
    up: { opacity: 0, y: 30 },
    down: { opacity: 0, y: -30 },
    left: { opacity: 0, x: 30 },
    right: { opacity: 0, x: -30 },
    none: { opacity: 0 },
  };

  const animateVariants = {
    up: { opacity: 1, y: 0 },
    down: { opacity: 1, y: 0 },
    left: { opacity: 1, x: 0 },
    right: { opacity: 1, x: 0 },
    none: { opacity: 1 },
  };

  return (
    <motion.div
      initial={initialVariants[direction]}
      whileInView={animateVariants[direction]}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration, delay, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}


interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delayChildren?: number;
  staggerChildren?: number;
}

export function StaggerContainer({
  children,
  delayChildren = 0.2,
  staggerChildren = 0.1,
  ...props
}: StaggerContainerProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delayChildren,
        staggerChildren: staggerChildren,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}


interface StaggerItemProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  direction?: "up" | "left" | "none";
}

export function StaggerItem({ children, direction = "up", ...props }: StaggerItemProps) {
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 20 : 0,
      x: direction === "left" ? 20 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  };

  return (
    <motion.div variants={itemVariants} {...props}>
      {children}
    </motion.div>
  );
}

interface ScaleInProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  initialScale?: number;
}

export function ScaleIn({
  children,
  delay = 0,
  duration = 0.5,
  initialScale = 0.8,
  ...props
}: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: initialScale }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration, delay, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}