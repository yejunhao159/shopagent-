export type ChatMessage = {
  role: "user" | "agent";
  content: string;
  images?: string[];
};

export type ResultImage = {
  src: string;
  label: string;
};

export type Conversation = {
  id: number;
  history: ChatMessage[];
  user: string;
  agent: string;
  reply: string;
  agentColor: string;
  images: ResultImage[];
  postTitle: string;
  postDesc: string;
};

export const conversations: Conversation[] = [
  {
    id: 0,
    history: [
      { role: "user", content: "hi" },
      { role: "agent", content: "您好！我是您的视觉引擎顾问，今天想做什么风格的图？" },
      { role: "user", content: "我有一批秋季新款女装，想做一些小红书风格的种草图。" },
      { role: "agent", content: "没问题。秋季女装很适合搭配温暖的色调或者极简高级感。您这批衣服主要是哪些款式呢？" },
      { role: "user", content: "主要是羊绒大衣和高领毛衣，颜色偏大地色系和燕麦色。" },
      { role: "agent", content: "大地色系的羊绒材质非常适合\u201c老钱风\u201d或\u201c极简法式\u201d风格。您希望模特是怎样的气质？比如清冷感、温柔知性，还是干练职场？" },
      { role: "user", content: "想要清冷感一点的，最好是亚洲面孔，背景不要太复杂，能突出衣服质感就行。" },
      {
        role: "agent",
        content: "收到。清冷感亚洲模特搭配极简纯色背景或光影棚拍，能很好地凸显羊绒的质感。需要我先为您生成几个模特面孔和场景的测试小样吗？",
        images: ["/images/gallery/on_2343.webp", "/images/gallery/la_xsqjn5Gcm3.webp"],
      },
      { role: "user", content: "可以，顺便帮我构思一下小红书的文案方向，要那种不经意的高级感。" },
      { role: "agent", content: "好的。文案可以主打\u201c早秋质感穿搭\u201d、\u201c极简衣橱\u201d或\u201c毫不费力的高级感\u201d。我这就为您准备视觉方案和文案草稿。" },
      { role: "user", content: "太棒了，那就按这个方向来吧。" },
      { role: "agent", content: "好的，请随时告诉我您的具体生成需求。" },
    ],
    user: "帮我生成一组高级感的服装模特图，用在小红书首图",
    agent: "视觉引擎 · 极简美学",
    reply: "已调度 Seedream 引擎，为您生成 3 个不同风格的高级感方案：",
    agentColor: "bg-purple-50 text-purple-700 border-purple-100",
    images: [
      { src: "/images/gallery/on_2308.webp", label: "方案 A · 极简棚拍" },
      { src: "/images/gallery/la_xsqjn5Gcm3.webp", label: "方案 B · 杂志封面" },
      { src: "/images/gallery/la_0508YOAAYQ.webp", label: "方案 C · 先锋情绪" },
    ],
    postTitle: "极简风穿搭｜高级感拉满的早秋OOTD",
    postDesc: "今天这套真的是我的心头好！极简的剪裁加上高级的质感，随便一拍就是大片既视感。#极简穿搭 #高级感 #OOTD",
  },
  {
    id: 1,
    history: [
      { role: "user", content: "这件大衣太难拍了，感觉怎么拍都不出效果" },
      { role: "agent", content: "没问题，交给我。您可以上传一张基础的白底图或者随手拍，我来帮您重构场景。" },
      {
        role: "user",
        content: "我已经上传了一张在办公室拍的，背景很乱。",
        images: ["/images/gallery/la_6c758f2ac9.webp"],
      },
      { role: "agent", content: "看到了。这件大衣的版型很好，是经典的H型。您希望把它放在什么样的场景里？" },
      { role: "user", content: "想放在室外，最好是那种有电影感的城市街头。" },
      { role: "agent", content: "城市街头很合适。您偏好哪种城市氛围？比如巴黎的浪漫午后，还是纽约的冷调都会？" },
      { role: "user", content: "都要试试，我想要那种走路带风的感觉。" },
      { role: "agent", content: "好的，我会通过深度图控制技术，保留大衣原本的质感和褶皱，同时将背景替换为您想要的城市街景。" },
      { role: "user", content: "光影能自然一点吗？不要看起来像抠图的。" },
      { role: "agent", content: "当然，我会自动匹配环境光照，确保人物和背景的光影方向一致，达到真实的融合效果。" },
      { role: "user", content: "听起来不错，那文案怎么写比较吸引人？" },
      { role: "agent", content: "文案可以强调\u201c城市漫游\u201d、\u201c电影感穿搭\u201d，突出大衣带来的气场。需要我现在开始生成吗？" },
    ],
    user: "把这件大衣的模特换成街拍风格，背景要有城市感",
    agent: "视觉引擎 · 场景重构",
    reply: "已使用深度图控制技术，完美保持服装质感，重构城市街拍背景：",
    agentColor: "bg-purple-50 text-purple-700 border-purple-100",
    images: [
      { src: "/images/gallery/la_0PUmPZzYbb.webp", label: "巴黎街头 · 午后" },
      { src: "/images/gallery/la_lOrCbdLp0z.webp", label: "纽约都会 · 冷调" },
    ],
    postTitle: "城市漫游指南｜这件大衣太出片了",
    postDesc: "穿上这件大衣，走在城市的街头，感觉自己就是电影女主角。版型绝了，超级显瘦！#城市街拍 #大衣穿搭 #秋冬好物",
  },
  {
    id: 2,
    history: [
      { role: "user", content: "我们要上一批秋季新品的香薰蜡烛和配饰" },
      { role: "agent", content: "收到。香薰和配饰非常适合用带有光影的静物平铺来展现氛围感。需要我提供什么风格的参考？" },
      { role: "user", content: "想要那种温暖治愈的风格，适合放在电商详情页首图。" },
      { role: "agent", content: "温暖治愈风很棒。我们可以使用木质桌面、亚麻布料作为背景，搭配一些落叶或干花作为点缀。您觉得如何？" },
      { role: "user", content: "可以，但是不要太杂乱，要突出产品本身。" },
      { role: "agent", content: "明白，我会采用\u201c留白\u201d或者\u201c错落\u201d的构图方式，让画面保持干净高级。光线方面，您喜欢清晨的柔和光还是午后的暖阳？" },
      { role: "user", content: "午后暖阳吧，有点斑驳的树影感觉最好。" },
      { role: "agent", content: "好的，斑驳的树影能极大提升画面的故事感。您的产品包装是什么颜色的？" },
      { role: "user", content: "主要是米白色和琥珀色的玻璃罐。" },
      {
        role: "agent",
        content: "琥珀色玻璃在暖阳下会非常通透。我会为您生成几组不同构图的平铺图，并配上适合秋冬分享的文案。",
        images: ["/images/gallery/la_ycuAFAqdrH.webp", "/images/gallery/la_03401c9264.webp"],
      },
      { role: "user", content: "文案要那种能提升生活幸福感的调调。" },
      { role: "agent", content: "没问题，文案会聚焦\u201c生活美学\u201d和\u201c居家仪式感\u201d。准备好生成了吗？" },
    ],
    user: "生成一组产品平铺摆拍图，秋冬氛围感，适合电商详情页",
    agent: "视觉引擎 · 静物叙事",
    reply: "已生成 3 组具有光影呼吸感的平铺构图，温暖克制：",
    agentColor: "bg-purple-50 text-purple-700 border-purple-100",
    images: [
      { src: "/images/gallery/on_2510.webp", label: "构图 A · 留白" },
      { src: "/images/gallery/on_1803.webp", label: "构图 B · 错落" },
      { src: "/images/gallery/la_tIhSlHLtb3.webp", label: "构图 C · 叠层" },
    ],
    postTitle: "提升幸福感的秋冬好物清单",
    postDesc: "给生活加点温度，这些秋冬好物你绝对不能错过。质感满满，看着就让人心情变好。#秋冬好物 #好物分享 #生活美学",
  },
];
