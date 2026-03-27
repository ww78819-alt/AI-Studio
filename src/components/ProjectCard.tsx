import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position relative to card center
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for rotation
  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: 1000,
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
      }}
      className="group relative apple-card bg-white/40 p-6 flex flex-col gap-6 cursor-pointer"
    >
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-sm group-hover:shadow-xl transition-shadow duration-500">
        <motion.img
          src={project.image}
          alt={project.title}
          style={{
            scale: isHovered ? 1.1 : 1,
          }}
          className={`w-full h-full transition-transform duration-700 ${project.id === 'lianshan-trail' ? 'object-contain bg-white/50' : 'object-cover'}`}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-widest text-dark-gray/50">
            {project.id === 'lianshan-trail' ? project.subtitle : `${project.category} • ${project.year}`}
          </span>
          <ArrowUpRight className="w-4 h-4 text-dark-gray/30 group-hover:text-dark-gray group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
        
        <h3 className="text-xl font-bold text-dark-gray group-hover:text-black transition-colors leading-tight">
          {project.title}
        </h3>
        
        <p className="text-sm text-dark-gray/60 line-clamp-2 leading-relaxed font-light">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-2">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 text-[9px] font-black bg-white/50 border border-white/20 rounded-full text-dark-gray/70 uppercase tracking-tighter">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
