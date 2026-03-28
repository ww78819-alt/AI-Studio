import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { X, ArrowLeft, ShoppingCart, Heart, Share2, MessageCircle, Home } from 'lucide-react';

interface ForestShowcaseProps {
  projectId?: string;
  onClose: () => void;
}

type Scene = 'intro' | 'scene1' | 'platform-select' | 'scene2';
type Platform = 'taobao' | 'amazon';

const GameProgressBar = ({ progress }: { progress: number }) => {
  const images = [
    "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/stand.png",
    "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/walk.png",
    "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/run.png",
    "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/shock.png",
    "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/zz.png",
    "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/yz.png"
  ];

  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 w-[1200px] max-w-[95vw] h-8 bg-white/10 rounded-full backdrop-blur-xl border border-white/20 overflow-hidden z-[500] shadow-2xl flex items-center">
      <div className="absolute inset-0 flex overflow-hidden items-center">
        <motion.div 
          className="flex gap-40 px-20 items-center"
          animate={{ x: [0, -2000] }}
          transition={{ 
            duration: 40, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {[...images, ...images, ...images, ...images, ...images, ...images].map((src, i) => (
            <div key={i} className="w-10 h-10 flex-shrink-0 flex justify-center items-center">
              <img 
                src={src} 
                className="h-full w-full object-contain scale-[2.2] drop-shadow-md" 
                alt="character state"
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-white/60 text-[9px] font-black tracking-[0.8em] uppercase">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};

export default function ForestShowcase({ projectId, onClose }: ForestShowcaseProps) {
  const [scene, setScene] = useState<Scene>('intro');
  const [platform, setPlatform] = useState<Platform>('taobao');
  const [progress, setProgress] = useState(0);
  const [isUntying, setIsUntying] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isTearing, setIsTearing] = useState(false);

  const isBrandDesign = projectId === 'lingnan-garden';

  const getContent = () => {
    if (isBrandDesign) {
      return {
        intro: "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/package6.png",
        scene1: "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/invitation-02-02.png",
        scene2: platform === 'taobao' 
          ? "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/Tabao.png"
          : "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/Amazon.jpg",
        mainProduct: platform === 'taobao'
          ? "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/2(1).png"
          : "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/4.2.png"
      };
    } else {
      // Lianshan Trail Content
      return {
        intro: "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/mumu_画板 1.jpg",
        scene1: "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/plan2.png",
        tickets: [
          "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/ticket%20front.png",
          "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/ticket%20back.png"
        ],
        brochure: {
          upper: [
            "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/1_画板 1.jpg",
            "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/5_画板 1.jpg",
            "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/4_画板 1.jpg"
          ],
          lower: [
            "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/3_画板 1.jpg",
            "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/2_画板 1.jpg",
            "https://fastly.jsdelivr.net/gh/ww78819-alt/PIC@main/img/6_画板 1.jpg"
          ]
        }
      };
    }
  };

  const content = getContent();

  const triggerTransition = (targetScene: Scene) => {
    // Skip progress bar for both projects as requested
    setScene(targetScene);
  };

  const handleInvitationClick = () => {
    if (isBrandDesign) {
      setIsUntying(true);
      setTimeout(() => {
        setScene('platform-select');
        setIsUntying(false);
      }, 1500);
    } else {
      triggerTransition('scene2');
    }
  };

  const selectPlatform = (p: Platform) => {
    setPlatform(p);
    setScene('scene2');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#fcfcfc] overflow-hidden"
    >
      {/* Direct Exit Button */}
      <div className="fixed top-8 right-8 z-[110]">
        <button 
          onClick={onClose}
          className="p-2 bg-black/5 hover:bg-black/10 rounded-full backdrop-blur-md transition-all group border border-black/5"
        >
          <X className="w-6 h-6 text-black group-hover:rotate-90 transition-transform" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {scene === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => triggerTransition('scene1')}
            className="relative w-full h-full flex flex-col items-center justify-center bg-white cursor-pointer group"
          >
            <div className="absolute inset-0 z-0">
              <img 
                src={content.intro} 
                className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-[1.02]"
                alt="Cover"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-12 text-black/20 text-[10px] font-bold uppercase tracking-[0.5em] pointer-events-none"
            >
              Click to Enter
            </motion.div>
          </motion.div>
        )}

        {scene === 'scene1' && (
          <motion.div
            key="scene1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-full flex items-center justify-center bg-white"
          >
            {isBrandDesign ? (
              <motion.div
                whileHover={{ scale: 1.01 }}
                onClick={handleInvitationClick}
                className="relative cursor-pointer shadow-2xl rounded-lg overflow-hidden w-full h-full max-w-[1200px] max-h-[85vh] flex items-center justify-center bg-white"
              >
                <img 
                  src={content.scene1} 
                  className="w-full h-full object-contain"
                  alt="Scene 1"
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors" />
              </motion.div>
            ) : (
              /* Lianshan Scene 1 with background and tickets */
              <div className="relative w-full h-full bg-white flex items-center justify-center">
                <img 
                  src={content.scene1} 
                  className="w-full h-full object-contain"
                  alt="Lianshan Background"
                />
                
                {/* Floating Tickets */}
                <div className="absolute top-24 left-6 md:top-32 md:left-12 z-30 flex flex-col gap-6">
                  {content.tickets?.map((src: string, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ y: 0, opacity: 0, x: -20 }}
                      animate={{ 
                        y: [0, i === 0 ? -8 : 8, 0],
                        opacity: 1,
                        x: 0,
                        rotate: i === 0 ? [-3, 3, -3] : [3, -3, 3]
                      }}
                      transition={{ 
                        y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" },
                        rotate: { duration: 5 + i, repeat: Infinity, ease: "easeInOut" },
                        opacity: { duration: 0.8, delay: 0.3 + i * 0.2 },
                        x: { duration: 0.8, delay: 0.3 + i * 0.2 }
                      }}
                      whileHover={{ scale: 1.1, zIndex: 50 }}
                      onClick={() => {
                        setIsTearing(true);
                        setTimeout(() => {
                          triggerTransition('scene2');
                          setIsTearing(false);
                        }, 1200);
                      }}
                      className="w-28 md:w-44 cursor-pointer shadow-xl rounded-xl overflow-hidden border-2 border-white/90 group relative"
                    >
                      <img src={src} className="w-full h-auto transition-transform duration-500 group-hover:scale-110" alt={`Ticket ${i}`} />
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
                    </motion.div>
                  ))}
                </div>

                {/* Tear Effect Overlay */}
                <AnimatePresence>
                  {isTearing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-[300] bg-white flex items-center justify-center overflow-hidden"
                    >
                      <div className="relative w-full max-w-2xl flex">
                        <motion.div 
                          initial={{ x: 0, rotate: 0 }}
                          animate={{ x: -800, rotate: -15, opacity: 0 }}
                          transition={{ duration: 1, ease: [0.45, 0, 0.55, 1] }}
                          className="w-1/2 overflow-hidden"
                        >
                          <img src={content.tickets?.[0]} className="w-[200%] h-auto max-w-none shadow-2xl" alt="Tear Left" />
                        </motion.div>
                        <motion.div 
                          initial={{ x: 0, rotate: 0 }}
                          animate={{ x: 800, rotate: 15, opacity: 0 }}
                          transition={{ duration: 1, ease: [0.45, 0, 0.55, 1] }}
                          className="w-1/2 overflow-hidden"
                        >
                          <img src={content.tickets?.[0]} className="w-[200%] h-auto max-w-none -ml-[100%] shadow-2xl" alt="Tear Right" />
                        </motion.div>
                        
                        {/* Tear Line Sparkle */}
                        <motion.div
                          initial={{ scaleY: 0, opacity: 1 }}
                          animate={{ scaleY: 1.5, opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="absolute top-0 left-1/2 -translate-x-1/2 w-1 bg-white z-10 shadow-[0_0_30px_rgba(255,255,255,1)]"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <AnimatePresence>
              {isUntying && isBrandDesign && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
                >
                  {/* Ribbon Animation Simulation - Black */}
                  <motion.div 
                    initial={{ scaleX: 1, opacity: 1 }}
                    animate={{ scaleX: 0, opacity: 0 }}
                    transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
                    className="absolute w-full h-2 bg-black z-[210] shadow-lg"
                  />
                  <motion.div 
                    initial={{ scaleY: 1, opacity: 1 }}
                    animate={{ scaleY: 0, opacity: 0 }}
                    transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
                    className="absolute h-full w-2 bg-black z-[210] shadow-lg"
                  />
                  <motion.div 
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 bg-white"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {scene === 'platform-select' && (
          <motion.div
            key="platform-select"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="relative w-full h-full flex flex-col items-center justify-center bg-[#fcfcfc] gap-8 md:gap-12 p-6 overflow-y-auto"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-[0.2em]">Select Platform</h2>
              <p className="text-black/40 text-[10px] md:text-xs font-bold tracking-widest uppercase">Choose your preferred e-commerce experience</p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full max-w-4xl justify-center items-center">
              <button 
                onClick={() => selectPlatform('taobao')}
                className="group relative w-full max-w-[280px] aspect-[4/5] md:w-64 md:h-80 bg-white rounded-3xl border border-black/5 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all overflow-hidden flex flex-col items-center justify-center gap-6"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#ff5000] rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-3xl md:text-4xl font-black">淘</span>
                </div>
                <div className="text-center">
                  <span className="block text-base md:text-lg font-black text-black uppercase tracking-widest">Taobao</span>
                  <span className="text-[9px] md:text-[10px] text-black/40 font-bold uppercase tracking-widest">China Market</span>
                </div>
              </button>

              <button 
                onClick={() => selectPlatform('amazon')}
                className="group relative w-full max-w-[280px] aspect-[4/5] md:w-64 md:h-80 bg-white rounded-3xl border border-black/5 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all overflow-hidden flex flex-col items-center justify-center gap-6"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#232f3e] rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-3xl md:text-4xl font-black">A</span>
                </div>
                <div className="text-center">
                  <span className="block text-base md:text-lg font-black text-black uppercase tracking-widest">Amazon</span>
                  <span className="text-[9px] md:text-[10px] text-black/40 font-bold uppercase tracking-widest">Global Market</span>
                </div>
              </button>
            </div>
          </motion.div>
        )}

        {scene === 'scene2' && (
          <motion.div
            key="scene2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative w-full h-full bg-[#f4f4f4] overflow-hidden"
          >
            {isBrandDesign ? (
              <div className="w-full h-full overflow-y-auto">
                {platform === 'taobao' ? (
                  /* Taobao Style Product Page */
                  <div className="max-w-screen-md mx-auto bg-white min-h-screen shadow-xl">
                    {/* Product Header */}
                    <div className="relative aspect-square w-full bg-[#f9f9f9]">
                      <img 
                        src={content.mainProduct} 
                        className="w-full h-full object-contain"
                        alt="Product Main"
                      />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button className="p-2 bg-black/10 backdrop-blur-md rounded-full text-white"><Share2 className="w-5 h-5" /></button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6 flex flex-col gap-4">
                      <div className="flex items-baseline gap-1 text-[#ff5000]">
                        <span className="text-xl font-bold">¥</span>
                        <span className="text-4xl font-bold">299.00</span>
                        <span className="text-sm text-gray-400 line-through ml-2">¥599.00</span>
                      </div>
                      
                      <h1 className="text-xl font-bold text-gray-900 leading-tight">
                        Pérfor U 畔馥香氛护肤精油 - 极简主义美学系列 | 品牌设计与电商视觉呈现
                      </h1>

                      <div className="flex justify-between items-center py-2 border-y border-gray-100 text-xs text-gray-400">
                        <span>快递: 免运费</span>
                        <span>月销量 1000+</span>
                        <span>广东广州</span>
                      </div>

                      <div className="flex flex-col gap-4 py-4">
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-500 w-12">服务</span>
                          <div className="flex gap-4 text-xs text-gray-700">
                            <span>7天无理由退货</span>
                            <span>正品保证</span>
                            <span>公益宝贝</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Detail Section */}
                    <div className="mt-4">
                      <div className="flex items-center justify-center py-4 bg-gray-50">
                        <div className="h-[1px] w-12 bg-gray-300" />
                        <span className="mx-4 text-xs font-bold text-gray-400 uppercase tracking-widest">详情 Details</span>
                        <div className="h-[1px] w-12 bg-gray-300" />
                      </div>
                      <img 
                        src={content.scene2} 
                        className="w-full h-auto"
                        alt="Product Detail"
                      />
                    </div>

                    {/* Bottom Bar */}
                    <div className="sticky bottom-0 left-0 w-full h-16 bg-white border-t border-gray-100 flex items-center px-4 gap-4 z-50">
                      <div className="flex gap-6 text-gray-500">
                        <div className="flex flex-col items-center gap-0.5"><MessageCircle className="w-5 h-5" /><span className="text-[10px]">客服</span></div>
                        <div className="flex flex-col items-center gap-0.5"><ShoppingCart className="w-5 h-5" /><span className="text-[10px]">购物车</span></div>
                        <div className="flex flex-col items-center gap-0.5"><Heart className="w-5 h-5" /><span className="text-[10px]">收藏</span></div>
                      </div>
                      <div className="flex-1 flex gap-2">
                        <button className="flex-1 h-10 bg-[#ff9400] text-white rounded-full text-sm font-bold">加入购物车</button>
                        <button className="flex-1 h-10 bg-[#ff5000] text-white rounded-full text-sm font-bold">立即购买</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Amazon Style Product Page */
                  <div className="max-w-screen-xl mx-auto bg-white min-h-screen p-8 flex flex-col gap-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      {/* Left: Images */}
                      <div className="flex flex-col gap-4">
                        <div className="aspect-square bg-[#f8f8f8] rounded-xl overflow-hidden border border-gray-100">
                          <img 
                            src={content.mainProduct} 
                            className="w-full h-full object-contain"
                            alt="Amazon Product"
                          />
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                          {[1,2,3,4,5].map(i => (
                            <div key={i} className="aspect-square bg-gray-50 rounded border border-gray-100 cursor-pointer hover:border-[#e77600]" />
                          ))}
                        </div>
                      </div>

                      {/* Right: Info */}
                      <div className="flex flex-col gap-6">
                        <div className="space-y-1">
                          <span className="text-sm text-[#007185] hover:text-[#c45500] cursor-pointer">Visit the Pérfor U Store</span>
                          <h1 className="text-2xl font-medium text-gray-900 leading-tight">
                            Pérfor U Essential Oil Blend - Minimalist Aesthetic Series | Brand Design & E-commerce Visual Presentation
                          </h1>
                          <div className="flex items-center gap-2">
                            <div className="flex text-[#ffa41c]"><span className="text-sm">★★★★★</span></div>
                            <span className="text-[#007185] text-sm">1,248 ratings</span>
                          </div>
                        </div>

                        <div className="h-[1px] bg-gray-200" />

                        <div className="space-y-2">
                          <div className="flex items-baseline gap-1">
                            <span className="text-sm text-gray-600">$</span>
                            <span className="text-3xl font-medium">42</span>
                            <span className="text-sm text-gray-600 font-medium">99</span>
                          </div>
                          <p className="text-sm text-gray-600">Get <span className="font-bold text-black">$50 off instantly</span>: Pay $0.00 upon approval for the Amazon Rewards Visa Card.</p>
                        </div>

                        <div className="space-y-4">
                          <div className="flex gap-4 text-sm">
                            <span className="font-bold w-24">Brand</span>
                            <span className="text-gray-700">Pérfor U</span>
                          </div>
                          <div className="flex gap-4 text-sm">
                            <span className="font-bold w-24">Scent</span>
                            <span className="text-gray-700">Floral, Woody</span>
                          </div>
                          <div className="flex gap-4 text-sm">
                            <span className="font-bold w-24">Volume</span>
                            <span className="text-gray-700">50 Milliliters</span>
                          </div>
                        </div>

                        <div className="p-4 border border-gray-300 rounded-lg space-y-4">
                          <div className="text-xl font-medium">$42.99</div>
                          <p className="text-sm text-[#007600]">In Stock.</p>
                          <div className="space-y-2">
                            <button className="w-full py-2 bg-[#ffd814] hover:bg-[#f7ca00] rounded-full text-sm shadow-sm">Add to Cart</button>
                            <button className="w-full py-2 bg-[#ffa41c] hover:bg-[#fa8914] rounded-full text-sm shadow-sm">Buy Now</button>
                          </div>
                          <div className="text-xs text-gray-600 space-y-1">
                            <div className="flex justify-between"><span>Ships from</span><span>Amazon.com</span></div>
                            <div className="flex justify-between"><span>Sold by</span><span>Pérfor U Official</span></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Amazon Detail Section */}
                    <div className="space-y-8">
                      <h3 className="text-xl font-bold border-b border-gray-200 pb-2">Product Description</h3>
                      <div className="max-w-screen-md mx-auto">
                        <img 
                          src={content.scene2} 
                          className="w-full h-auto"
                          alt="Amazon Detail"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Lianshan Trail 3D Tri-fold Brochure */
              <div className="w-full h-full flex flex-col items-center justify-start p-4 md:p-12 bg-[#faf9f6] overflow-y-auto no-scrollbar scroll-smooth">
                <div className="w-full max-w-7xl flex flex-col gap-32 py-32">
                  {/* Upper Tri-fold */}
                  <div className="flex flex-col items-center gap-12">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <span className="text-lg font-black text-black">步道导览手册Ⅰ</span>
                      <h3 className="text-sm font-medium text-black/60 tracking-widest uppercase">HANDBOOK Ⅰ</h3>
                    </motion.div>
                    
                    <div className="flex justify-start md:justify-center w-full overflow-x-auto md:overflow-x-visible no-scrollbar px-8 md:px-0" style={{ perspective: '2500px' }}>
                      <motion.div 
                        className="flex shadow-[0_50px_100px_rgba(0,0,0,0.15)] min-w-max md:min-w-0"
                        initial={{ rotateX: 10 }}
                        whileHover={{ rotateX: 0 }}
                      >
                        {/* Left Panel */}
                        <motion.div 
                          initial={{ rotateY: 75 }}
                          whileInView={{ rotateY: 25 }}
                          whileHover={{ rotateY: 5 }}
                          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                          style={{ transformOrigin: 'right' }}
                          className="w-[260px] md:w-[400px] aspect-[3/4] bg-white border-r border-black/5 overflow-hidden relative group"
                        >
                          <img src={content.brochure?.upper[0]} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" alt="Upper 1" />
                          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                        </motion.div>
                        {/* Center Panel */}
                        <div className="w-[260px] md:w-[400px] aspect-[3/4] bg-white overflow-hidden z-10 relative group">
                          <img src={content.brochure?.upper[1]} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" alt="Upper 2" />
                          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                        </div>
                        {/* Right Panel */}
                        <motion.div 
                          initial={{ rotateY: -75 }}
                          whileInView={{ rotateY: -25 }}
                          whileHover={{ rotateY: -5 }}
                          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                          style={{ transformOrigin: 'left' }}
                          className="w-[260px] md:w-[400px] aspect-[3/4] bg-white border-l border-black/5 overflow-hidden relative group"
                        >
                          <img src={content.brochure?.upper[2]} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" alt="Upper 3" />
                          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Lower Tri-fold */}
                  <div className="flex flex-col items-center gap-12">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <span className="text-lg font-black text-black">步道导览手册Ⅱ</span>
                      <h3 className="text-sm font-medium text-black/60 tracking-widest uppercase">HANDBOOK Ⅱ</h3>
                    </motion.div>

                    <div className="flex justify-start md:justify-center w-full overflow-x-auto md:overflow-x-visible no-scrollbar px-8 md:px-0" style={{ perspective: '2500px' }}>
                      <motion.div 
                        className="flex shadow-[0_50px_100px_rgba(0,0,0,0.15)] min-w-max md:min-w-0"
                        initial={{ rotateX: -10 }}
                        whileHover={{ rotateX: 0 }}
                      >
                        {/* Left Panel */}
                        <motion.div 
                          initial={{ rotateY: 75 }}
                          whileInView={{ rotateY: 25 }}
                          whileHover={{ rotateY: 5 }}
                          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                          style={{ transformOrigin: 'right' }}
                          className="w-[260px] md:w-[400px] aspect-[3/4] bg-white border-r border-black/5 overflow-hidden relative group"
                        >
                          <img src={content.brochure?.lower[0]} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" alt="Lower 1" />
                          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                        </motion.div>
                        {/* Center Panel */}
                        <div className="w-[260px] md:w-[400px] aspect-[3/4] bg-white overflow-hidden z-10 relative group">
                          <img src={content.brochure?.lower[1]} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" alt="Lower 2" />
                          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                        </div>
                        {/* Right Panel */}
                        <motion.div 
                          initial={{ rotateY: -75 }}
                          whileInView={{ rotateY: -25 }}
                          whileHover={{ rotateY: -5 }}
                          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                          style={{ transformOrigin: 'left' }}
                          className="w-[260px] md:w-[400px] aspect-[3/4] bg-white border-l border-black/5 overflow-hidden relative group"
                        >
                          <img src={content.brochure?.lower[2]} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" alt="Lower 3" />
                          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                <div className="fixed bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 text-black/30 text-[9px] font-black uppercase tracking-[0.6em] bg-white/80 backdrop-blur-md px-10 py-4 rounded-full border border-black/5 shadow-sm z-50">
                  <motion.div 
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Scroll to Explore
                  </motion.div>
                </div>
              </div>
            )}

            {/* Back Button */}
            <button 
              onClick={() => isBrandDesign ? setScene('platform-select') : setScene('scene1')}
              className={`fixed ${isBrandDesign ? 'bottom-12 left-8' : 'top-8 left-8'} z-50 flex items-center gap-2 ${isBrandDesign ? 'p-3' : 'px-6 py-3'} bg-white/80 hover:bg-white rounded-full backdrop-blur-md transition-all group border border-black/5 shadow-lg`}
            >
              <ArrowLeft className={`${isBrandDesign ? 'w-5 h-5' : 'w-4 h-4'} text-black group-hover:-translate-x-1 transition-transform`} />
              {!isBrandDesign && <span className="text-black text-sm font-bold tracking-widest uppercase">返回</span>}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar - Only for Lianshan Trail */}
      {isTransitioning && !isBrandDesign && <GameProgressBar progress={progress} />}
    </motion.div>
  );
}
