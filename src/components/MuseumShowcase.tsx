import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Folder, Maximize2, Minus, Circle, ExternalLink, ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { Rnd } from 'react-rnd';

interface MuseumShowcaseProps {
  onClose: () => void;
}

type Scene = 'invitation' | 'museum';

const MacOSWindow: React.FC<{ 
  title: string; 
  children: React.ReactNode; 
  onClose: () => void;
  defaultSize?: { width: number | string; height: number | string };
  defaultPosition?: { x: number; y: number };
  className?: string;
  minimal?: boolean;
}> = ({ title, children, onClose, defaultSize = { width: '80%', height: '80%' }, defaultPosition = { x: 50, y: 50 }, className = "", minimal = false }) => {
  const [isMaximized, setIsMaximized] = useState(false);

  const handleMaximize = () => {
    if (minimal) return;
    setIsMaximized(!isMaximized);
  };

  return (
    <Rnd
      size={isMaximized ? { width: '100%', height: '100%' } : undefined}
      position={isMaximized ? { x: 0, y: 0 } : undefined}
      default={{
        x: defaultPosition.x,
        y: defaultPosition.y,
        width: defaultSize.width,
        height: defaultSize.height
      }}
      minWidth={300}
      minHeight={200}
      bounds="parent"
      dragHandleClassName="window-title-bar"
      disableDragging={isMaximized}
      enableResizing={!isMaximized}
      className={`z-50 ${className}`}
    >
      <div className="w-full h-full bg-[#ebebeb] rounded-lg shadow-2xl border border-black/20 overflow-hidden flex flex-col">
        {/* Title Bar */}
        <div className="window-title-bar h-7 bg-gradient-to-b from-[#f6f6f6] to-[#d1d1d1] flex items-center px-3 gap-2 border-b border-black/10 select-none cursor-default">
          <div className="flex gap-2 items-center">
            <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] flex items-center justify-center group">
              <X className={`w-2 h-2 text-black/40 ${minimal ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
            </button>
            {minimal && (
              <button 
                onClick={onClose}
                className="flex items-center gap-1 text-[9px] font-bold text-black/50 hover:text-black transition-colors ml-1"
              >
                <ChevronLeft className="w-2.5 h-2.5" />
                <span>返回</span>
              </button>
            )}
            {!minimal && (
              <>
                <button className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] flex items-center justify-center group">
                  <Minus className="w-2 h-2 text-black/40 opacity-0 group-hover:opacity-100" />
                </button>
                <button onClick={handleMaximize} className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29] flex items-center justify-center group">
                  <Maximize2 className="w-2 h-2 text-black/40 opacity-0 group-hover:opacity-100" />
                </button>
              </>
            )}
          </div>
          <div className="flex-1 text-center text-[11px] font-medium text-black/70 tracking-tight truncate px-2">
            {title}
          </div>
          {minimal && <div className="w-16" />} {/* Adjusted spacer */}
        </div>
        {/* Content */}
        <div className="flex-1 overflow-auto bg-white relative">
          {children}
        </div>
      </div>
    </Rnd>
  );
};

const GuidebookBooklet: React.FC<{ images: string[]; onClose: () => void }> = ({ images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); 
  
  const totalViews = 1 + Math.ceil((images.length - 2) / 2) + 1;

  const nextView = () => {
    if (currentIndex < totalViews - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevView = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 45 : -45,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      rotateY: direction > 0 ? -45 : 45,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const renderView = () => {
    const isCover = currentIndex === 0;
    const isBack = currentIndex === totalViews - 1;

    return (
      <motion.div
        key={currentIndex}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          rotateY: { type: "spring", stiffness: 200, damping: 25 },
          opacity: { duration: 0.3 },
          scale: { duration: 0.4 }
        }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative flex items-center justify-center w-full h-full"
      >
        {isCover ? (
          <div className="relative w-full max-w-[350px] aspect-[1/1.414] bg-white shadow-[20px_0_50px_rgba(0,0,0,0.3)] rounded-r-lg overflow-hidden border border-black/10 origin-left">
            <img src={images[0]} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/20 to-transparent" />
          </div>
        ) : isBack ? (
          <div className="relative w-full max-w-[350px] aspect-[1/1.414] bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.3)] rounded-l-lg overflow-hidden border border-black/10 origin-right">
            <img src={images[images.length - 1]} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-black/20 to-transparent" />
          </div>
        ) : (
          <div className="relative flex w-full max-w-[800px] aspect-[1.414/1] shadow-[0_30px_60px_rgba(0,0,0,0.4)] rounded-lg overflow-hidden bg-white border border-black/10">
            <div className="w-1/2 h-full border-r border-black/5 relative">
              <img src={images[1 + (currentIndex - 1) * 2]} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/10 to-transparent" />
            </div>
            <div className="w-1/2 h-full relative">
              <img src={images[2 + (currentIndex - 1) * 2]} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/10 to-transparent" />
            </div>
            {/* Spine line */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-px w-0.5 bg-black/10 z-10" />
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-12">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all border border-white/10 z-[110] hover:scale-110 active:scale-95"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="w-full h-full max-w-6xl flex flex-col items-center justify-center gap-10 pt-32 pb-12">
        <div className="relative w-full flex-1 flex items-center justify-center perspective-3000 max-h-[55vh]">
          <AnimatePresence mode="wait" custom={direction}>
            {renderView()}
          </AnimatePresence>
          
          {/* Invisible click zones */}
          <div className="absolute inset-0 flex z-10">
            <div className="w-1/2 h-full cursor-w-resize" onClick={prevView} />
            <div className="w-1/2 h-full cursor-e-resize" onClick={nextView} />
          </div>
        </div>

        <div className="flex items-center gap-6 bg-white/5 backdrop-blur-xl px-6 py-2.5 rounded-full border border-white/10 shadow-2xl">
          <button 
            onClick={prevView}
            disabled={currentIndex === 0}
            className={`p-1.5 rounded-full text-white transition-all ${currentIndex === 0 ? 'opacity-10 cursor-not-allowed' : 'hover:bg-white/10 hover:scale-110 active:scale-90'}`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex flex-col items-center">
            <div className="text-white/40 text-[7px] font-black tracking-[0.4em] uppercase mb-0.5">Guidebook</div>
            <div className="text-white text-xs font-black tracking-widest">
              {currentIndex + 1} <span className="text-white/20 mx-1.5">/</span> {totalViews}
            </div>
          </div>
          <button 
            onClick={nextView}
            disabled={currentIndex === totalViews - 1}
            className={`p-1.5 rounded-full text-white transition-all ${currentIndex === totalViews - 1 ? 'opacity-10 cursor-not-allowed' : 'hover:bg-white/10 hover:scale-110 active:scale-90'}`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ScrollingText = () => {
  const items = [
    "1.品牌与设计趋势分析：对广东省美术馆、M+美术馆等知名美术馆的展览宣传策划做出调研，贴合本展览主题进行相应参考整理。",
    "2.行业设计分析：通过知名设计灵感网站Pinterest等更深入洞察行业设计趋势，社会风格偏好变化，形成可利用的设计策略。",
    "3.用户研究与市场调研：获取目标观众的的偏好需求与行为，根据展品构建观展用户画像，精准设计展览场景，策划展览故事。",
    "4.产品设计和宣传文案：依据设计研究资料库，为展览与活动设计宣传物料，如海报、banner、导览手册、邀请函等，设立语言方向，协助活动推进与后期社媒运营。",
    "5.用户关系维护：协助制定中长期的用户关系维护战略，设立会员沙龙活动，规划符合美术馆语言与风格的系列主题展览。"
  ];
  
  return (
    <div className="absolute inset-x-0 top-[15vh] h-[70vh] overflow-hidden pointer-events-none z-0 flex flex-col justify-center gap-8 opacity-[0.12]">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col gap-3">
          <motion.div
            animate={{ x: index % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
            transition={{ repeat: Infinity, duration: 50 + index * 5, ease: "linear" }}
            className="whitespace-nowrap text-[2vh] font-bold text-white tracking-[0.05em] leading-normal select-none"
          >
            {(item + " 　 • 　 ").repeat(10)}
          </motion.div>
          <motion.div
            animate={{ x: index % 2 === 0 ? ["-50%", "0%"] : ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 55 + index * 5, ease: "linear" }}
            className="whitespace-nowrap text-[2vh] font-bold text-white tracking-[0.05em] leading-normal select-none"
          >
            {(item + " 　 • 　 ").repeat(10)}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default function MuseumShowcase({ onClose }: MuseumShowcaseProps) {
  const [scene, setScene] = useState<Scene>('invitation');
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState<null | string>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setScene('museum');
        setIsTransitioning(false);
      }, 1000);
    }, 1200);
  };

  const handleBack = () => {
    if (activeOverlay) {
      setActiveOverlay(null);
    } else if (scene === 'museum') {
      setScene('invitation');
      setIsEnvelopeOpen(false);
    } else {
      onClose();
    }
  };

  const guidebookImages = [
    "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/琉璃小册子（单页）_page-0001.jpg",
    "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/琉璃小册子（单页）_page-0002.jpg",
    "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/琉璃小册子（单页）_page-0003.jpg",
    "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/%E7%90%89%E7%92%83%E5%B0%8F%E5%86%8C%E5%AD%90%EF%BC%88%E5%8D%95%E9%A1%B5%EF%BC%89_page-0004.jpg",
    "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/%E7%90%89%E7%92%83%E5%B0%8F%E5%86%8C%E5%AD%90%EF%BC%88%E5%8D%95%E9%A1%B5%EF%BC%89_page-0005.jpg",
    "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/%E7%90%89%E7%92%83%E5%B0%8F%E5%86%8C%E5%AD%90%EF%BC%88%E5%8D%95%E9%A1%B5%EF%BC%89_page-0006.jpg",
    "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/%E7%90%89%E7%92%83%E5%B0%8F%E5%86%8C%E5%AD%90%EF%BC%88%E5%8D%95%E9%A1%B5%EF%BC%89_page-0007.jpg",
    "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/%E7%90%89%E7%92%83%E5%B0%8F%E5%86%8C%E5%AD%90%EF%BC%88%E5%8D%95%E9%A1%B5%EF%BC%89_page-0008.jpg",
    "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/%E7%90%89%E7%92%83%E5%B0%8F%E5%86%8C%E5%AD%90%EF%BC%88%E5%8D%95%E9%A1%B5%EF%BC%89_page-0009.jpg",
    "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/%E7%90%89%E7%92%83%E5%B0%8F%E5%86%8C%E5%AD%90%EF%BC%88%E5%8D%95%E9%A1%B5%EF%BC%89_page-0010.jpg",
    "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/%E7%90%89%E7%92%83%E5%B0%8F%E5%86%8C%E5%AD%90%EF%BC%88%E5%8D%95%E9%A1%B5%EF%BC%89_page-0011.jpg",
    "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/琉璃小册子（单页）_page-0032.jpg",
    "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/琉璃小册子（单页）_page-0033.jpg",
    "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/琉璃小册子（单页）_page-0040.jpg"
  ];

  const hotspots = [
    { id: 'long-poster', x: '20%', y: '70%', label: '长海报', url: 'https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/长海报.png' },
    { id: 'poster1', x: '40%', y: '70%', label: 'POSTERA', url: 'https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/Poster1.png' },
    { id: 'poster', x: '60%', y: '70%', label: 'POSTERB', url: 'https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/Poster.png' },
    { id: 'guidebook', x: '80%', y: '70%', label: '导览手册', type: 'booklet' },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black overflow-hidden font-sans">
      {/* Navigation Buttons */}
      <div className="absolute top-8 left-8 flex flex-col md:flex-row gap-4 z-[100]">
        {scene === 'museum' && !activeOverlay && (
          <button 
            onClick={handleBack}
            className="h-10 px-4 rounded-md bg-white/10 hover:bg-white/20 flex items-center gap-2 text-white/80 transition-all border border-white/10 text-[10px] font-bold uppercase tracking-widest"
          >
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            Back to Invitation
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {scene === 'invitation' ? (
          <motion.div
            key="invitation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-full flex flex-col items-center justify-center bg-[#1a1a1a]"
          >
            <ScrollingText />
            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="text-center flex flex-col gap-2">
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-white/30 uppercase tracking-[0.5em] text-[10px] font-black"
                >
                  Museum Invitation
                </motion.span>
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="text-white text-5xl font-black tracking-tighter"
                >
                  迁徙的图像
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex flex-col gap-1 mt-1"
                >
                  <p className="text-white/90 text-sm font-black tracking-widest">琉璃与摄影的关系重构</p>
                  <p className="text-white/70 text-[9px] uppercase tracking-[0.2em] font-black">Reconstructing the Relationship of Glaze and Photography</p>
                </motion.div>
              </div>

              {/* Invitation Card - macOS Window Style */}
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative w-[400px] md:w-[600px] aspect-[1.4/1] perspective-2000"
              >
                <MacOSWindow 
                  title="Invitation.jpg" 
                  onClose={onClose}
                  defaultSize={{ width: '100%', height: '100%' }}
                  defaultPosition={{ x: 0, y: 0 }}
                  className="w-full h-full"
                >
                  <div 
                    onClick={handleOpenEnvelope}
                    className="w-full h-full cursor-pointer group relative overflow-hidden bg-white flex items-center justify-center p-4"
                  >
                    <motion.div 
                      animate={isEnvelopeOpen ? { rotateX: 180, y: -20, opacity: 0 } : { rotateX: 0 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <img 
                        src="https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/邀请函.jpg" 
                        className="max-w-full max-h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                    
                    {!isEnvelopeOpen && (
                      <motion.div 
                        animate={{ y: [0, 8, 0], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-black/60 text-[10px] font-black uppercase tracking-[0.3em] whitespace-nowrap bg-white/40 backdrop-blur-md px-4 py-2 rounded-full"
                      >
                        Click to Enter
                      </motion.div>
                    )}
                  </div>
                </MacOSWindow>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="museum"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Museum Background */}
            <div className="absolute inset-0">
              <img 
                src="https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/微信图片_20260324220830_287_196.jpg" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Hotspots - macOS Standard Icon Style */}
            <div className="absolute inset-0">
              {hotspots.map((spot) => (
                <motion.button
                  key={spot.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + hotspots.indexOf(spot) * 0.2 }}
                  onClick={() => setActiveOverlay(spot.id)}
                  style={{ left: spot.x, top: spot.y }}
                  className="absolute group flex flex-col items-center gap-1 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="relative flex flex-col items-center">
                    {/* macOS Folder/File Icon */}
                    <div className="relative w-16 h-16 bg-gradient-to-b from-white/20 to-white/5 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl flex items-center justify-center group-hover:scale-110 group-hover:border-white/50 transition-all group-active:scale-95">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center shadow-inner">
                        <Folder className="w-6 h-6 text-white fill-white/20" />
                      </div>
                    </div>
                    
                    {/* Label - Apple Style */}
                    <div className="mt-2 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-[10px] font-bold text-white shadow-lg border border-white/10 group-hover:bg-black/60 transition-all">
                      {spot.label}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Overlays */}
            <AnimatePresence>
              {activeOverlay && (
                activeOverlay === 'guidebook' ? (
                  <GuidebookBooklet images={guidebookImages} onClose={() => setActiveOverlay(null)} />
                ) : (
                  <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-12 bg-black/40 backdrop-blur-sm pointer-events-none">
                    {/* Mobile Close Button */}
                    <button 
                      onClick={() => setActiveOverlay(null)}
                      className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all border border-white/10 z-[90] md:hidden pointer-events-auto"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <div className="w-full h-full max-w-5xl max-h-[85vh] relative pointer-events-auto">
                      <MacOSWindow 
                        title={`${hotspots.find(h => h.id === activeOverlay)?.label}.png`}
                        onClose={() => setActiveOverlay(null)}
                        minimal={true}
                        defaultSize={{ width: '100%', height: '100%' }}
                        defaultPosition={{ x: 0, y: 0 }}
                      >
                        <div className="w-full h-full flex items-center justify-center p-4 bg-[#f0f0f0]">
                          <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-sm border border-black/5 shadow-inner bg-white">
                            <img 
                              src={hotspots.find(h => h.id === activeOverlay)?.url} 
                              className="max-h-full max-w-full object-contain"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </div>
                      </MacOSWindow>
                    </div>
                  </div>
                )
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Cutting Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <div className="fixed inset-0 z-[150] pointer-events-none flex flex-col">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: i % 2 === 0 ? '-100%' : '100%' }}
                animate={{ x: 0 }}
                exit={{ x: i % 2 === 0 ? '100%' : '-100%' }}
                transition={{ duration: 0.5, ease: "easeInOut", delay: i * 0.05 }}
                className="flex-1 bg-white"
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
