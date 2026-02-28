import { motion } from "framer-motion";
import { 
  FaReact, 
  FaNodeJs, 
  FaHtml5, 
  FaCss3Alt, 
  FaJsSquare, 
  FaGithub, 
  FaDatabase 
} from "react-icons/fa";
import { 
  SiTailwindcss, 
  SiTypescript, 
  SiMongodb, 
  SiExpress, 
  SiFramer 
} from "react-icons/si";
import { useTheme } from "../../context/ThemeContext";
import { containerVariants, itemVariants } from "../../utils/helper";

const skills = [
  { name: "React", icon: FaReact, color: "text-blue-400" },
  { name: "Node.js", icon: FaNodeJs, color: "text-green-500" },
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-600" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-400" },
  { name: "MongoDB", icon: SiMongodb, color: "text-green-600" },
  { name: "Express", icon: SiExpress, color: "text-gray-400" },
  { name: "JavaScript", icon: FaJsSquare, color: "text-yellow-400" },
  { name: "HTML5", icon: FaHtml5, color: "text-orange-500" },
  { name: "CSS3", icon: FaCss3Alt, color: "text-blue-500" },
  { name: "Framer Motion", icon: SiFramer, color: "text-purple-500" },
  { name: "Database", icon: FaDatabase, color: "text-indigo-400" },
  { name: "GitHub", icon: FaGithub, color: "text-gray-500" },
];

function SkillsSection() {
  const { isDarkMode } = useTheme();

  return (
    <section
      id="skills"
      className={`py-20 transition-all duration-500 ${
        isDarkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-light mb-4"
          >
            My <span className="text-blue-500 font-medium">Skills</span>
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-20 h-1 bg-blue-500 mx-auto rounded-full mb-6"
          />
          <motion.p
            variants={itemVariants}
            className={`text-lg ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            } max-w-2xl mx-auto font-light`}
          >
            I specialize in building full-stack applications using the latest
            technologies and best practices in the industry.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className={`p-8 rounded-3xl flex flex-col items-center justify-center gap-4 transition-all duration-300 border ${
                isDarkMode
                  ? "bg-gray-900/50 border-gray-800 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                  : "bg-white border-gray-100 shadow-xl shadow-gray-200/50 hover:border-blue-300 hover:shadow-2xl"
              }`}
            >
              <skill.icon size={48} className={`${skill.color} transition-transform duration-300 group-hover:scale-110`} />
              <span className={`text-sm font-medium tracking-wider uppercase ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default SkillsSection;
