import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowLeft, MoreHorizontal, Share2, Settings, Heart, Star, MessageCircle, Send } from 'lucide-react';

interface RedShowcaseProps {
  onClose: () => void;
}

type Scene = 'scene1' | 'scene2';

interface Post {
  id: number;
  url: string;
  title: string;
  description: string;
  likes: string;
  comments: { id: number; user: string; avatar: string; text: string }[];
}

export default function RedShowcase({ onClose }: RedShowcaseProps) {
  const [scene, setScene] = useState<Scene>('scene1');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);

  const posts: Post[] = [
    { 
      id: 1, 
      url: 'https://raw.githubusercontent.com/ww78819-alt/PIC/main/img/Gemini_Generated_Image_tftxg4tftxg4tftx.png', 
      title: '“椰”风一夏，Summer限定来袭！', 
      description: '清爽的椰香与细腻的奶油完美融合，仿佛置身于夏日的沙滩。这是我们为这个夏天特别准备的限定款，快来尝尝吧！🥥✨ #夏日限定 #日式甜点 #椰子控',
      likes: '1.2w',
      comments: [
        { id: 1, user: '喵喵酱', avatar: 'https://picsum.photos/seed/cat1/100/100', text: '看起来太好吃了！想吃！😻' },
        { id: 2, user: '小鱼干', avatar: 'https://picsum.photos/seed/cat2/100/100', text: '这个包装也太可爱了吧，心动了～' },
        { id: 3, user: '布丁猫', avatar: 'https://picsum.photos/seed/cat3/100/100', text: '明天就去打卡！冲鸭！' },
        { id: 4, user: '芝士喵', avatar: 'https://picsum.photos/seed/cat4/100/100', text: '椰子味赛高！🥥' }
      ]
    },
    { 
      id: 2, 
      url: 'https://raw.githubusercontent.com/ww78819-alt/PIC/main/img/Gemini_Generated_Image_a3bvrqa3bvrqa3bv.png', 
      title: '“芒芒”人海，找到我的可可', 
      description: '当新鲜芒果遇上浓郁可可，酸甜与苦甜的奇妙碰撞。每一口都是惊喜，在这个人海中，你找到属于你的那份甜蜜了吗？🥭🍫',
      likes: '8.5k',
      comments: [
        { id: 1, user: '奶茶猫', avatar: 'https://picsum.photos/seed/cat5/100/100', text: '芒果 and 可可的组合真的绝了！' },
        { id: 2, user: '团子喵', avatar: 'https://picsum.photos/seed/cat6/100/100', text: '画风好治愈，想去店里坐坐。' },
        { id: 3, user: '毛球君', avatar: 'https://picsum.photos/seed/cat7/100/100', text: '这颜值我给满分！💯' },
        { id: 4, user: '肉垫控', avatar: 'https://picsum.photos/seed/cat8/100/100', text: '喵喵也想吃一口～' }
      ]
    },
    { 
      id: 3, 
      url: 'https://raw.githubusercontent.com/ww78819-alt/PIC/main/img/Gemini_Generated_Image_gia3szgia3szgia3.png', 
      title: '下午茶时光，我pick草莓🍓', 
      description: '粉粉嫩嫩的草莓季，谁能拒绝这份少女心呢？新鲜草莓搭配轻盈慕斯，让你的下午茶时光充满甜蜜气息。🍓🍰',
      likes: '3.4k',
      comments: [
        { id: 1, user: '草莓喵', avatar: 'https://picsum.photos/seed/cat9/100/100', text: '草莓控表示完全无法抵抗！' },
        { id: 2, user: '铃铛猫', avatar: 'https://picsum.photos/seed/cat10/100/100', text: '太漂亮了，舍不得吃掉。' },
        { id: 3, user: '呼噜噜', avatar: 'https://picsum.photos/seed/cat11/100/100', text: '周末约起！👭' },
        { id: 4, user: '薄荷猫', avatar: 'https://picsum.photos/seed/cat12/100/100', text: '这才是下午茶该有的样子。' }
      ]
    },
    { 
      id: 4, 
      url: 'https://raw.githubusercontent.com/ww78819-alt/PIC/main/img/Generated%20Image%20March%2025%2C%202026%20-%209_08PM.png', 
      title: 'EAT\'ie为Sweetie专门设计的包装盒', 
      description: '好的甜点需要好的包装。我们精心设计了这款礼盒，希望每一份送出的礼物都能传递最真挚的温暖。🎁✨ #包装设计 #礼品推荐',
      likes: '5.6k',
      comments: [
        { id: 1, user: '蝴蝶结喵', avatar: 'https://picsum.photos/seed/cat13/100/100', text: '这个盒子我可以收藏一辈子！' },
        { id: 2, user: '礼物猫', avatar: 'https://picsum.photos/seed/cat14/100/100', text: '送人真的太有面子了。' },
        { id: 3, user: '彩带喵', avatar: 'https://picsum.photos/seed/cat15/100/100', text: '细节控表示非常满意。' },
        { id: 4, user: '纸盒控', avatar: 'https://picsum.photos/seed/cat16/100/100', text: '喵喵最喜欢钻盒子了～' }
      ]
    },
    { 
      id: 5, 
      url: 'https://raw.githubusercontent.com/ww78819-alt/PIC/main/img/Generated%20Image%20March%2025%2C%202026%20-%208_39PM.png', 
      title: 'EAT\'ie 配方大公开！喵也喜欢的糕糕', 
      description: '很多人问我们的糕点为什么这么软糯，今天就来揭秘！选用顶级食材，坚持手工制作，连家里的喵星人都忍不住凑过来闻闻呢。🐾🍰',
      likes: '2.1w',
      comments: [
        { id: 1, user: '大厨喵', avatar: 'https://picsum.photos/seed/cat17/100/100', text: '学到了学到了，这就去试试。' },
        { id: 2, user: '贪吃猫', avatar: 'https://picsum.photos/seed/cat18/100/100', text: '喵喵：我也想吃，快给我！' },
        { id: 3, user: '围裙猫', avatar: 'https://picsum.photos/seed/cat19/100/100', text: '真的是良心商家，支持！' },
        { id: 4, user: '面粉喵', avatar: 'https://picsum.photos/seed/cat20/100/100', text: '看饿了，外卖能送到家吗？' }
      ]
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-white overflow-hidden"
    >
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="fixed top-8 right-8 z-[110] p-3 bg-black/5 hover:bg-black/10 rounded-full backdrop-blur-md transition-all group border border-black/5"
      >
        <X className="w-6 h-6 text-black group-hover:rotate-90 transition-transform" />
      </button>

      <AnimatePresence mode="wait">
        {scene === 'scene1' && (
          <motion.div
            key="scene1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-full flex flex-col items-center justify-center bg-white"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <img 
                src="https://raw.githubusercontent.com/ww78819-alt/PIC/main/img/shop.png" 
                className="w-full h-full object-contain"
                alt="Shop Cover"
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setScene('scene2')}
              className="absolute bottom-12 right-12 w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl group bg-white"
            >
              <img 
                src="https://raw.githubusercontent.com/ww78819-alt/PIC/main/img/logo(1).png" 
                className="w-full h-full object-cover"
                alt="Logo Button"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </motion.button>
          </motion.div>
        )}

        {scene === 'scene2' && (
          <motion.div
            key="scene2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-full bg-[#f8f8f8] overflow-y-auto"
          >
            {/* Xiaohongshu Mock UI */}
            <div className="max-w-screen-md mx-auto bg-white min-h-screen shadow-2xl flex flex-col">
              {/* Header Background */}
              <div 
                className="relative h-64 md:h-80 overflow-hidden cursor-pointer"
                onClick={() => setFullScreenImage('https://raw.githubusercontent.com/ww78819-alt/PIC/main/img/shop.png')}
              >
                <img 
                  src="https://raw.githubusercontent.com/ww78819-alt/PIC/main/img/shop.png" 
                  className="w-full h-full object-cover blur-[2px] scale-110"
                  alt="Profile Background"
                />
                <div className="absolute inset-0 bg-black/30" />
                
                {/* Header Actions */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-center text-white">
                  <button onClick={(e) => { e.stopPropagation(); setScene('scene1'); }}><ArrowLeft className="w-6 h-6" /></button>
                  <div className="flex gap-6">
                    <Share2 className="w-5 h-5" />
                    <MoreHorizontal className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="relative px-6 pb-6 -mt-12">
                <div className="flex justify-between items-end mb-6">
                  <div className="relative">
                    <div 
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white overflow-hidden shadow-lg bg-white cursor-pointer"
                      onClick={() => setFullScreenImage('https://raw.githubusercontent.com/ww78819-alt/PIC/main/img/logo(1).png')}
                    >
                      <img 
                        src="https://raw.githubusercontent.com/ww78819-alt/PIC/main/img/logo(1).png" 
                        className="w-full h-full object-cover"
                        alt="Avatar"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 pb-2">
                    <button className="px-6 py-1.5 rounded-full border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors">编辑资料</button>
                    <button className="p-1.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"><Settings className="w-5 h-5 text-gray-600" /></button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h1 className="text-2xl font-black text-gray-900">EAT'ie 日式甜点店</h1>
                    <p className="text-xs text-gray-400 mt-1">小红书号：EATIE_SWEETS</p>
                  </div>
                  
                  <p className="text-sm text-gray-600 leading-relaxed max-w-lg">
                    展示EAT'ie日式甜点店的小红书搭建场景，包括产品设计、商品介绍图、包装设计等。🍰 每一份甜点都是一份心意。
                  </p>

                  <div className="flex gap-6 text-sm">
                    <div className="flex gap-1.5 items-baseline">
                      <span className="font-black text-gray-900">128</span>
                      <span className="text-gray-400 text-xs">关注</span>
                    </div>
                    <div className="flex gap-1.5 items-baseline">
                      <span className="font-black text-gray-900">4.2w</span>
                      <span className="text-gray-400 text-xs">粉丝</span>
                    </div>
                    <div className="flex gap-1.5 items-baseline">
                      <span className="font-black text-gray-900">15.6w</span>
                      <span className="text-gray-400 text-xs">获赞与收藏</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-t border-gray-100 mt-4">
                <button className="flex-1 py-4 flex flex-col items-center gap-1 border-b-2 border-red-500">
                  <span className="text-sm font-black text-gray-900">笔记</span>
                </button>
                <button className="flex-1 py-4 flex flex-col items-center gap-1 text-gray-400">
                  <span className="text-sm font-medium">收藏</span>
                </button>
                <button className="flex-1 py-4 flex flex-col items-center gap-1 text-gray-400">
                  <span className="text-sm font-medium">赞过</span>
                </button>
              </div>

              {/* Grid */}
              <div className="bg-gray-50 p-1 grid grid-cols-2 gap-1 flex-1">
                {posts.map((post) => (
                  <motion.div 
                    key={post.id}
                    whileHover={{ scale: 0.98 }}
                    onClick={() => setSelectedPost(post)}
                    className="bg-white rounded-lg overflow-hidden shadow-sm flex flex-col cursor-pointer"
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-white flex items-center justify-center p-1">
                      <img src={post.url} className="w-full h-full object-contain" alt={post.title} />
                    </div>
                    <div className="p-3 space-y-2">
                      <h3 className="text-xs font-bold text-gray-800 line-clamp-2 leading-snug">{post.title}</h3>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1.5">
                          <div className="w-4 h-4 rounded-full overflow-hidden">
                            <img src="https://raw.githubusercontent.com/ww78819-alt/PIC/main/img/logo(1).png" className="w-full h-full object-cover" alt="mini-avatar" />
                          </div>
                          <span className="text-[9px] text-gray-400 font-medium">EAT'ie</span>
                        </div>
                        <div className="flex items-center gap-0.5 text-gray-400">
                          <Heart className="w-3 h-3" />
                          <span className="text-[9px] font-medium">{post.likes}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Post Detail Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Section */}
              <div className="flex-1 bg-white flex items-center justify-center p-4 md:p-8">
                <img src={selectedPost.url} className="max-w-full max-h-full object-contain rounded-xl" alt={selectedPost.title} />
              </div>

              {/* Content Section */}
              <div className="w-full md:w-[400px] flex flex-col bg-white border-l border-gray-100">
                {/* Post Header */}
                <div className="p-4 flex items-center justify-between border-b border-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
                      <img src="https://raw.githubusercontent.com/ww78819-alt/PIC/main/img/logo(1).png" className="w-full h-full object-cover" alt="avatar" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">EAT'ie 日式甜点店</p>
                      <p className="text-[10px] text-gray-400">发布于 2026-03-26</p>
                    </div>
                  </div>
                  <button className="px-4 py-1 rounded-full border border-red-500 text-red-500 text-xs font-bold">关注</button>
                </div>

                {/* Post Body */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <h2 className="text-lg font-black text-gray-900">{selectedPost.title}</h2>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedPost.description}
                  </p>

                  <div className="h-[1px] bg-gray-50 w-full" />

                  {/* Comments */}
                  <div className="space-y-6">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">共 {selectedPost.comments.length} 条评论</p>
                    {selectedPost.comments.map(comment => (
                      <div key={comment.id} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-gray-100">
                          <img src={comment.avatar} className="w-full h-full object-cover" alt="cat-avatar" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-gray-500">{comment.user}</p>
                          <p className="text-sm text-gray-800">{comment.text}</p>
                          <div className="flex gap-4 text-[10px] text-gray-400">
                            <span>03-26</span>
                            <span>回复</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Post Footer */}
                <div className="p-4 border-t border-gray-50 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-5">
                      <Heart className="w-6 h-6 text-gray-700 cursor-pointer hover:text-red-500 transition-colors" />
                      <MessageCircle className="w-6 h-6 text-gray-700 cursor-pointer" />
                      <Star className="w-6 h-6 text-gray-700 cursor-pointer hover:text-yellow-500 transition-colors" />
                    </div>
                    <Share2 className="w-6 h-6 text-gray-700 cursor-pointer" />
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2">
                    <input type="text" placeholder="说点什么..." className="bg-transparent flex-1 text-sm outline-none" />
                    <Send className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Screen Image Modal */}
      <AnimatePresence>
        {fullScreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black flex items-center justify-center p-4"
            onClick={() => setFullScreenImage(null)}
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={fullScreenImage}
              className="max-w-full max-h-full object-contain"
              alt="Full Screen"
            />
            <button className="absolute top-8 right-8 text-white p-2 hover:bg-white/10 rounded-full">
              <X className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
