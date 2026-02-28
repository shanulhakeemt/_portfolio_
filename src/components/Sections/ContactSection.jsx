import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiSend, FiCheck } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

// ─── Native Canvas2D particle field – zero React/R3F dependency ──────────────
function ParticleCanvas({ isDarkMode }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animId;
    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    // Particle creation
    const COUNT = 120;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      alpha: Math.random() * 0.5 + 0.15,
    }));

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const color = isDarkMode ? "59,130,246" : "96,165,250";

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${p.alpha})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            const opacity = (1 - dist / 90) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${color},${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    const onResize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

// ─── Floating Label helpers ──────────────────────────────────────────────────
function FloatingInput({ label, type = "text", name, value, onChange, required, isDarkMode }) {
  const [focused, setFocused] = useState(false);
  const filled = (value?.length ?? 0) > 0;

  return (
    <div className="relative">
      <motion.input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        animate={{
          boxShadow: focused
            ? "0 0 0 2px rgba(59,130,246,0.4)"
            : "0 0 0 0px rgba(59,130,246,0)",
        }}
        transition={{ duration: 0.25 }}
        className={`w-full pt-6 pb-2 px-4 rounded-xl border outline-none text-sm bg-transparent transition-colors duration-200 ${
          isDarkMode
            ? "border-gray-700 text-white focus:border-blue-500"
            : "border-gray-300 text-gray-900 focus:border-blue-500"
        }`}
      />
      <label
        htmlFor={name}
        className={`absolute left-4 font-medium pointer-events-none transition-all duration-200 ${
          focused || filled
            ? "top-2 text-xs text-blue-500"
            : `top-1/2 -translate-y-1/2 text-sm ${isDarkMode ? "text-gray-500" : "text-gray-400"}`
        }`}
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({ label, name, value, onChange, required, isDarkMode }) {
  const [focused, setFocused] = useState(false);
  const filled = (value?.length ?? 0) > 0;

  return (
    <div className="relative">
      <motion.textarea
        name={name}
        id={name}
        rows={4}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        animate={{
          boxShadow: focused
            ? "0 0 0 2px rgba(59,130,246,0.4)"
            : "0 0 0 0px rgba(59,130,246,0)",
        }}
        transition={{ duration: 0.25 }}
        className={`w-full pt-7 pb-2 px-4 rounded-xl border outline-none text-sm resize-none bg-transparent transition-colors duration-200 ${
          isDarkMode
            ? "border-gray-700 text-white focus:border-blue-500"
            : "border-gray-300 text-gray-900 focus:border-blue-500"
        }`}
      />
      <label
        htmlFor={name}
        className={`absolute left-4 font-medium pointer-events-none transition-all duration-200 ${
          focused || filled
            ? "top-2 text-xs text-blue-500"
            : `top-6 text-sm ${isDarkMode ? "text-gray-500" : "text-gray-400"}`
        }`}
      >
        {label}
      </label>
    </div>
  );
}

const socials = [
  { icon: FiGithub, label: "GitHub", href: "https://github.com/" },
  { icon: FiLinkedin, label: "LinkedIn", href: "https://linkedin.com/" },
  { icon: FiMail, label: "Email", href: "mailto:hello@example.com" },
];

export default function ContactSection() {
  const { isDarkMode } = useTheme();
  const headingRef = useRef(null);
  const formRef = useRef(null);

  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });
  const formInView = useInView(formRef, { once: true, margin: "-60px" });

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 3500);
    }, 1400);
  }

  return (
    <section
      id="contact"
      className={`relative py-28 px-6 overflow-hidden transition-all duration-500 ${
        isDarkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Canvas2D particle field – no R3F, no hook conflicts */}
      <ParticleCanvas isDarkMode={isDarkMode} />

      {/* Rotating gradient ring – pure CSS */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className={`absolute -right-40 -bottom-40 w-[600px] h-[600px] rounded-full border opacity-[0.06] pointer-events-none ${
          isDarkMode ? "border-blue-400" : "border-blue-500"
        }`}
        style={{ borderWidth: 80 }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className={`absolute -left-32 -top-32 w-[400px] h-[400px] rounded-full border opacity-[0.05] pointer-events-none ${
          isDarkMode ? "border-purple-400" : "border-purple-500"
        }`}
        style={{ borderWidth: 60 }}
      />

      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          isDarkMode
            ? "bg-gradient-to-b from-gray-950/50 via-transparent to-gray-950/60"
            : "bg-gradient-to-b from-gray-50/50 via-transparent to-gray-50/60"
        }`}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={`text-xs uppercase tracking-[0.3em] mb-3 ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}
          >
            Let's Talk
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-light mb-4"
          >
            Get in <span className="text-blue-500 font-medium">Touch</span>
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
            className={`mt-6 text-base max-w-lg mx-auto font-light ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </motion.p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start" ref={formRef}>
          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2"
          >
            <div
              className={`p-8 rounded-2xl border backdrop-blur-xl ${
                isDarkMode ? "bg-gray-900/60 border-gray-800" : "bg-white/70 border-gray-200 shadow-xl"
              }`}
            >
              <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Let's build something great
              </h3>
              <p className={`text-sm leading-relaxed mb-8 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Open to freelance projects, full-time roles, and collaborations. Usually reply within 24 hours.
              </p>
              <div className="space-y-4">
                {socials.map(({ icon: Icon, label, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-3 text-sm transition-colors group ${
                      isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <span
                      className={`p-2.5 rounded-xl border transition-colors ${
                        isDarkMode
                          ? "border-gray-700 group-hover:border-blue-500/50 group-hover:bg-blue-500/10"
                          : "border-gray-200 group-hover:border-blue-400 group-hover:bg-blue-50"
                      }`}
                    >
                      <Icon size={16} />
                    </span>
                    {label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <div
              className={`p-8 rounded-2xl border backdrop-blur-xl ${
                isDarkMode ? "bg-gray-900/60 border-gray-800" : "bg-white/70 border-gray-200 shadow-xl"
              }`}
            >
              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 gap-4 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                      <FiCheck size={28} className="text-blue-500" />
                    </div>
                    <h3 className={`text-xl font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      Message Sent!
                    </h3>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Thank you — I'll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FloatingInput label="Your Name" name="name" value={form.name} onChange={handleChange} required isDarkMode={isDarkMode} />
                      <FloatingInput label="Email Address" type="email" name="email" value={form.email} onChange={handleChange} required isDarkMode={isDarkMode} />
                    </div>
                    <FloatingInput label="Subject" name="subject" value={form.subject} onChange={handleChange} required isDarkMode={isDarkMode} />
                    <FloatingTextarea label="Your Message" name="message" value={form.message} onChange={handleChange} required isDarkMode={isDarkMode} />

                    <motion.button
                      type="submit"
                      disabled={status === "sending"}
                      whileHover={{ y: -2, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                        status === "sending"
                          ? "bg-blue-500/60 cursor-not-allowed text-white/80"
                          : "bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                      }`}
                    >
                      {status === "sending" ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block"
                          />
                          Sending…
                        </>
                      ) : (
                        <>
                          <FiSend size={15} />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={formInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className={`mt-16 text-center text-xs font-light ${isDarkMode ? "text-gray-600" : "text-gray-400"}`}
        >
          Crafted with care · {new Date().getFullYear()}
        </motion.div>
      </div>
    </section>
  );
}
