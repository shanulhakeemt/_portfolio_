import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring, useInView } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

import proj1 from "../../assets/Images/project-1.jpg";
import proj2 from "../../assets/Images/project-2.jpeg";
import proj3 from "../../assets/Images/project-3.jpg";
import proj4 from "../../assets/Images/project-4.jpg";
import proj5 from "../../assets/Images/project-5.png";
import proj6 from "../../assets/Images/project-6.jpg";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with real-time inventory, cart management, and secure Stripe payments.",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    image: proj1,
    github: "#",
    live: "#",
    featured: true,
  },
  {
    title: "AI Chat Application",
    description: "Real-time chat powered by OpenAI API with conversation history, multiple AI personas, and streaming responses.",
    tech: ["Next.js", "OpenAI", "Socket.io", "Redis"],
    image: proj2,
    github: "#",
    live: "#",
    featured: true,
  },
  {
    title: "Task Management Dashboard",
    description: "Kanban-style project management with drag-and-drop, team collaboration, and detailed analytics.",
    tech: ["React", "TypeScript", "Prisma", "PostgreSQL"],
    image: proj3,
    github: "#",
    live: "#",
  },
  {
    title: "Social Media Analytics",
    description: "A comprehensive analytics dashboard aggregating data across platforms with visual charts and trend prediction.",
    tech: ["Vue.js", "Python", "D3.js", "FastAPI"],
    image: proj4,
    github: "#",
    live: "#",
  },
  {
    title: "Dev Blog Platform",
    description: "MDX-powered blog platform with syntax highlighting, newsletter integration, and SEO optimization.",
    tech: ["Next.js", "MDX", "Tailwind", "Vercel"],
    image: proj5,
    github: "#",
    live: "#",
  },
  {
    title: "Finance Tracker",
    description: "Personal finance tracker with budget categorization, spending trends, and multi-currency support.",
    tech: ["React Native", "Expo", "Firebase", "Plaid"],
    image: proj6,
    github: "#",
    live: "#",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function TiltCard({ project, isDarkMode }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rawRotateX = useTransform(y, [-80, 80], [10, -10]);
  const rawRotateY = useTransform(x, [-80, 80], [-10, 10]);

  const rotateX = useSpring(rawRotateX, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(rawRotateY, { stiffness: 200, damping: 20 });

  const glowX = useTransform(x, [-80, 80], [0, 100]);
  const glowY = useTransform(y, [-80, 80], [0, 100]);

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className="relative group cursor-pointer"
    >
      {/* Glow effect */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(circle at ${glowX.get()}% ${glowY.get()}%, rgba(59,130,246,0.15), transparent 70%)`,
        }}
        className="absolute inset-0 rounded-2xl pointer-events-none z-0"
      />

      <div
        className={`relative rounded-2xl overflow-hidden border transition-all duration-500 ${
          isDarkMode
            ? "bg-gray-900/60 border-gray-800/60 hover:border-blue-500/40 backdrop-blur-xl"
            : "bg-white/70 border-gray-200/80 hover:border-blue-400/50 backdrop-blur-xl shadow-2xl"
        }`}
        style={{ transform: "translateZ(0)" }}
      >
        {/* Image */}
        <div className="relative overflow-hidden h-48">
          <motion.img
            src={project.image}
            alt={project.title}
            animate={{ scale: hovered ? 1.07 : 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              hovered ? "opacity-60" : "opacity-40"
            } ${
              isDarkMode
                ? "bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"
                : "bg-gradient-to-t from-gray-100 via-transparent to-transparent"
            }`}
          />
          {project.featured && (
            <div className="absolute top-3 right-3 bg-blue-500/90 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6" style={{ transform: "translateZ(20px)" }}>
          <h3
            className={`text-lg font-semibold mb-2 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {project.title}
          </h3>
          <p
            className={`text-sm leading-relaxed mb-4 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.map((t) => (
              <span
                key={t}
                className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  isDarkMode
                    ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    : "bg-blue-50 text-blue-600 border border-blue-200"
                }`}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3">
            <motion.a
              href={project.github}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                isDarkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <FiGithub size={15} />
              Code
            </motion.a>
            <motion.a
              href={project.live}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-1.5 text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors"
            >
              <FiExternalLink size={15} />
              Live Demo
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkSection() {
  const { isDarkMode } = useTheme();
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  return (
    <section
      id="work"
      ref={sectionRef}
      className={`relative py-28 px-6 overflow-hidden transition-all duration-500 ${
        isDarkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Subtle background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl ${
            isDarkMode ? "bg-blue-900/10" : "bg-blue-200/30"
          }`}
        />
        <div
          className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl ${
            isDarkMode ? "bg-purple-900/10" : "bg-purple-200/20"
          }`}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={`text-xs uppercase tracking-[0.3em] mb-3 ${
              isDarkMode ? "text-gray-500" : "text-gray-500"
            }`}
          >
            Portfolio
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-light mb-4"
          >
            Selected{" "}
            <span className="text-blue-500 font-medium">Work</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-20 h-px bg-blue-500 mx-auto"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={headingInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className={`mt-6 text-base max-w-xl mx-auto font-light ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            A selection of projects I've built — from full-stack applications to interactive experiences.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: 1200 }}
        >
          {projects.map((project) => (
            <TiltCard key={project.title} project={project} isDarkMode={isDarkMode} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
