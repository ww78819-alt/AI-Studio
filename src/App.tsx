import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, ExternalLink, ArrowRight, Play, Pause, Music } from 'lucide-react';
import Dock from './components/Dock';
import Window from './components/Window';
import ProjectCard from './components/ProjectCard';
import MuseumShowcase from './components/MuseumShowcase';
import ForestShowcase from './components/ForestShowcase';
import RedShowcase from './components/RedShowcase';
import { PROJECTS, PERSONAL_INFO } from './constants';
import { AppWindow, Project } from './types';

export default function App() {
  const [activeWindow, setActiveWindow] = useState<AppWindow>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedShowcase, setSelectedShowcase] = useState<Project | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio('https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/Stardew%20Valley%20Overture.m4a'));

  useEffect(() => {
    setIsLoaded(true);
    audio.loop = true;
    audio.volume = 0.4;
    return () => {
      audio.pause();
    };
  }, [audio]);

  const toggleMusic = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(err => console.error("Playback failed", err));
    }
    setIsPlaying(!isPlaying);
  };

  const handleOpenWindow = (window: AppWindow) => {
    if (window === 'home') {
      setActiveWindow(null);
    } else {
      setActiveWindow(window);
    }
  };

  const handleProjectClick = (project: Project) => {
    if (project.showcase === 'museum' || project.showcase === 'forest' || project.showcase === 'red') {
      setSelectedShowcase(project);
    }
  };

  return (
    <div className="relative w-full h-screen bg-warm-white overflow-hidden selection:bg-dark-gray/10 selection:text-dark-gray">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#ffffff_0%,_#FDFCFB_100%)] opacity-50" />
      
      {/* Desktop Content (Home Screen) */}
      <AnimatePresence>
        {!activeWindow && isLoaded && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 w-full h-full overflow-y-auto snap-y no-scrollbar"
          >
            {/* Page 1: Hero */}
            <section className="relative w-full h-screen snap-start flex items-center justify-center px-12 md:px-24 bg-[#fcfcfc]">
              {/* Background Line Art */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] mix-blend-multiply" />
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0 20 Q 25 10 50 20 T 100 20" fill="none" stroke="#333" strokeWidth="0.1" />
                  <path d="M0 50 Q 25 40 50 50 T 100 50" fill="none" stroke="#333" strokeWidth="0.1" />
                  <path d="M0 80 Q 25 70 50 80 T 100 80" fill="none" stroke="#333" strokeWidth="0.1" />
                </svg>
              </div>

              <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-4 md:gap-5">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="relative flex justify-center md:justify-end pr-0 md:pr-12"
                >
                  <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                    <img 
                      src="https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/微信图片_20260327004259_308_196.jpg" 
                      className="w-full h-full object-cover object-[center_70%]"
                      alt="Iris Zhong"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  className="text-left space-y-4"
                >
                  <div className="space-y-1">
                    <h1 className="text-2xl md:text-4xl font-black tracking-tight text-dark-gray">
                      {PERSONAL_INFO.name}
                    </h1>
                    <h2 className="text-lg md:text-2xl font-light tracking-widest text-dark-gray/60 uppercase">
                      {PERSONAL_INFO.englishName}
                    </h2>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs md:text-sm font-medium text-dark-gray/80 max-w-md leading-relaxed">
                      {PERSONAL_INFO.bio}
                    </p>
                    <div className="space-y-0.5">
                      <p className="text-[10px] md:text-xs text-dark-gray/60 font-medium">
                        建筑景观设计师 | 平面设计师
                      </p>
                      <p className="text-[10px] md:text-xs text-dark-gray/40 font-light leading-relaxed">
                        {PERSONAL_INFO.education}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 pt-2">
                    <button
                      onClick={() => setActiveWindow('projects')}
                      className="px-6 py-2 bg-dark-gray text-white rounded-full text-[10px] font-medium hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
                    >
                      View Projects
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Page 2: Introduction */}
            <section className="relative w-full h-screen snap-start flex items-center justify-center px-8 md:px-24 bg-[#f5f5f5] border-y border-dark-gray/5 overflow-hidden">
              <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 items-start gap-8 lg:gap-16 pt-24 md:pt-20">
                <div className="relative h-[250px] md:h-[400px] flex items-start justify-center">
                  <div className="relative w-full max-w-xs md:max-w-md flex justify-center">
                    {[
                      'https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/微信图片_20260327004248_304_196.jpg',
                      'https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/微信图片_20260327004253_306_196.jpg',
                      'https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/微信图片_20260327004257_307_196.jpg'
                    ].map((src, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, rotate: (i - 1) * 15, y: i === 1 ? -20 : 20 }}
                        whileInView={{ opacity: 1 }}
                        whileHover={{ scale: 1.1, zIndex: 10, rotate: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute w-32 h-44 md:w-64 md:h-80 rounded-2xl overflow-hidden shadow-xl border-4 border-white cursor-pointer"
                        style={{ 
                          left: `${(i - 1) * 30}%`,
                          zIndex: i === 1 ? 5 : 1
                        }}
                      >
                        <img src={src} className="w-full h-full object-cover" alt={`Intro ${i}`} />
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  className="space-y-3 md:space-y-4 text-left"
                >
                  <div className="space-y-1 md:space-y-2">
                    <h2 className="text-lg md:text-xl font-black text-dark-gray border-l-4 border-dark-gray pl-4">Introduction</h2>
                    <p className="text-[10px] md:text-sm text-dark-gray/80 leading-relaxed font-medium max-w-md">
                      {PERSONAL_INFO.intro.zh}
                    </p>
                    <p className="text-[9px] md:text-xs text-dark-gray/50 leading-relaxed italic max-w-md">
                      {PERSONAL_INFO.intro.en}
                    </p>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Page 3: About Me */}
            <section className="relative w-full h-screen snap-start flex flex-col items-center justify-center px-8 md:px-24 bg-[#fafafa] overflow-hidden pt-24 md:pt-32 pb-64 md:pb-48">
              <div className="max-w-5xl w-full flex flex-col items-center justify-center gap-4 md:gap-8 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 w-full max-w-xl md:max-w-3xl"
                >
                  {[
                    'https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/微信图片_20260327004736_311_196.jpg',
                    'https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/微信图片_20260327004734_310_196.jpg',
                    'https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/微信图片_20260327004732_309_196.jpg',
                    'https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/微信图片_20260327004738_313_196.jpg'
                  ].map((src, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -10, rotate: i % 2 === 0 ? 2 : -2 }}
                      className={`aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden shadow-lg border-2 border-white ${i % 2 === 0 ? 'mt-2 md:mt-4' : ''}`}
                    >
                      <img src={src} className="w-full h-full object-cover" alt={`About ${i}`} />
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="space-y-2 md:space-y-4"
                >
                  <h2 className="text-lg md:text-xl font-black text-dark-gray">About Me</h2>
                  <div className="max-w-2xl space-y-1 md:space-y-2">
                    <p className="text-xs md:text-sm font-medium text-dark-gray/80 leading-relaxed">
                      {PERSONAL_INFO.aboutMe.zh}
                    </p>
                    <p className="text-[10px] md:text-xs text-dark-gray/50 leading-relaxed italic">
                      {PERSONAL_INFO.aboutMe.en}
                    </p>
                  </div>
                  <div className="flex justify-center gap-4 pt-1 md:pt-2">
                    <button
                      onClick={() => setActiveWindow('contact')}
                      className="px-6 py-2 border-2 border-dark-gray text-dark-gray rounded-full text-[10px] font-bold hover:bg-dark-gray hover:text-white transition-all"
                    >
                      Get in Touch
                    </button>
                  </div>
                </motion.div>
              </div>
            </section>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Windows */}
      <Window
        isOpen={activeWindow === 'about'}
        onClose={() => setActiveWindow(null)}
        title="About Me"
      >
        <div className="max-w-3xl mx-auto flex flex-col gap-12">
          <section className="flex flex-col gap-6">
            <div className="space-y-1">
              <h2 className="text-4xl font-black text-dark-gray">Introduction</h2>
              <p className="text-sm font-medium text-dark-gray/60 tracking-wider">建筑景观设计师 | 平面设计师</p>
            </div>
            <p className="text-lg text-dark-gray/70 leading-relaxed font-light">
              {PERSONAL_INFO.aboutMe.zh}
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4 p-8 bg-white/40 rounded-3xl border border-white/20">
              <h3 className="text-xs font-black uppercase tracking-widest text-dark-gray/40">Education</h3>
              <div className="flex flex-col gap-1">
                <p className="font-medium text-dark-gray">香港大学 (HKU)</p>
                <p className="text-sm text-dark-gray/60">建筑学 研究生 • 2024-2025</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-medium text-dark-gray">华南农业大学 (SCAU)</p>
                <p className="text-sm text-dark-gray/60">园林专业 本科 • 2020-2024</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 p-8 bg-white/40 rounded-3xl border border-white/20">
              <h3 className="text-xs font-black uppercase tracking-widest text-dark-gray/40">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {['Photoshop', 'AutoCAD', 'Illustrator', 'Rhino', 'Sketch-Up', 'InDesign', 'Lumion'].map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-white/60 rounded-lg text-xs font-medium text-dark-gray/70">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>
      </Window>

      <Window
        isOpen={activeWindow === 'projects'}
        onClose={() => setActiveWindow(null)}
        title="Selected Projects"
      >
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl font-black text-dark-gray">Portfolio</h2>
            <div className="space-y-2">
              <p className="text-dark-gray/80 font-medium">
                选自2024至2026年的作品，涵盖景观规划、平面设计、品牌设计、电商设计、自媒体运营及展览等视觉设计。
              </p>
              <p className="text-dark-gray/60 max-w-xl text-sm">
                A selection of works from 2024-2026, ranging from landscape planning to graphic design and exhibition identity.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {PROJECTS.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </div>
        </div>
      </Window>

      <Window
        isOpen={activeWindow === 'contact'}
        onClose={() => setActiveWindow(null)}
        title="Contact Information"
      >
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-12 py-12">
          <div className="flex flex-col gap-4">
            <h2 className="text-5xl font-black text-dark-gray">Let's Connect</h2>
            <p className="text-dark-gray/60">Feel free to reach out for collaborations or just a friendly hello.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <a href={`tel:${PERSONAL_INFO.contact.phone}`} className="flex flex-col items-center gap-4 p-8 bg-white/40 rounded-3xl border border-white/20 hover:bg-white/60 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-dark-gray/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5 text-dark-gray/60" />
              </div>
              <span className="text-sm font-medium text-dark-gray">{PERSONAL_INFO.contact.phone}</span>
            </a>
            
            <a href={`mailto:${PERSONAL_INFO.contact.email}`} className="flex flex-col items-center gap-4 p-8 bg-white/40 rounded-3xl border border-white/20 hover:bg-white/60 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-dark-gray/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5 text-dark-gray/60" />
              </div>
              <span className="text-sm font-medium text-dark-gray">{PERSONAL_INFO.contact.email}</span>
            </a>

            <div className="flex flex-col items-center gap-4 p-8 bg-white/40 rounded-3xl border border-white/20 group">
              <div className="w-12 h-12 rounded-full bg-dark-gray/5 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-dark-gray/60" />
              </div>
              <span className="text-sm font-medium text-dark-gray">{PERSONAL_INFO.contact.location}</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full mt-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-dark-gray/40">Socials</h3>
            <div className="flex justify-center gap-6">
              {['Behance', 'Instagram', 'LinkedIn'].map(social => (
                <a key={social} href="#" className="text-sm font-medium text-dark-gray/60 hover:text-dark-gray flex items-center gap-1">
                  {social} <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Window>

      {/* Specialized Showcases */}
      <AnimatePresence>
        {selectedShowcase?.showcase === 'museum' && (
          <MuseumShowcase onClose={() => setSelectedShowcase(null)} />
        )}
        {selectedShowcase?.showcase === 'forest' && (
          <ForestShowcase 
            projectId={selectedShowcase.id}
            onClose={() => setSelectedShowcase(null)} 
          />
        )}
        {selectedShowcase?.showcase === 'red' && (
          <RedShowcase onClose={() => setSelectedShowcase(null)} />
        )}
      </AnimatePresence>

      {/* Dock */}
      <Dock onOpen={handleOpenWindow} activeWindow={activeWindow} />

      {/* Status Bar (Optional macOS touch) */}
      <div className="fixed top-0 left-0 w-full h-8 flex items-center justify-between px-6 text-[10px] font-semibold text-dark-gray/40 z-50 pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto">
          <span className="text-dark-gray font-bold">ZJW</span>
          <button 
            onClick={toggleMusic}
            className="flex items-center gap-1.5 hover:text-dark-gray transition-colors group"
          >
            <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${isPlaying ? 'bg-dark-gray text-white' : 'bg-dark-gray/5'}`}>
              {isPlaying ? <Pause className="w-2 h-2" /> : <Play className="w-2 h-2 ml-0.5" />}
            </div>
            <span className="hidden sm:inline uppercase tracking-widest">Stardew Valley Overture</span>
            <Music className={`w-3 h-3 ${isPlaying ? 'animate-bounce' : ''}`} />
          </button>
          <span className="hidden md:inline">File</span>
          <span className="hidden md:inline">Edit</span>
          <span className="hidden md:inline">View</span>
        </div>
        <div className="flex items-center gap-4">
          <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </div>
  );
}
