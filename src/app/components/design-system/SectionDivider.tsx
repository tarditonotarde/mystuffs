import { motion } from 'motion/react';

interface SectionDividerProps {
  className?: string;
}

const dividerVariants = {
  hidden: { scaleX: 0 },
  visible: { 
    scaleX: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export function SectionDivider({
  className = ''
}: SectionDividerProps) {
  return (
    <motion.div 
      className={`w-full h-[1px] bg-black origin-left ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={dividerVariants}
    />
  );
}