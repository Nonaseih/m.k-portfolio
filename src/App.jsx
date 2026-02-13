import React, { useState, useEffect } from "react";
import "./thin-tech.css";
import { FaPython, FaNodeJs, FaReact, FaDatabase, FaGitAlt, FaDocker, FaPhone, FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiMongodb, SiExpress, SiTensorflow, SiPytorch, SiNumpy, SiScikitlearn, SiJavascript, SiTypescript } from "react-icons/si";
import { FaTelegramPlane } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

function App() {
  const [currentSection, setCurrentSection] = useState("ABOUT");
  const sections = [
    { label: "HOME", file: "HOME.TXT" },
    { label: "ABOUT", file: "ABOUT.TXT" },
    { label: "EXPERIENCE", file: "EXPERIENCE.TXT" },
    { label: "PROJECTS", file: "PROJECTS.TXT" },
    { label: "CONTACT", file: "CONTACT.TXT" },
  ];

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-mono thin-tech relative overflow-hidden">
      {/* Grid background overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Background Watermark Text */}
      <div className="fixed inset-0 flex justify-center items-center z-0 pointer-events-none select-none">
        <span className="text-[10vw] font-thin text-gray-700 opacity-20 tracking-widest" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
          MOSES KOLAWOLE
        </span>
      </div>


      {/* Modern Animated Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
          ${scrolled
            ? 'backdrop-blur-md bg-black/70 shadow-xl border-b border-green-400'
            : 'bg-transparent border-b border-transparent'}
        `}
        style={{
          boxShadow: scrolled ? '0 4px 24px 0 rgba(0,255,128,0.08)' : 'none',
        }}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto px-8 py-4">
          {/* Logo */}
          <a
            href="#hero"
            className={`thin-tech font-extrabold tracking-widest transition-all duration-500 select-none
              ${scrolled ? 'text-2xl text-green-400 scale-110 drop-shadow-lg' : 'text-3xl text-white'}`}
            style={{ letterSpacing: '0.25em' }}
            onClick={e => {
              e.preventDefault();
              const el = document.getElementById("hero");
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            MK
          </a>
          {/* Nav Links */}
          <ul className="thin-tech flex gap-8 text-base">
            {sections.map((section) => (
              <li
                key={section.label}
                className={`cursor-pointer transition-colors font-bold
                  ${currentSection === section.label ? 'text-green-400' : 'text-white hover:text-green-400'}`}
                onClick={() => {
                  setCurrentSection(section.label);
                  if (section.label === "HOME") {
                    const el = document.getElementById("hero");
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  } else {
                    const el = document.getElementById(section.label.toLowerCase());
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                {section.label}
              </li>
            ))}
          </ul>
          {/* Badge (right) */}
          <div className="hidden md:block border border-green-400 px-3 py-1 text-green-400 text-xs tracking-widest w-32 text-center ml-8">
            {sections.find((s) => s.label === currentSection)?.file}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="flex flex-col items-center justify-center text-center py-24 z-10 relative select-none">
        {/* Terminal-style intro */}
        <div className="mb-4">
          <span className="text-green-400 thin-tech">moses@portfolio</span>
          <span className="text-white thin-tech">:~$</span>
          <span className="text-gray-400 thin-tech"> ./introduce.sh</span>
        </div>
        {/* Main headline with typewriter */}
        <h1 className="text-5xl md:text-7xl font-extrabold mb-2 tracking-tight thin-tech" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
          <span className="text-green-400">
            <Typewriter
              words={[
                "Moses Kolawole",
                "Full Stack Developer",
                "AI Engineer",
                "Data Scientist",
                "Creator",
                "Problem Solver",
                "Tech Enthusiast"
              ]}
              speed={90}
              pause={1200}
            />
          </span>
        </h1>
        {/* Subtitle with chevron and roles */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="text-green-400 text-xl">&gt;</span>
          <span className="text-gray-300 thin-tech">AI ENGINEER</span>
          <span className="text-gray-500 thin-tech">|</span>
          <span className="text-gray-300 thin-tech">DATA SCIENTIST</span>
        </div>
        {/* Code-style intro lines */}
        <div className="max-w-2xl mx-auto text-left mb-10">
          <div className="flex items-start mb-2">
            <span className="text-green-400 mr-2 thin-tech">//</span>
            <span className="text-white thin-tech">Hi, I'm <span className="font-bold">Moses Kolawole</span>, an AI engineer and data scientist.</span>
          </div>
          <div className="flex items-start mb-2">
            <span className="text-green-400 mr-2 thin-tech">//</span>
            <span className="text-white thin-tech">I build <span className="underline font-bold">seamless digital experiences</span> that merge intelligence with functionality.</span>
          </div>
          <div className="flex items-start">
            <span className="text-green-400 mr-2 thin-tech">//</span>
            <span className="text-white thin-tech">My goal: craft solutions that <span className="font-bold">exceed expectations</span>.</span>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <a href="#projects" className="bg-white text-black px-8 py-4 rounded border border-white font-mono text-lg shadow hover:bg-black hover:text-green-400 hover:border-green-400 transition-all thin-tech" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
            $ view_projects &rarr;
          </a>
          <a href="/cv.pdf" download className="bg-black text-white px-8 py-4 rounded border border-white font-mono text-lg shadow hover:bg-white hover:text-black hover:border-green-400 transition-all thin-tech" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
            $ download_cv
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 z-10 relative max-w-6xl mx-auto">
        <div className="mb-10">
          <div className="border-l-4 border-green-400 pl-4 mb-8">
            <div className="text-green-400 font-semibold mb-2 thin-tech">// Introduction</div>
            <p className="text-lg md:text-xl text-gray-100 thin-tech">
              Moses Kolawole is a passionate <span className="font-bold">AI Engineer</span> and <span className="font-bold">Data Scientist</span> with a proven track record of building intelligent, data-driven solutions. With years of hands-on experience, he specializes in designing, developing, and deploying machine learning models and AI systems that solve real-world problems.
            </p>
          </div>
          <div className="border-l-4 border-blue-400 pl-4 mb-8">
            <div className="text-blue-400 font-semibold mb-2 thin-tech">// Approach</div>
            <p className="text-lg md:text-xl text-gray-100 thin-tech">
              Moses thrives at the intersection of data and technology, leveraging advanced analytics, deep learning, and automation to deliver impactful results. He is dedicated to continuous learning, staying ahead of the curve in the rapidly evolving fields of AI and data science.
            </p>
          </div>
          <div className="border-l-4 border-purple-400 pl-4 mb-8">
            <div className="text-purple-400 font-semibold mb-2 thin-tech">// Commitment</div>
            <p className="text-lg md:text-xl text-gray-100 thin-tech">
              Whether collaborating with teams or working independently, Moses brings a detail-oriented, innovative mindset to every project—transforming complex data into actionable insights and intelligent products.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="border border-neutral-700 bg-black bg-opacity-60 rounded-lg py-8 flex flex-col items-center">
            <span className="text-4xl font-bold text-green-400 thin-tech"><AnimatedCounter to={50} duration={2.5} /></span>
            <span className="mt-2 text-gray-200 thin-tech">Happy Clients</span>
          </div>
          <div className="border border-neutral-700 bg-black bg-opacity-60 rounded-lg py-8 flex flex-col items-center">
            <span className="text-4xl font-bold text-green-400 thin-tech"><AnimatedCounter to={5} duration={2.5} />+</span>
            <span className="mt-2 text-gray-200 thin-tech">Years Learning</span>
          </div>
          <div className="border border-neutral-700 bg-black bg-opacity-60 rounded-lg py-8 flex flex-col items-center">
            <span className="text-4xl font-bold text-green-400 thin-tech"><AnimatedCounter to={100} duration={2.5} />%</span>
            <span className="mt-2 text-gray-200 thin-tech">Dedication</span>
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section id="experience" className="py-20 px-4 z-10 relative max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-blue-400 thin-tech">// Experience</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* AI Engineering */}
          <div className="border-l-4 border-green-400 pl-6 mb-6">
            <h3 className="text-green-400 text-xl font-semibold mb-2 thin-tech">AI Engineering</h3>
            <div className="mb-4">
              <AnimatedSkillBar name="Python" percent={95} color="bg-green-400" />
              <AnimatedSkillBar name="Node.js" percent={90} color="bg-green-400" />
              <AnimatedSkillBar name="React" percent={92} color="bg-green-400" />
              <AnimatedSkillBar name="Database" percent={85} color="bg-green-400" />
              <AnimatedSkillBar name="Git" percent={88} color="bg-green-400" />
              <AnimatedSkillBar name="Docker" percent={80} color="bg-green-400" />
            </div>
          </div>
          {/* Full Stack Development */}
          <div className="border-l-4 border-blue-400 pl-6 mb-6">
            <h3 className="text-blue-400 text-xl font-semibold mb-2 thin-tech">Full Stack Development</h3>
            <div className="mb-4">
              <AnimatedSkillBar name="React.js" percent={90} color="bg-cyan-400" />
              <AnimatedSkillBar name="Node.js" percent={85} color="bg-green-500" />
              <AnimatedSkillBar name="Express.js" percent={80} color="bg-gray-300" />
              <AnimatedSkillBar name="MongoDB" percent={80} color="bg-green-400" />
              <AnimatedSkillBar name="SQL" percent={75} color="bg-blue-300" />
              <AnimatedSkillBar name="Git" percent={85} color="bg-orange-500" />
              <AnimatedSkillBar name="Docker" percent={70} color="bg-blue-500" />
              <AnimatedSkillBar name="JavaScript" percent={95} color="bg-yellow-300" />
              <AnimatedSkillBar name="TypeScript" percent={70} color="bg-blue-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 z-10 relative max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-green-400 thin-tech">// Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Project Card Example */}
          <div className="border border-neutral-700 bg-black bg-opacity-60 rounded-lg p-8 flex flex-col justify-between shadow-lg hover:border-green-400 transition-all">
            <h3 className="text-2xl font-bold mb-2 text-green-400 thin-tech">AI Chatbot Platform</h3>
            <p className="text-gray-200 mb-4 thin-tech">A conversational AI platform for customer support, featuring RAG, prompt engineering, and custom AI agents. Built with React, Node.js, and Python.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-green-900 text-green-300 px-2 py-1 rounded text-xs thin-tech">React</span>
              <span className="bg-green-900 text-green-300 px-2 py-1 rounded text-xs thin-tech">Node.js</span>
              <span className="bg-green-900 text-green-300 px-2 py-1 rounded text-xs thin-tech">Python</span>
              <span className="bg-green-900 text-green-300 px-2 py-1 rounded text-xs thin-tech">RAG</span>
            </div>
            <a href="#" className="text-green-400 underline thin-tech">View Project &rarr;</a>
          </div>
          <div className="border border-neutral-700 bg-black bg-opacity-60 rounded-lg p-8 flex flex-col justify-between shadow-lg hover:border-green-400 transition-all">
            <h3 className="text-2xl font-bold mb-2 text-green-400 thin-tech">Data Insights Dashboard</h3>
            <p className="text-gray-200 mb-4 thin-tech">An interactive dashboard for visualizing and analyzing business data, with advanced charts and real-time updates. Built with React, D3.js, and MongoDB.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-green-900 text-green-300 px-2 py-1 rounded text-xs thin-tech">React</span>
              <span className="bg-green-900 text-green-300 px-2 py-1 rounded text-xs thin-tech">D3.js</span>
              <span className="bg-green-900 text-green-300 px-2 py-1 rounded text-xs thin-tech">MongoDB</span>
            </div>
            <a href="#" className="text-green-400 underline thin-tech">View Project &rarr;</a>
          </div>
          <div className="border border-neutral-700 bg-black bg-opacity-60 rounded-lg p-8 flex flex-col justify-between shadow-lg hover:border-green-400 transition-all">
            <h3 className="text-2xl font-bold mb-2 text-green-400 thin-tech">Smart Resume Parser</h3>
            <p className="text-gray-200 mb-4 thin-tech">A tool that uses NLP and machine learning to extract and analyze key information from resumes. Built with Python, spaCy, and FastAPI.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-green-900 text-green-300 px-2 py-1 rounded text-xs thin-tech">Python</span>
              <span className="bg-green-900 text-green-300 px-2 py-1 rounded text-xs thin-tech">spaCy</span>
              <span className="bg-green-900 text-green-300 px-2 py-1 rounded text-xs thin-tech">FastAPI</span>
              <span className="bg-green-900 text-green-300 px-2 py-1 rounded text-xs thin-tech">NLP</span>
            </div>
            <a href="#" className="text-green-400 underline thin-tech">View Project &rarr;</a>
          </div>
          <div className="border border-neutral-700 bg-black bg-opacity-60 rounded-lg p-8 flex flex-col justify-between shadow-lg hover:border-green-400 transition-all">
            <h3 className="text-2xl font-bold mb-2 text-green-400 thin-tech">Realtime Collaboration App</h3>
            <p className="text-gray-200 mb-4 thin-tech">A web app for real-time document editing and team collaboration, featuring sockets and live updates. Built with React, Node.js, and Socket.io.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-green-900 text-green-300 px-2 py-1 rounded text-xs thin-tech">React</span>
              <span className="bg-green-900 text-green-300 px-2 py-1 rounded text-xs thin-tech">Node.js</span>
              <span className="bg-green-900 text-green-300 px-2 py-1 rounded text-xs thin-tech">Socket.io</span>
            </div>
            <a href="#" className="text-green-400 underline thin-tech">View Project &rarr;</a>
          </div>
          <div className="border border-neutral-700 bg-black bg-opacity-60 rounded-lg p-8 flex flex-col justify-between shadow-lg hover:border-green-400 transition-all">
            <h3 className="text-2xl font-bold mb-2 text-green-400 thin-tech">E-commerce Recommendation System</h3>
            <p className="text-gray-200 mb-4 thin-tech">A recommendation engine for e-commerce platforms, using collaborative filtering and deep learning. Built with Python, TensorFlow, and Flask.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-green-900 text-green-300 px-2 py-1 rounded text-xs thin-tech">Python</span>
              <span className="bg-green-900 text-green-300 px-2 py-1 rounded text-xs thin-tech">TensorFlow</span>
              <span className="bg-green-900 text-green-300 px-2 py-1 rounded text-xs thin-tech">Flask</span>
              <span className="bg-green-900 text-green-300 px-2 py-1 rounded text-xs thin-tech">Deep Learning</span>
            </div>
            <a href="#" className="text-green-400 underline thin-tech">View Project &rarr;</a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 z-10 relative max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-purple-400 thin-tech">// Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Direct Contact */}
          <div>
            <div className="mb-8">
              <div className="text-purple-400 font-bold text-xl mb-4 thin-tech">const <span className="text-white">directContact</span> = {'{'}</div>
              <div className="mb-4 flex items-center gap-4 border border-neutral-700 bg-black bg-opacity-60 rounded-lg p-4">
                <span className="text-green-400 text-2xl"><FaPython /></span>
                <div>
                  <div className="text-gray-400 text-xs thin-tech">// email</div>
                  <div className="text-white thin-tech">"mosasiekode@gmail.com"</div>
                </div>
              </div>
              <div className="mb-4 flex items-center gap-4 border border-neutral-700 bg-black bg-opacity-60 rounded-lg p-4">
                <span className="text-blue-400 text-2xl"><FaPhone /></span>
                <div>
                  <div className="text-gray-400 text-xs thin-tech">// phone</div>
                  <div className="text-white thin-tech">"+234 91393 XXX"</div>
                </div>
              </div>
              <div className="text-purple-400 font-bold text-xl thin-tech">{' }'}</div>
            </div>
            <div className="mb-8">
              <div className="text-purple-400 font-bold text-xl mb-4 thin-tech">const <span className="text-white">socials</span> = [</div>
              <div className="grid grid-cols-2 gap-4">
                <a href="mailto:mosasiekode@gmail.com" className="border border-neutral-700 bg-black bg-opacity-60 rounded-lg p-4 flex flex-col items-center hover:border-green-400 transition-all">
                  <FaEnvelope className="text-2xl text-green-400 mb-2" />
                  <span className="text-white thin-tech">"Email"</span>
                </a>
                <a href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer" className="border border-neutral-700 bg-black bg-opacity-60 rounded-lg p-4 flex flex-col items-center hover:border-green-400 transition-all">
                  <FaGithub className="text-2xl text-white mb-2" />
                  <span className="text-white thin-tech">"GitHub"</span>
                </a>
                <a href="https://linkedin.com/in/yourlinkedin" target="_blank" rel="noopener noreferrer" className="border border-neutral-700 bg-black bg-opacity-60 rounded-lg p-4 flex flex-col items-center hover:border-green-400 transition-all">
                  <FaLinkedin className="text-2xl text-blue-400 mb-2" />
                  <span className="text-white thin-tech">"LinkedIn"</span>
                </a>
                <a href="https://t.me/yourtelegram" target="_blank" rel="noopener noreferrer" className="border border-neutral-700 bg-black bg-opacity-60 rounded-lg p-4 flex flex-col items-center hover:border-green-400 transition-all">
                  <FaTelegramPlane className="text-2xl text-blue-300 mb-2" />
                  <span className="text-white thin-tech">"Telegram"</span>
                </a>
              </div>
              <div className="text-purple-400 font-bold text-xl thin-tech">];</div>
            </div>
          </div>
          {/* Send Message Form */}
          <div>
            <div className="text-purple-400 font-bold text-xl mb-4 thin-tech">function <span className="text-blue-400">sendMessage</span>() {'{'}</div>
            <form className="space-y-6">
              <div>
                <label className="block text-blue-400 thin-tech mb-1">let name = "</label>
                <input type="text" placeholder="Your name" className="w-full bg-black bg-opacity-60 border border-neutral-700 rounded-lg p-3 text-white thin-tech focus:outline-none focus:border-green-400" />
              </div>
              <div>
                <label className="block text-blue-400 thin-tech mb-1">let email = "</label>
                <input type="email" placeholder="your@email.com" className="w-full bg-black bg-opacity-60 border border-neutral-700 rounded-lg p-3 text-white thin-tech focus:outline-none focus:border-green-400" />
              </div>
              <div>
                <label className="block text-blue-400 thin-tech mb-1">let message = "</label>
                <textarea placeholder="Tell me about your project..." className="w-full bg-black bg-opacity-60 border border-neutral-700 rounded-lg p-3 text-white thin-tech focus:outline-none focus:border-green-400" rows={4} />
              </div>
              <button type="submit" className="w-full bg-white text-black py-4 rounded font-mono text-lg shadow hover:bg-black hover:text-green-400 hover:border-green-400 border border-white transition-all thin-tech">
                $ send_message
              </button>
            </form>
            <div className="text-gray-400 text-xs mt-4 thin-tech">// I'll respond within 24-48 hours</div>
            <div className="text-purple-400 font-bold text-xl mt-4 thin-tech">{' }'}</div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full py-12 px-4 z-10 relative max-w-6xl mx-auto mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Mission & Socials */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-400 text-2xl">&gt;_</span>
              <span className="text-green-400 text-xl font-bold thin-tech">MK</span>
            </div>
            <div className="border-l-4 border-green-400 pl-4 mb-4">
              <div className="text-green-400 font-semibold thin-tech">// Mission</div>
              <div className="text-white thin-tech">Crafting digital experiences with<br />precision and creativity.</div>
            </div>
            <div className="flex gap-2 mt-2">
              <a href="mailto:kolawolemoses50@gmail.com" className="border border-neutral-700 rounded p-2 hover:border-green-400 transition-all"><FaEnvelope className="text-xl text-white" /></a>
              <a href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer" className="border border-neutral-700 rounded p-2 hover:border-green-400 transition-all"><FaGithub className="text-xl text-white" /></a>
              <a href="https://www.linkedin.com/in/jesutofunmi-kolawole-321696229?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="border border-neutral-700 rounded p-2 hover:border-green-400 transition-all"><FaLinkedin className="text-xl text-white" /></a>
              <a href="https://x.com/Boanerges50" target="_blank" rel="noopener noreferrer" className="border border-neutral-700 rounded p-2 hover:border-green-400 transition-all"><FaTwitter className="text-xl text-white" /></a>
              <a href="https://t.me/majib_18" target="_blank" rel="noopener noreferrer" className="border border-neutral-700 rounded p-2 hover:border-green-400 transition-all"><FaTelegramPlane className="text-xl text-white" /></a>
            </div>
          </div>
          {/* Navigation */}
          <div>
            <div className="text-purple-400 font-bold text-xl mb-2 thin-tech">const <span className="text-white">navigation</span> = [</div>
            <div className="text-white thin-tech pl-4">
              "Home",<br />
              "About",<br />
              "Projects",<br />
              "Skills",<br />
              "Contact",<br />
            </div>
            <div className="text-purple-400 font-bold text-xl thin-tech">];</div>
          </div>
          {/* Contact Info */}
          <div>
            <div className="text-purple-400 font-bold text-xl mb-2 thin-tech">const <span className="text-white">contact</span> = {'{'}</div>
            <div className="pl-4 text-white thin-tech">
              email: <span className="text-green-400">"kolawolemoses50@gmail.com"</span>,<br />
              phone: <span className="text-blue-400">"+234 XXX XXX XXXX"</span>,<br />
              location: <span className="text-purple-400">"Nigeria"</span><br />
            </div>
            <div className="text-purple-400 font-bold text-xl thin-tech">{' }'}</div>
          </div>
        </div>
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center text-gray-400 thin-tech text-sm border-t border-neutral-800 pt-6">
          <div>// © {new Date().getFullYear()} Moses Kolawole. All rights reserved.</div>
          <div>Built with <span className="text-green-400">❤</span> &amp;&amp; lots of coffee</div>
        </div>
      </footer>
    </div>
  );
}

export default App;

// Typewriter component for hero headline
function Typewriter({ words, speed = 120, pause = 1200 }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), pause);
      return;
    }
    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, words, speed, pause]);

  useEffect(() => {
    const blinkTimeout = setInterval(() => setBlink((v) => !v), 500);
    return () => clearInterval(blinkTimeout);
  }, []);

  return (
    <span>
      {words[index].substring(0, subIndex)}
      <span className={blink ? "opacity-100" : "opacity-0"}>_</span>
    </span>
  );
}

// AnimatedSkillBar component for visual skill proficiency
function AnimatedSkillBar({ name, icon, percent, color }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  React.useEffect(() => {
    if (inView) {
      controls.start({ width: percent + "%" });
    }
  }, [controls, inView, percent]);

  return (
    <div className="mb-4" ref={ref}>
      <div className="flex items-center mb-1">
        {icon && <span className="mr-2 text-xl">{icon}</span>}
        <span className="thin-tech text-gray-200 mr-2">{name}</span>
        <span className="ml-auto text-green-400 thin-tech text-sm">{percent}%</span>
      </div>
      <div className="w-full h-2 bg-neutral-800 rounded">
        <motion.div
          className={color + " h-2 rounded transition-all duration-700"}
          initial={{ width: 0 }}
          animate={controls}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}

// AnimatedCounter component for counting up numbers
function AnimatedCounter({ to, duration = 1.5, className = "" }) {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    let start = 0;
    const end = parseInt(to);
    if (start === end) return;
    let incrementTime = Math.abs(Math.floor((duration * 1000) / end));
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);
    return () => clearInterval(timer);
  }, [to, duration]);
  return <span className={className}>{count}{typeof to === "string" && to.includes("+") ? "+" : ""}</span>;
}

// AnimatedCounter for Experiences section (if any numbers are present, e.g., skill bars, add here as needed)
// StickyNavbar component for slide-down effect and name change
function StickyNavbar({ sections, currentSection, setCurrentSection }) {
  const [isSticky, setIsSticky] = React.useState(false);
  const [lastScroll, setLastScroll] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 80 && scrollY < lastScroll) {
        setIsSticky(true);
      } else if (scrollY <= 80 || scrollY > lastScroll) {
        setIsSticky(false);
      }
      setLastScroll(scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <div className={`w-full bg-black bg-opacity-80 border-b border-neutral-700 transition-all duration-500 ${isSticky ? 'fixed top-0 left-0 z-50 shadow-lg slide-down' : ''}`}> 
      <nav className="flex items-center justify-between py-6 px-10 z-10 relative max-w-8xl mx-auto">
        {/* Left: Badge */}
        <div className="border border-green-400 px-3 py-1 text-green-400 text-xs tracking-widest w-32 text-center">
          {sections.find((s) => s.label === currentSection)?.file}
        </div>
        {/* Right: Nav Links */}
        <ul className="flex gap-6 text-sm">
          {sections.map((section) => (
            <li
              key={section.label}
              className={`hover:text-green-400 cursor-pointer transition-colors ${currentSection === section.label ? 'text-green-400 font-bold' : ''}`}
              onClick={() => {
                setCurrentSection(section.label);
                const el = document.getElementById(section.label.toLowerCase());
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              {section.label}
            </li>
          ))}
        </ul>
        {/* Logo moved to right side, not thin-tech font */}
        <a
          href="#hero"
          className="text-3xl font-bold tracking-widest ml-8 hover:text-green-400 transition-colors"
          style={{ textDecoration: 'none', fontFamily: 'inherit' }}
        >
          {isSticky ? "Jesutofunmi" : "MK"}
        </a>
      </nav>
    </div>
  );
}

// FixedNavbar component for fixed position and animated logo split effect
function FixedNavbar({ sections, currentSection, setCurrentSection }) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Split animation for logo
  return (
    <div className="w-full bg-black bg-opacity-80 border-b border-neutral-700 fixed top-0 left-0 z-50 shadow-lg transition-all duration-500">
      <nav className="flex items-center py-6 px-10 z-10 relative max-w-8xl mx-auto">
        {/* Left: Badge */}
        <div className="border border-green-400 px-3 py-1 text-green-400 text-xs tracking-widest w-32 text-center">
          {sections.find((s) => s.label === currentSection)?.file}
        </div>
        {/* Center: Nav Links */}
        <ul className="flex gap-6 text-sm flex-1 justify-center">
          {sections.map((section) => (
            <li
              key={section.label}
              className={`hover:text-green-400 cursor-pointer transition-colors ${currentSection === section.label ? 'text-green-400 font-bold' : ''}`}
              onClick={() => {
                setCurrentSection(section.label);
                if (section.label === "HOME") {
                  const el = document.getElementById("hero");
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                } else {
                  const el = document.getElementById(section.label.toLowerCase());
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }
              }}
            >
              {section.label}
            </li>
          ))}
        </ul>
        {/* Logo moved to right side, not thin-tech font */}
        <a
          href="#hero"
          className="text-3xl font-bold tracking-widest ml-8 hover:text-green-400 transition-colors relative"
          style={{ textDecoration: 'none', minWidth: '120px', display: 'inline-block', fontFamily: 'inherit' }}
          onClick={e => {
            e.preventDefault();
            const el = document.getElementById("hero");
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
        >
          {!scrolled ? (
            <span className="transition-all duration-500">MK</span>
          ) : (
            <span className="split-logo flex gap-2">
              <span className="animate-split text-green-400">JESU</span>
              <span className="animate-split text-purple-400">TOFUNMI</span>
            </span>
          )}
        </a>
        {/* Left: Badge */}
        <div className="border border-green-400 px-3 py-1 text-green-400 text-xs tracking-widest w-32 text-center">
          {sections.find((s) => s.label === currentSection)?.file}
        </div>
        {/* Right: Nav Links */}
        <ul className="flex gap-6 text-sm">
          {sections.map((section) => (
            <li
              key={section.label}
              className={`hover:text-green-400 cursor-pointer transition-colors ${currentSection === section.label ? 'text-green-400 font-bold' : ''}`}
              onClick={() => {
                setCurrentSection(section.label);
                const el = document.getElementById(section.label.toLowerCase());
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              {section.label}
            </li>
          ))}
        </ul>
        {/* Logo moved to right side, not thin-tech font */}
        <a
          href="#hero"
          className="text-3xl font-bold tracking-widest ml-8 hover:text-green-400 transition-colors relative"
          style={{ textDecoration: 'none', minWidth: '120px', display: 'inline-block', fontFamily: 'inherit' }}
        >
          {!scrolled ? (
            <span className="transition-all duration-500">MK</span>
          ) : (
            <span className="split-logo flex gap-2">
              <span className="animate-split text-green-400">JESU</span>
              <span className="animate-split text-purple-400">TOFUNMI</span>
            </span>
          )}
        </a>
      </nav>
    </div>
  );
}
