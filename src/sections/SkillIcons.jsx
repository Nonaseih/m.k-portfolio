// SkillIcons.jsx
// Maps skill names to Lucide or React Icons components
import { 
  SiReact, SiNextdotjs, SiTypescript, SiPython, SiLangchain, SiNodedotjs, SiPostgresql, SiDocker, SiFramer, SiFastapi, SiSupabase, SiThreedotjs, SiOpenai, SiPrisma, SiTailwindcss, SiGithubactions, SiVercel, SiR, SiLinux 
} from 'react-icons/si';
import { FaDatabase, FaCogs } from 'react-icons/fa';

export const skillIconMap = {
  'React': SiReact,
  'Next.js': SiNextdotjs,
  'TypeScript': SiTypescript,
  'Python': SiPython,
  'LangChain': SiLangchain,
  'Node.js': SiNodedotjs,
  'PostgreSQL': SiPostgresql,
  'Docker': SiDocker,
  'Framer Motion': SiFramer,
  'FastAPI': SiFastapi,
  'Supabase': SiSupabase,
  'Three.js': SiThreedotjs,
  'OpenAI': SiOpenai,
  'Prisma': SiPrisma,
  'Tailwind': SiTailwindcss,
  'GitHub Actions': SiGithubactions,
  'Vercel': SiVercel,
  'RAG': FaDatabase,
  'Agents': FaCogs,
  'Fine-tuning': SiR,
  'Vector DBs': FaDatabase,
  'CI/CD': SiGithubactions,
  'Linux': SiLinux,
};
