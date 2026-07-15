function imageSeries(basePath, count) {
  return Array.from({ length: count }, (_, index) => `${basePath}/${String(index + 1).padStart(2, "0")}.png`);
}

function imageSeriesWithExt(basePath, count, ext) {
  return Array.from({ length: count }, (_, index) => `${basePath}/${String(index + 1).padStart(2, "0")}.${ext}`);
}

const portfolioWorks = [
  {
    id: "wenxu",
    title: "Wenxu",
    titleCn: "闻绪",
    category: "Healing Fragrance Brand / Visual Identity",
    categoryCn: "疗愈香薰品牌形象",
    year: "2026",
    description: "A healing fragrance brand identity exploring scent, emotion and quiet daily rituals.",
    descriptionCn: "一个围绕气味、情绪疗愈与日常仪式感展开的香薰品牌视觉识别项目。",
    cover: "public/works/wenxu-vis/cover.png",
    manualImages: imageSeries("public/works/wenxu-vis/manual", 19),
    tags: ["Fragrance", "Identity", "Ritual"],
  },
  {
    id: "sanya",
    title: "Sanya City Identity",
    titleCn: "三亚城市品牌形象",
    category: "Brand Identity / City Branding",
    categoryCn: "城市品牌形象设计",
    year: "2026",
    description: "A city identity project exploring tropical culture, openness and emotional destination branding.",
    descriptionCn: "一个围绕热带文化、开放气质与情感目的地传播展开的城市品牌形象设计项目。",
    cover: "public/works/sanya-vis/cover.png",
    manualImages: imageSeries("public/works/sanya-vis/manual", 23),
    tags: ["City Branding", "Destination", "Culture"],
  },
  {
    id: "haiyu-dongan",
    title: "Haiyu Dong’an",
    titleCn: "海语东岸",
    category: "Brand Identity / Visual Identity System",
    categoryCn: "品牌形象 / 视觉识别系统",
    year: "2026",
    description: "A visual identity system designed for a coastal lifestyle and residential brand.",
    descriptionCn: "一个面向滨海生活方式与住宅品牌的视觉识别系统设计项目。",
    cover: "public/works/haiyu-dongan-vis/cover.png",
    manualImages: imageSeries("public/works/haiyu-dongan-vis/manual", 33),
    tags: ["Coastal", "Lifestyle", "Identity"],
  },
  {
    id: "xingfu-noodle-house",
    title: "Xingfu Noodle House",
    titleCn: "幸福面馆",
    category: "Restaurant Identity / Visual Identity",
    categoryCn: "餐饮品牌形象 / 视觉识别",
    year: "2026",
    description: "A restaurant identity system built around warmth, everyday dining and memorable local character.",
    descriptionCn: "一个围绕温暖感、日常餐饮体验与地方记忆点展开的餐饮品牌视觉识别项目。",
    cover: "public/works/xingfu-noodle-vis/cover.png",
    manualImages: imageSeries("public/works/xingfu-noodle-vis/manual", 19),
    tags: ["Restaurant", "Local", "Warmth"],
  },
  {
    id: "xunsheng",
    title: "Xunsheng",
    titleCn: "讯昇",
    category: "Corporate Identity / Visual Identity",
    categoryCn: "企业品牌形象 / 视觉识别",
    year: "2026",
    description: "A corporate identity project focused on technology, clarity and professional communication.",
    descriptionCn: "一个强调科技感、清晰表达与专业传播的企业品牌视觉识别项目。",
    cover: "public/works/xunsheng-vis/cover.png",
    manualImages: imageSeries("public/works/xunsheng-vis/manual", 21),
    tags: ["Corporate", "Technology", "Communication"],
  },
  {
    id: "zuoan-coffee",
    title: "Zuoan Coffee",
    titleCn: "\u5de6\u5cb8\u5496\u5561",
    category: "Coffee Brand / Visual Identity",
    categoryCn: "\u5496\u5561\u54c1\u724c\u5f62\u8c61 / \u89c6\u89c9\u8bc6\u522b",
    year: "2026",
    description: "A coffee brand identity system exploring urban leisure, aroma and everyday rituals.",
    descriptionCn: "\u4e00\u4e2a\u56f4\u7ed5\u57ce\u5e02\u4f11\u95f2\u3001\u5496\u5561\u9999\u6c14\u4e0e\u65e5\u5e38\u4eea\u5f0f\u611f\u5c55\u5f00\u7684\u5496\u5561\u54c1\u724c\u89c6\u89c9\u8bc6\u522b\u9879\u76ee\u3002",
    cover: "public/works/zuoan-coffee-vis/cover.jpg",
    manualImages: imageSeriesWithExt("public/works/zuoan-coffee-vis/manual", 15, "jpg"),
    tags: ["Coffee", "Identity", "Ritual"],
  },
];

window.portfolioWorks = portfolioWorks;
