import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const timeline = [
  {
    year: "2020",
    title: "Started the Journey",
    description: "Wrote my first line of code. Became obsessed with building things for the web.",
  },
  {
    year: "2021",
    title: "Dove Deep into React",
    description: "Built dozens of projects, mastered state management, and fell in love with component-driven UI.",
  },
  {
    year: "2022",
    title: "Full-Stack Development",
    description: "Expanded into Node.js, databases, and REST APIs. Delivered my first commercial project.",
  },
  {
    year: "2023",
    title: "Professional Experience",
    description: "Joined a startup as a full-stack developer. Led front-end architecture for multiple products.",
  },
  {
    year: "2024 →",
    title: "Building What's Next",
    description: "Exploring AI-powered UX, WebGL, and performance engineering at scale.",
  },
];

const ORBS = [
  { size: 380, top: "-10%", right: "-8%", color: "blue", delay: 0 },
  { size: 280, bottom: "5%", left: "-5%", color: "purple", delay: 3 },
  { size: 200, top: "40%", right: "20%", color: "indigo", delay: 6 },
];

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function AboutSection() {
  const { isDarkMode } = useTheme();
  const headingRef = useRef(null);
  const contentRef = useRef(null);

  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });
  const contentInView = useInView(contentRef, { once: true, margin: "-60px" });

  return (
    <section
      id="about"
      className={`relative py-28 px-6 overflow-hidden transition-all duration-500 ${
        isDarkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Animated floating orbs as CSS/Framer Motion – no R3F dependency conflict */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {ORBS.map((orb, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              scale: [1, 1.06, 1],
            }}
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: orb.delay,
            }}
            style={{
              width: orb.size,
              height: orb.size,
              top: orb.top,
              bottom: orb.bottom,
              left: orb.left,
              right: orb.right,
            }}
            className={`absolute rounded-full blur-3xl ${
              isDarkMode
                ? orb.color === "blue"
                  ? "bg-blue-700/15"
                  : orb.color === "purple"
                  ? "bg-purple-700/12"
                  : "bg-indigo-700/10"
                : orb.color === "blue"
                ? "bg-blue-300/25"
                : orb.color === "purple"
                ? "bg-purple-300/20"
                : "bg-indigo-300/15"
            }`}
          />
        ))}

        {/* Animated corner grid dots */}
        <svg
          className={`absolute right-0 top-0 w-72 h-72 opacity-5 ${
            isDarkMode ? "text-blue-400" : "text-blue-600"
          }`}
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          {Array.from({ length: 100 }).map((_, k) => (
            <circle
              key={k}
              r={1}
              cx={(k % 10) * 20 + 10}
              cy={Math.floor(k / 10) * 20 + 10}
            />
          ))}
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={`text-xs uppercase tracking-[0.3em] mb-3 ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}
          >
            Who I Am
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-light mb-4"
          >
            About <span className="text-blue-500 font-medium">Me</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-20 h-px bg-blue-500 mx-auto"
          />
        </div>

        {/* Content */}
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left – Bio */}
          <div>
            <div className="space-y-5">
              {[
                "I'm a Full Stack Developer passionate about crafting digital experiences that are both beautiful and performant.",
                "With expertise spanning React, Node.js, TypeScript, and modern databases, I build products end-to-end — from pixel-perfect interfaces to robust backend systems.",
                "I believe great software is a conversation between technology and human behavior. Every line of code I write is guided by that principle.",
                "Outside of work, I explore creative coding, contribute to open source, and constantly experiment with emerging technologies.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  custom={i}
                  variants={textVariants}
                  initial="hidden"
                  animate={contentInView ? "visible" : "hidden"}
                  className={`text-base leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-10 grid grid-cols-3 gap-6"
            >
              {[
                { label: "Years Exp.", value: "4+" },
                { label: "Projects Built", value: "30+" },
                { label: "Happy Clients", value: "15+" },
              ].map(({ label, value }) => (
                <motion.div
                  key={label}
                  whileHover={{ y: -4, scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  className={`p-5 rounded-2xl text-center border transition-all ${
                    isDarkMode
                      ? "bg-gray-900/50 border-gray-800 backdrop-blur-xl hover:border-blue-500/40"
                      : "bg-white/70 border-gray-200 shadow-lg backdrop-blur-xl hover:border-blue-300"
                  }`}
                >
                  <div className="text-3xl font-light text-blue-500 mb-1">{value}</div>
                  <div className={`text-xs uppercase tracking-wider ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                    {label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right – Timeline */}
          <div className="relative">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={contentInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/80 via-purple-500/40 to-transparent origin-top"
            />
            <div className="space-y-0">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate={contentInView ? "visible" : "hidden"}
                  className="relative pl-12 pb-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={contentInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.12 }}
                    className="absolute left-0 top-1.5 w-8 h-8 rounded-full ring-2 ring-blue-500/40 bg-blue-500/10 flex items-center justify-center"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  </motion.div>
                  <span className={`text-xs font-medium uppercase tracking-widest ${isDarkMode ? "text-blue-400" : "text-blue-500"}`}>
                    {item.year}
                  </span>
                  <h4 className={`text-base font-semibold mt-1 mb-1.5 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {item.title}
                  </h4>
                  <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
