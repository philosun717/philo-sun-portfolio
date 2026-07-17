const selectedWorks = window.portfolioWorks || [];
const WORK_MODAL_TRANSITION_MS = 380;
let workModalCloseTimer = null;
let activeWorkIndex = null;
const worksMobileQuery = window.matchMedia("(max-width: 767px)");

const vibecodingProjects = [
  {
    id: "airmemo-lab",
    number: "01",
    title: "AirMemo",
    category: "Product",
    year: "2026",
    description: "Windows Desktop Memo App",
    cover: "",
    link: "http://airmemo.ssss.design",
    logo: "public/vibecoding/airmemo-logo.png",
    visual: "public/vibecoding/airmemo-product.png",
    tags: ["Built Product"],
    status: "Built Product",
    tech: "Electron / Product Design / Branding",
    introCn: "一款轻量美观的 Windows 桌面便签工具，用于记录灵感、待办与提醒。",
    type: "Windows Desktop Memo App",
  },
  {
    id: "central-axis-lab",
    number: "02",
    title: "Beijing Central Axis H5",
    category: "Interactive",
    year: "2026",
    description: "Interactive Information Visualization",
    cover: "",
    link: "http://axis.ssss.design",
    logo: "public/vibecoding/central-axis-icon.png",
    visual: "public/vibecoding/central-axis-product.png",
    tags: ["Interactive Prototype"],
    status: "Interactive Prototype",
    tech: "Cultural Heritage / H5 / Narrative Design",
    introCn: "一个围绕北京中轴线节点、路线与文化信息展开的互动可视化 H5。",
    type: "Interactive Information Visualization",
  },
];

const archiveItems = [
  {
    type: "IP IMAGE",
    title: "IP Image Design",
    year: "2026",
    image: "public/archive/ip-image/01.jpg",
    detailImages: [
      "public/archive/ip-image/02.jpg",
      "public/archive/ip-image/03.jpg",
      "public/archive/ip-image/04.jpg",
      "public/archive/ip-image/05.jpg",
      "public/archive/ip-image/06.jpg",
      "public/archive/ip-image/07.jpg",
      "public/archive/ip-image/08.jpg",
      "public/archive/ip-image/09.jpg",
      "public/archive/ip-image/10.jpg",
      "public/archive/ip-image/11.jpg",
    ],
    description: "Character image and visual extension design.",
    featured: true,
  },
  {
    type: "PROMOTIONAL MATERIALS",
    title: "\u9130\u91cc\u5730\u94c1\u6d77\u62a5",
    year: "2026",
    image: "public/archive/other-design/\u9130\u91cc\u5730\u94c1\u6d77\u62a5.jpg",
    description: "Promotional poster design for a metro campaign.",
    layout: "small",
  },
  {
    type: "PROMOTIONAL MATERIALS",
    title: "\u94f6\u6cf0\u5f00\u4e1a\u6d77\u62a5",
    year: "2026",
    image: "public/archive/other-design/\u94f6\u6cf0\u5f00\u4e1a\u6d77\u62a5.jpg",
    description: "Opening campaign poster design.",
    layout: "large",
  },
  {
    type: "PROMOTIONAL MATERIALS",
    title: "\u5510\u72ee\u53cc\u5341\u4e00\u7269\u6599",
    year: "2026",
    image: "public/archive/other-design/\u5510\u72ee\u53cc\u5341\u4e00\u7269\u6599.png",
    description: "Promotional material design for a retail campaign.",
    layout: "large",
  },
  {
    type: "PROMOTIONAL MATERIALS",
    title: "\u5496\u5561\u8282\u6d77\u62a5",
    year: "2026",
    image: "public/archive/other-design/\u5496\u5561\u8282\u6d77\u62a5.jpg",
    detailImages: ["public/archive/other-design/\u5496\u5561\u8282\u6d77\u62a5.png"],
    description: "Coffee festival poster design.",
    layout: "small",
  },
  {
    type: "PROMOTIONAL MATERIALS",
    title: "\u4e1c\u9f13\u9053\u65bd\u5de5\u56f4\u6321",
    year: "2026",
    image: "public/archive/other-design/\u4e1c\u9f13\u9053\u65bd\u5de5\u56f4\u6321.jpg",
    detailImages: [
      "public/archive/other-design/\u4e1c\u9f13\u9053\u65bd\u5de5\u56f4\u6321.jpg",
      "public/archive/other-design/\u4e1c\u9f13\u9053\u65bd\u5de5\u56f4\u632102.jpg",
    ],
    description: "Construction hoarding visual design.",
    featured: true,
  },
  {
    type: "TYPOGRAPHY",
    title: "\u5927\u8fde\u7406\u5de5\u5b81\u7814\u9662\u5ba3\u4f20\u518c",
    year: "2024",
    image: "public/archive/other-design/\u5927\u8fde\u7406\u5de5\u5b81\u7814\u9662\u5ba3\u4f20\u518c.jpg",
    description: "Editorial and brochure layout design.",
  },
  {
    type: "TYPOGRAPHY",
    title: "\u5927\u8fde\u7406\u5de5\u5b81\u7814\u9662\u5ba3\u4f20\u518c 02",
    year: "2024",
    image: "public/archive/other-design/\u5927\u8fde\u7406\u5de5\u5b81\u7814\u9662\u5ba3\u4f20\u518c02.jpg",
    description: "Editorial and brochure layout design.",
  },
  {
    type: "TYPOGRAPHY",
    title: "\u5927\u8fde\u7406\u5de5\u5b81\u7814\u9662\u62db\u8058\u4e09\u6298\u9875",
    year: "2024",
    image: "public/archive/other-design/\u5927\u8fde\u7406\u5de5\u5b81\u7814\u9662\u62db\u8058\u4e09\u6298\u9875.jpg",
    description: "Tri-fold layout design.",
  },
  {
    type: "TYPOGRAPHY",
    title: "\u5929\u6d25\u5927\u5b66\u6d59\u6c5f\u7814\u7a76\u9662\u5ba3\u4f20\u4e09\u6298\u9875",
    year: "2024",
    image: "public/archive/other-design/\u5929\u6d25\u5927\u5b66\u6d59\u6c5f\u7814\u7a76\u9662\u5ba3\u4f20\u4e09\u6298\u9875.jpg",
    description: "Tri-fold editorial layout design.",
  },
  {
    type: "TYPOGRAPHY",
    title: "\u5929\u6d25\u5927\u5b66\u6d59\u6c5f\u7814\u7a76\u9662\u5ba3\u4f20\u4e09\u6298\u9875 02",
    year: "2024",
    image: "public/archive/other-design/\u5929\u6d25\u5927\u5b66\u6d59\u6c5f\u7814\u7a76\u9662\u5ba3\u4f20\u4e09\u6298\u987502.jpg",
    description: "Tri-fold editorial layout design.",
  },
  {
    type: "WAYFINDING",
    title: "College Wayfinding",
    year: "2026",
    image: "public/archive/wayfinding/\u5b66\u9662\u5bfc\u89c6/01.jpg",
    detailImages: [
      "public/archive/wayfinding/\u5b66\u9662\u5bfc\u89c6/\u5b66\u9662\u5bfc\u89c6_01.jpg",
      "public/archive/wayfinding/\u5b66\u9662\u5bfc\u89c6/\u5b66\u9662\u5bfc\u89c6-02.jpg",
      "public/archive/wayfinding/\u5b66\u9662\u5bfc\u89c6/\u5b66\u9662\u5bfc\u89c6-03.jpg",
      "public/archive/wayfinding/\u5b66\u9662\u5bfc\u89c6/\u5b66\u9662\u5bfc\u89c6-04.jpg",
      "public/archive/wayfinding/\u5b66\u9662\u5bfc\u89c6/\u5b66\u9662\u5bfc\u89c6-05.jpg",
    ],
    description: "Wayfinding system and environmental graphic design.",
  },
  {
    type: "WAYFINDING",
    title: "Chengdu Global Center Wayfinding",
    year: "2026",
    image: "public/archive/wayfinding/\u6210\u90fd\u73af\u7403\u4e2d\u5fc3\u5bfc\u89c6/01.jpg",
    detailImages: [
      "public/archive/wayfinding/\u6210\u90fd\u73af\u7403\u4e2d\u5fc3\u5bfc\u89c6/02.JPG",
      "public/archive/wayfinding/\u6210\u90fd\u73af\u7403\u4e2d\u5fc3\u5bfc\u89c6/03.JPG",
      "public/archive/wayfinding/\u6210\u90fd\u73af\u7403\u4e2d\u5fc3\u5bfc\u89c6/04.JPG",
      "public/archive/wayfinding/\u6210\u90fd\u73af\u7403\u4e2d\u5fc3\u5bfc\u89c6/05.JPG",
      "public/archive/wayfinding/\u6210\u90fd\u73af\u7403\u4e2d\u5fc3\u5bfc\u89c6/06.JPG",
      "public/archive/wayfinding/\u6210\u90fd\u73af\u7403\u4e2d\u5fc3\u5bfc\u89c6/07.JPG",
      "public/archive/wayfinding/\u6210\u90fd\u73af\u7403\u4e2d\u5fc3\u5bfc\u89c6/08.JPG",
      "public/archive/wayfinding/\u6210\u90fd\u73af\u7403\u4e2d\u5fc3\u5bfc\u89c6/09.JPG",
      "public/archive/wayfinding/\u6210\u90fd\u73af\u7403\u4e2d\u5fc3\u5bfc\u89c6/10.JPG",
      "public/archive/wayfinding/\u6210\u90fd\u73af\u7403\u4e2d\u5fc3\u5bfc\u89c6/11.JPG",
      "public/archive/wayfinding/\u6210\u90fd\u73af\u7403\u4e2d\u5fc3\u5bfc\u89c6/12.jpg",
      "public/archive/wayfinding/\u6210\u90fd\u73af\u7403\u4e2d\u5fc3\u5bfc\u89c6/13.jpg",
      "public/archive/wayfinding/\u6210\u90fd\u73af\u7403\u4e2d\u5fc3\u5bfc\u89c6/14.jpg",
      "public/archive/wayfinding/\u6210\u90fd\u73af\u7403\u4e2d\u5fc3\u5bfc\u89c6/15.jpg",
      "public/archive/wayfinding/\u6210\u90fd\u73af\u7403\u4e2d\u5fc3\u5bfc\u89c6/16.jpg",
      "public/archive/wayfinding/\u6210\u90fd\u73af\u7403\u4e2d\u5fc3\u5bfc\u89c6/17.jpg",
      "public/archive/wayfinding/\u6210\u90fd\u73af\u7403\u4e2d\u5fc3\u5bfc\u89c6/18.jpg",
    ],
    description: "Wayfinding system and environmental graphic design.",
  },
  {
    type: "EXHIBITION",
    title: "Spring Art Museum",
    year: "2026",
    image: "public/archive/exhibition/spring-gallery/01.jpg",
    detailImages: [
      "public/archive/exhibition/spring-gallery/DSC08123-opq3609174340.jpg",
      "public/archive/exhibition/spring-gallery/DSC08124-opq3609174347.jpg",
      "public/archive/exhibition/spring-gallery/DSC08131-opq3609174210.jpg",
      "public/archive/exhibition/spring-gallery/DSC08132-opq3609174101.jpg",
      "public/archive/exhibition/spring-gallery/DSC08134-opq3609174087.jpg",
      "public/archive/exhibition/spring-gallery/DSC08138-opq3609154415.jpg",
      "public/archive/exhibition/spring-gallery/DSC08145-opq3609212803.jpg",
      "public/archive/exhibition/spring-gallery/DSC08146-opq3609193073.jpg",
      "public/archive/exhibition/spring-gallery/DSC08157-opq3609192988.jpg",
      "public/archive/exhibition/spring-gallery/DSC08161-opq3609212514.jpg",
      "public/archive/exhibition/spring-gallery/DSC08162-opq3609212450.jpg",
      "public/archive/exhibition/spring-gallery/DSC08176-opq3609192307.jpg",
      "public/archive/exhibition/spring-gallery/DSC08177-opq3609212079.jpg",
      "public/archive/exhibition/spring-gallery/DSC08179-opq3609172796.jpg",
      "public/archive/exhibition/spring-gallery/DSC08183-opq3609153260.jpg",
      "public/archive/exhibition/spring-gallery/DSC08186-opq3609153203.jpg",
      "public/archive/exhibition/spring-gallery/DSC08190-opq3609153099.jpg",
      "public/archive/exhibition/spring-gallery/DSC08196-opq3609191286.jpg",
      "public/archive/exhibition/spring-gallery/DSC08231-opq3609151673.jpg",
      "public/archive/exhibition/spring-gallery/DSC08278-opq3609383724.jpg",
      "public/archive/exhibition/spring-gallery/DSC08281-opq3609442145.jpg",
      "public/archive/exhibition/spring-gallery/DSC08539-opq3609402093.jpg",
      "public/archive/exhibition/spring-gallery/IMG_0200-opq3610145952.jpg",
      "public/archive/exhibition/spring-gallery/IMG_0206-opq3610165641.jpg",
      "public/archive/exhibition/spring-gallery/IMG_0208-opq3610126202.jpg",
      "public/archive/exhibition/spring-gallery/IMG_0210-opq3610165567.jpg",
      "public/archive/exhibition/spring-gallery/IMG_0218-opq3610145641.jpg",
      "public/archive/exhibition/spring-gallery/IMG_0226-opq3610145418.jpg",
      "public/archive/exhibition/spring-gallery/IMG_0227-opq3610125850.jpg",
      "public/archive/exhibition/spring-gallery/IMG_0229-opq3610106400.jpg",
      "public/archive/exhibition/spring-gallery/IMG_0245-opq3610136285.jpg",
      "public/archive/exhibition/spring-gallery/IMG_0251-opq3610155894.jpg",
      "public/archive/exhibition/spring-gallery/IMG_0252-opq3610155873.jpg",
      "public/archive/exhibition/spring-gallery/IMG_0256-opq3610116748.jpg",
      "public/archive/exhibition/spring-gallery/IMG_0258-opq3610155760.jpg",
    ],
    description: "Exhibition image archive for Spring Art Museum.",
    featured: true,
  },
];

const archiveCategories = ["ALL", "LOGO", "IP IMAGE", "PROMOTIONAL MATERIALS", "TYPOGRAPHY", "WAYFINDING", "EXHIBITION"];
const archiveCategoryLabelsEn = {
  "PROMOTIONAL MATERIALS": "PROMOTION",
};
const archiveCategoryLabelsCn = {
  ALL: "\u5168\u90e8",
  LOGO: "\u6807\u5fd7",
  "IP IMAGE": "IP\u5f62\u8c61",
  "PROMOTIONAL MATERIALS": "\u5ba3\u4f20\u7269\u6599",
  TYPOGRAPHY: "\u6392\u7248",
  WAYFINDING: "\u5bfc\u89c6",
  EXHIBITION: "\u5c55\u89c8",
};

const archiveSectionCopy = {
  "IP IMAGE": {
    title: "IP Image",
    en: "Character images and visual extensions for narrative brand communication.",
    cn: "\u56f4\u7ed5\u89d2\u8272\u5f62\u8c61\u4e0e\u89c6\u89c9\u5ef6\u5c55\u6784\u5efa\u7684\u54c1\u724c\u53d9\u4e8b\u8868\u8fbe\u3002",
  },
  "PROMOTIONAL MATERIALS": {
    title: "Promotion",
    en: "Posters, campaign materials and spatial graphics for public communication.",
    cn: "\u7528\u4e8e\u6d3b\u52a8\u4f20\u64ad\u3001\u5546\u4e1a\u63a8\u5e7f\u4e0e\u516c\u5171\u7a7a\u95f4\u6c9f\u901a\u7684\u5ba3\u4f20\u7269\u6599\u3002",
  },
  TYPOGRAPHY: {
    title: "Typography",
    en: "Editorial layouts, brochures and typographic systems across print and digital media.",
    cn: "\u6db5\u76d6\u753b\u518c\u3001\u7248\u5f0f\u7cfb\u7edf\u4e0e\u56fe\u6587\u4fe1\u606f\u7ec4\u7ec7\u7684\u6392\u7248\u8bbe\u8ba1\u3002",
  },
  WAYFINDING: {
    title: "Wayfinding",
    en: "Signage systems and spatial information design for clear navigation.",
    cn: "\u9762\u5411\u7a7a\u95f4\u8bc6\u522b\u3001\u8def\u5f84\u5f15\u5bfc\u4e0e\u4fe1\u606f\u4f20\u8fbe\u7684\u5bfc\u89c6\u7cfb\u7edf\u8bbe\u8ba1\u3002",
  },
  EXHIBITION: {
    title: "Exhibition",
    en: "Exhibition visuals and image systems shaped for cultural display contexts.",
    cn: "\u9762\u5411\u5c55\u89c8\u73b0\u573a\u4e0e\u6587\u5316\u5c55\u793a\u573a\u666f\u7684\u89c6\u89c9\u7cfb\u7edf\u3002",
  },
};

const logoArchive = [
  {
    id: "bl",
    name: "BL",
    nameCn: "BL",
    type: "Brand Mark",
    year: "2026",
    src: "public/archive/logos/bl.svg",
    category: "Brand Marks",
  },
  {
    id: "link",
    name: "LINK",
    nameCn: "LINK",
    type: "Brand Mark",
    year: "2026",
    src: "public/archive/logos/LINK.svg",
    category: "Brand Marks",
  },
  {
    id: "mg",
    name: "MG",
    nameCn: "MG",
    type: "Brand Mark",
    year: "2026",
    src: "public/archive/logos/MG.svg",
    category: "Brand Marks",
  },
  {
    id: "much",
    name: "MUCH",
    nameCn: "MUCH",
    type: "Brand Mark",
    year: "2026",
    src: "public/archive/logos/MUCH.svg",
    category: "Brand Marks",
  },
  {
    id: "sanya",
    name: "SANYA",
    nameCn: "三亚",
    type: "City Branding",
    year: "2026",
    src: "public/archive/logos/SANYA.svg",
    category: "Cultural Symbols",
  },
  {
    id: "wenxu",
    name: "WENXU",
    nameCn: "闻绪",
    type: "Brand Mark",
    year: "2026",
    src: "public/archive/logos/WENXU.svg",
    category: "Brand Marks",
  },
  {
    id: "yj",
    name: "YJ",
    nameCn: "YJ",
    type: "Brand Mark",
    year: "2026",
    src: "public/archive/logos/YJ.svg",
    category: "Brand Marks",
  },
  {
    id: "bamushangshang",
    name: "Bamu Shangshang",
    nameCn: "八目尚赏",
    type: "Brand Mark",
    year: "2026",
    src: "public/archive/logos/八目尚赏.svg",
    category: "Brand Marks",
  },
  {
    id: "gonglu",
    name: "Road",
    nameCn: "公路",
    type: "Cultural Symbol",
    year: "2026",
    src: "public/archive/logos/公路.svg",
    category: "Cultural Symbols",
  },
  {
    id: "wujiayoutuan",
    name: "Wujiayoutuan",
    nameCn: "吾家优团",
    type: "Brand Mark",
    year: "2026",
    src: "public/archive/logos/吾家优团.svg",
    category: "Brand Marks",
  },
  {
    id: "xile",
    name: "Xile",
    nameCn: "喜乐",
    type: "Brand Mark",
    year: "2026",
    src: "public/archive/logos/喜乐.svg",
    category: "Brand Marks",
  },
  {
    id: "dalishen",
    name: "Dalishen",
    nameCn: "大力神",
    type: "Brand Mark",
    year: "2026",
    src: "public/archive/logos/大力神.svg",
    category: "Brand Marks",
  },
  {
    id: "xingfu-noodle-house",
    name: "Xingfu Noodle House",
    nameCn: "幸福面馆",
    type: "Restaurant Identity",
    year: "2026",
    src: "public/archive/logos/幸福面馆.svg",
    category: "Brand Marks",
  },
  {
    id: "zuoan-coffee",
    name: "Zuoan Coffee",
    nameCn: "\u5de6\u5cb8\u5496\u5561",
    type: "Coffee Brand",
    year: "2026",
    src: "public/archive/logos/\u5de6\u5cb8\u5496\u5561.svg",
    category: "Brand Marks",
  },
  {
    id: "cicheng-rice-cake",
    name: "Cicheng Rice Cake",
    nameCn: "慈城年糕",
    type: "Regional Mark",
    year: "2025",
    src: "public/archive/logos/慈城年糕.svg",
    category: "Cultural Symbols",
  },
  {
    id: "songyang",
    name: "Songyang",
    nameCn: "松阳",
    type: "Cultural Symbol",
    year: "2025",
    src: "public/archive/logos/松阳.svg",
    category: "Cultural Symbols",
  },
  {
    id: "mengjian",
    name: "Mengjian",
    nameCn: "梦剪",
    type: "Brand Mark",
    year: "2025",
    src: "public/archive/logos/梦剪.svg",
    category: "Brand Marks",
  },
  {
    id: "menghuayuan",
    name: "Menghuayuan",
    nameCn: "梦花源",
    type: "Brand Mark",
    year: "2025",
    src: "public/archive/logos/梦花源.svg",
    category: "Brand Marks",
  },
  {
    id: "wuhan",
    name: "Wuhan",
    nameCn: "武汉",
    type: "City Symbol",
    year: "2025",
    src: "public/archive/logos/武汉.svg",
    category: "Cultural Symbols",
  },
  {
    id: "zhe",
    name: "Zhe",
    nameCn: "浙",
    type: "Experimental Mark",
    year: "2024",
    src: "public/archive/logos/浙.svg",
    category: "Experimental Marks",
  },
  {
    id: "hu",
    name: "Hu",
    nameCn: "湖",
    type: "Experimental Mark",
    year: "2024",
    src: "public/archive/logos/湖.svg",
    category: "Experimental Marks",
  },
  {
    id: "yong",
    name: "Yong",
    nameCn: "甬",
    type: "Experimental Mark",
    year: "2024",
    src: "public/archive/logos/甬.svg",
    category: "Experimental Marks",
  },
  {
    id: "xunsheng",
    name: "Xunsheng",
    nameCn: "讯昇",
    type: "Corporate Identity",
    year: "2026",
    src: "public/archive/logos/讯昇_画板 1.svg",
    category: "Brand Marks",
  },
  {
    id: "yangtze-railway",
    name: "Yangtze Railway",
    nameCn: "长三角铁路",
    type: "Cultural Symbol",
    year: "2024",
    src: "public/archive/logos/长三角铁路.svg",
    category: "Cultural Symbols",
  },
  {
    id: "lijingji",
    name: "Lijingji",
    nameCn: "黎锦纪",
    type: "Cultural Symbol",
    year: "2024",
    src: "public/archive/logos/黎锦纪.svg",
    category: "Cultural Symbols",
  },
];

const LOGO_MODAL_TRANSITION_MS = 380;
const LOGO_DETAIL_MODAL_TRANSITION_MS = 340;
let logoModalCloseTimer = null;
let logoDetailModalCloseTimer = null;
let archiveItemModalCloseTimer = null;

const logoArchiveEnhancements = {
  bl: { nameCn: "BL", description: "A compact identity mark designed for crisp brand recognition.", tags: ["Brand", "Mark", "Identity"], size: "large", rotate: -4, row: 1 },
  link: { nameCn: "LINK", description: "A letter-based identity mark exploring connection and rhythm.", tags: ["Lettering", "Brand", "Link"], size: "wide", rotate: 3, row: 2 },
  mg: { nameCn: "MG", description: "A soft geometric monogram for a contemporary visual system.", tags: ["Monogram", "Graphic", "Identity"], size: "large", rotate: -2, row: 0 },
  much: { nameCn: "MUCH", description: "A concise symbol study built around modular form and movement.", tags: ["Symbol", "Modular", "Mark"], size: "large", rotate: 5, row: 3 },
  sanya: { nameCn: "\u4e09\u4e9a", description: "A city identity mark inspired by tropical culture and emotional destination branding.", tags: ["City", "Culture", "Identity"], size: "large", rotate: -1, row: 1 },
  wenxu: { nameCn: "\u95fb\u7eea", description: "A healing fragrance mark exploring scent, emotion and quiet rituals.", tags: ["Fragrance", "Ritual", "Identity"], size: "large", rotate: 2, row: 2 },
  yj: { nameCn: "YJ", description: "An experimental monogram with a direct black and white graphic presence.", tags: ["Monogram", "Study", "Identity"], size: "medium", rotate: 4, row: 3 },
  bamushangshang: { nameCn: "\u516b\u76ee\u5c1a\u8d4f", description: "A brand mark exploring cultural texture and visual memorability.", tags: ["Brand", "Culture", "Symbol"], size: "hero", rotate: -3, row: 2 },
  gonglu: { nameCn: "\u516c\u8def", description: "A cultural symbol study shaped by route, direction and regional memory.", tags: ["Culture", "Route", "Symbol"], size: "tall", rotate: 5, row: 1 },
  wujiayoutuan: { nameCn: "\u543e\u5bb6\u4f18\u56e2", description: "A friendly brand mark with a clear commercial communication tone.", tags: ["Brand", "Service", "Identity"], size: "wide", rotate: -2, row: 0 },
  xile: { nameCn: "\u559c\u4e50", description: "A warm identity mark built around everyday joy and approachable form.", tags: ["Brand", "Warmth", "Mark"], size: "medium", rotate: 1, row: 3 },
  dalishen: { nameCn: "\u5927\u529b\u795e", description: "A bold mark study with a strong silhouette and direct recognition.", tags: ["Bold", "Symbol", "Identity"], size: "medium", rotate: -6, row: 2 },
  "zuoan-coffee": { nameCn: "\u5de6\u5cb8\u5496\u5561", description: "A coffee brand mark built around aroma, leisure and everyday rituals.", tags: ["Coffee", "Brand", "Identity"], size: "medium", rotate: -2, row: 1 },
  "xingfu-noodle-house": { nameCn: "\u5e78\u798f\u9762\u9986", description: "A restaurant identity mark around warmth, local memory and daily dining.", tags: ["Restaurant", "Local", "Warmth"], size: "large", rotate: 3, row: 1 },
  "cicheng-rice-cake": { nameCn: "\u6148\u57ce\u5e74\u7cd5", description: "A regional food identity mark rooted in local cultural recognition.", tags: ["Regional", "Food", "Culture"], size: "medium", rotate: -4, row: 0 },
  songyang: { nameCn: "\u677e\u9633", description: "A cultural symbol study for regional image and place-based storytelling.", tags: ["Place", "Culture", "Symbol"], size: "medium", rotate: 4, row: 3 },
  mengjian: { nameCn: "\u68a6\u526a", description: "A visual mark exploring craft, memory and graphic contrast.", tags: ["Craft", "Mark", "Study"], size: "tall", rotate: 2, row: 1 },
  menghuayuan: { nameCn: "\u68a6\u82b1\u6e90", description: "A brand symbol combining softness, narrative and visual atmosphere.", tags: ["Brand", "Narrative", "Symbol"], size: "medium", rotate: -1, row: 2 },
  wuhan: { nameCn: "\u6b66\u6c49", description: "A city symbol study focused on urban identity and graphic memory.", tags: ["City", "Symbol", "Culture"], size: "medium", rotate: 6, row: 0 },
  zhe: { nameCn: "\u6d59", description: "An experimental character mark exploring regional abbreviation and form.", tags: ["Character", "Experiment", "Mark"], size: "large", rotate: -2, row: 3 },
  hu: { nameCn: "\u6e56", description: "An experimental character mark balancing typography and symbol design.", tags: ["Character", "Typography", "Study"], size: "large", rotate: 3, row: 1 },
  yong: { nameCn: "\u752c", description: "A regional character mark shaped for compact identity usage.", tags: ["Regional", "Character", "Mark"], size: "medium", rotate: -5, row: 2 },
  xunsheng: { nameCn: "\u8baf\u6607", description: "A corporate mark focused on technology, clarity and professional communication.", tags: ["Corporate", "Technology", "Identity"], size: "medium", rotate: 1, row: 0 },
  "yangtze-railway": { nameCn: "\u957f\u4e09\u89d2\u94c1\u8def", description: "A transportation symbol study about connection, region and movement.", tags: ["Transport", "Region", "Symbol"], size: "wide", rotate: -3, row: 3 },
  lijingji: { nameCn: "\u9ece\u9526\u7eaa", description: "A cultural mark inspired by heritage, pattern and visual identity.", tags: ["Heritage", "Pattern", "Culture"], size: "medium", rotate: 5, row: 1 },
};

logoArchive.forEach((logo, index) => {
  Object.assign(
    logo,
    {
      description: "A visual identity mark from the ongoing Logo Archive.",
      tags: ["Identity", "Mark", "Archive"],
      size: ["medium", "small", "large"][index % 3],
      rotate: [-4, 3, -1, 5, -3, 2][index % 6],
      row: index % 4,
    },
    logoArchiveEnhancements[logo.id] || {}
  );
});

const logoDetailAssets = {
  link: {
    logo: "public/archive/logo2/LINK/LINK.jpg",
    images: Array.from({ length: 8 }, (_, index) => `public/archive/logo2/LINK/${String(index + 1).padStart(2, "0")}.jpg`),
  },
  wenxu: {
    workId: "wenxu",
  },
  sanya: {
    workId: "sanya",
  },
  mg: {
    logo: "public/archive/logo2/MG/MG.jpg",
    images: Array.from({ length: 4 }, (_, index) => `public/archive/logo2/MG/\u753b\u677f ${index + 1}.jpg`),
  },
  much: {
    logo: "public/archive/logo2/MUCH/MUCH.jpg",
    images: ["public/archive/logo2/MUCH/01.jpg"],
  },
  bamushangshang: {
    logo: "public/archive/logo2/\u516b\u76ee\u5c1a\u8d4f/\u516b\u76ee\u5c1a\u8d4f.jpg",
    images: Array.from({ length: 5 }, (_, index) => `public/archive/logo2/\u516b\u76ee\u5c1a\u8d4f/${String(index + 1).padStart(2, "0")}.jpg`),
  },
  gonglu: {
    logo: "public/archive/logo2/\u516c\u8def/\u516c\u8def.jpg",
    images: Array.from({ length: 16 }, (_, index) => `public/archive/logo2/\u516c\u8def/LOGO\u7b80\u4ecb_${String(index).padStart(2, "0")}.jpg`),
  },
  wujiayoutuan: {
    logo: "public/archive/logo2/WJYT.jpg",
    images: [],
  },
  dalishen: {
    logo: "public/archive/logo2/\u5927\u529b\u795e/\u5927\u529b\u795e.jpg",
    images: Array.from({ length: 8 }, (_, index) => `public/archive/logo2/\u5927\u529b\u795e/${String(index + 1).padStart(2, "0")}.jpg`),
  },
  "zuoan-coffee": {
    logo: "public/archive/logo2/\u5de6\u5cb8\u5496\u5561.jpg",
    workId: "zuoan-coffee",
    images: [],
  },
  "xingfu-noodle-house": {
    workId: "xingfu-noodle-house",
  },
  menghuayuan: {
    logo: "public/archive/logo2/\u68a6\u82b1\u6e90.jpg",
    images: [],
  },
  wuhan: {
    logo: "public/archive/logo2/\u6b66\u6c49/\u6b66\u6c49.jpg",
    images: Array.from({ length: 4 }, (_, index) => `public/archive/logo2/\u6b66\u6c49/${String(index + 1).padStart(2, "0")}.jpg`),
  },
  zhe: {
    logo: "public/archive/logo2/\u6d59/\u6d59.jpg",
    images: Array.from({ length: 2 }, (_, index) => `public/archive/logo2/\u6d59/${String(index + 1).padStart(2, "0")}.jpg`),
  },
  yong: {
    logo: "public/archive/logo2/\u752c/\u752c.jpg",
    images: Array.from({ length: 8 }, (_, index) => `public/archive/logo2/\u752c/${String(index + 1).padStart(2, "0")}.jpg`),
  },
  xunsheng: {
    workId: "xunsheng",
  },
  "yangtze-railway": {
    logo: "public/archive/logo2/\u957f\u4e09\u89d2\u94c1\u8def/\u957f\u4e09\u89d2\u94c1\u8def.jpg",
    images: Array.from({ length: 17 }, (_, index) => `public/archive/logo2/\u957f\u4e09\u89d2\u94c1\u8def/${String(index + 1).padStart(2, "0")}.jpg`),
  },
  lijingji: {
    images: Array.from({ length: 4 }, (_, index) => `public/archive/logo2/\u9ece\u9526\u7eaa/\u5c55\u677f${String(index + 1).padStart(2, "0")}.jpg`),
  },
};

logoArchive.sort((a, b) => {
  const assetA = logoDetailAssets[a.id];
  const assetB = logoDetailAssets[b.id];
  const scoreA = assetA?.images?.length ? 0 : assetA?.logo ? 1 : 2;
  const scoreB = assetB?.images?.length ? 0 : assetB?.logo ? 1 : 2;
  return scoreA - scoreB;
});

function setTones(element, tones) {
  element.style.setProperty("--tone-a", tones[0]);
  element.style.setProperty("--tone-b", tones[1]);
  element.style.setProperty("--tone-c", tones[2]);
}

function renderWorks() {
  const grid = document.querySelector("#worksGrid");
  grid.innerHTML = "";
  grid.classList.add("is-interface-wall");

  selectedWorks.forEach((project, index) => {
    const card = document.createElement("button");
    card.className = "work-card";
    card.type = "button";
    card.setAttribute("aria-label", `${project.title} brand identity project`);
    card.dataset.projectId = project.id;
    card.dataset.stackIndex = String(index);

    const visual = document.createElement("div");
    visual.className = `work-visual work-cover work-cover--${project.id}`;
    visual.innerHTML = `
      <img src="${project.cover}" alt="${project.title} cover" loading="lazy" onerror="this.parentElement.classList.add('is-missing'); this.remove();" />
      <div class="work-cover-placeholder">
        <strong>${project.title}</strong>
        <em>${project.titleCn}</em>
      </div>
    `;

    card.innerHTML = `
      <div class="work-info">
        <div>
          <h3>${project.title}</h3>
          <strong class="work-title-cn">${project.titleCn}</strong>
          <p>${project.category}</p>
          <div class="work-tags">${project.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
        </div>
        <span class="work-year">${project.year}</span>
      </div>
    `;
    card.prepend(visual);
    card.addEventListener("click", (event) => {
      event.stopPropagation();
      if (worksMobileQuery.matches) {
        activeWorkIndex = null;
        positionWorksCards();
        openWorkModal(project.id);
        return;
      }
      if (activeWorkIndex !== index) {
        activeWorkIndex = index;
        positionWorksCards();
        return;
      }
      openWorkModal(project.id);
    });
    grid.appendChild(card);
  });

  if (selectedWorks.length % 2 === 1) {
    const moreCard = document.createElement("div");
    moreCard.className = "work-more-card";
    moreCard.setAttribute("aria-hidden", "true");
    moreCard.dataset.stackIndex = String(selectedWorks.length);
    moreCard.textContent = "more...";
    grid.appendChild(moreCard);
  }

  window.requestAnimationFrame(positionWorksCards);
}

function getWorksStackItems() {
  return Array.from(document.querySelectorAll("#worksGrid .work-card, #worksGrid .work-more-card"));
}

function positionWorksCards() {
  const grid = document.querySelector("#worksGrid");
  const items = getWorksStackItems();
  if (!grid || !items.length) return;

  const gridWidth = grid.clientWidth;
  const isMobile = worksMobileQuery.matches;
  if (isMobile && activeWorkIndex !== null) {
    activeWorkIndex = null;
  }
  const hasSelection = activeWorkIndex !== null;
  const gap = Math.min(24, Math.max(12, gridWidth * 0.018));
  const cardWidth = isMobile ? gridWidth : Math.min(310, Math.max(228, gridWidth * 0.25));
  const cardHeight = cardWidth * 210 / 297;
  const focusWidth = Math.min(430, Math.max(320, gridWidth * 0.42));
  const focusHeight = focusWidth * 210 / 297;
  const thumbWidth = Math.min(148, Math.max(100, gridWidth * 0.13));
  const thumbHeight = thumbWidth * 210 / 297;
  const desktopHeight = Math.max(
    focusHeight + thumbHeight * 1.18,
    cardHeight * 1.72,
    Math.min(Math.max(gridWidth * 0.46, 470), 600)
  );
  const gridHeight = isMobile ? items.length * cardHeight + (items.length - 1) * gap : desktopHeight;
  const fan = [
    { row: 1, r: -8 },
    { row: 0, r: -4 },
    { row: 1, r: 1 },
    { row: 0, r: 4 },
    { row: 1, r: -2 },
    { row: 0, r: 8 },
  ];

  grid.style.setProperty("--works-grid-h", `${gridHeight}px`);
  grid.classList.toggle("has-active-work", hasSelection);

  items.forEach((item, index) => {
    const slot = fan[index] || fan[fan.length - 1];
    const baseWidth = cardWidth;
    const baseHeight = cardHeight;
    let x = 0;
    let y = index * (cardHeight + gap);
    let rotate = 0;
    let scale = 1;
    let visualWidth = baseWidth;
    let visualHeight = baseHeight;

    if (!isMobile && hasSelection) {
      const isActive = index === activeWorkIndex;
      visualWidth = isActive ? focusWidth : thumbWidth;
      visualHeight = visualWidth * 210 / 297;
      scale = visualWidth / baseWidth;
      const activeX = (gridWidth - visualWidth) / 2;
      const activeY = Math.max(12, gridHeight * 0.08);
      const thumbStep = thumbWidth * 0.56;
      const thumbBandWidth = thumbWidth + thumbStep * (items.length - 1);
      const thumbOrigin = (gridWidth - thumbBandWidth) / 2;

      const targetX = isActive ? activeX : thumbOrigin + index * thumbStep;
      const targetY = isActive ? activeY : activeY + focusHeight * 0.86;
      x = targetX - (baseWidth - visualWidth) / 2;
      y = targetY - (baseHeight - visualHeight) / 2;
      rotate = isActive ? slot.r * 0.25 : slot.r;
    } else if (!isMobile) {
      const fanStep = cardWidth * 0.68;
      const fanWidth = cardWidth + fanStep * (items.length - 1);
      const originX = (gridWidth - fanWidth) / 2;
      x = originX + index * fanStep;
      y = (gridHeight - cardHeight) * 0.54 + (slot.row === 0 ? -cardHeight * 0.16 : cardHeight * 0.16);
      rotate = slot.r;
    }

    item.classList.toggle("is-active-work", hasSelection && index === activeWorkIndex);
    item.style.setProperty("--work-card-w", `${baseWidth}px`);
    item.style.setProperty("--work-x", `${Math.min(gridWidth - visualWidth, Math.max(0, x))}px`);
    item.style.setProperty("--work-y", `${Math.min(gridHeight - visualHeight, Math.max(0, y))}px`);
    item.style.setProperty("--work-scale", String(scale));
    item.style.setProperty("--work-rotate", isMobile ? "0deg" : `${rotate}deg`);
    item.style.setProperty("--stack-z", String(items.length - index));
    item.style.setProperty("--work-wave-delay", `${index * 140}ms`);
  });
}

function initWorksStackInteractions() {
  window.addEventListener("resize", () => {
    positionWorksCards();
  });

  document.addEventListener("click", (event) => {
    if (activeWorkIndex === null) return;
    if (event.target.closest(".work-card")) return;
    if (event.target.closest(".work-modal")) return;

    activeWorkIndex = null;
    positionWorksCards();
  });
}
function createWorkModal() {
  const modal = document.createElement("div");
  modal.className = "work-modal";
  modal.id = "workModal";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="work-modal__overlay" data-modal-close></div>
    <button class="work-modal__close" type="button" data-modal-close aria-label="Close project">×</button>
    <button class="work-modal__top" type="button" data-modal-top aria-label="Back to top">↑</button>
    <section class="work-modal__panel" role="dialog" aria-modal="true" aria-labelledby="workModalTitle">
      <div class="work-modal__body" id="workModalBody"></div>
    </section>
  `;
  document.body.appendChild(modal);
}

function workImage(src, alt, className = "work-modal__image") {
  return `
    <figure class="${className}">
      <img src="${src}" alt="${alt}" loading="lazy" onerror="this.parentElement.classList.add('is-missing'); this.remove();" />
      <figcaption>${alt}</figcaption>
    </figure>
  `;
}

function renderWorkModal(project) {
  const body = document.querySelector("#workModalBody");
  body.innerHTML = `
    <header class="work-modal__hero">
      <div>
        <p class="work-modal__kicker">${project.category}</p>
        <h2 id="workModalTitle">${project.title}</h2>
        <p class="work-modal__title-cn">${project.titleCn}</p>
      </div>
      <div class="work-modal__meta">
        <span>${project.year}</span>
        <span>${project.tags.join(" / ")}</span>
      </div>
      <p class="work-modal__description">${project.description}</p>
      <p class="work-modal__description-cn">${project.descriptionCn}</p>
    </header>

    <section class="work-modal__manual" aria-label="${project.title} full visual identity images">
      ${project.manualImages.map((src, index) => workImage(src, `${project.title} image ${index + 1}`)).join("")}
    </section>
  `;
}

function openWorkModal(projectId) {
  const project = selectedWorks.find((item) => item.id === projectId);
  const modal = document.querySelector("#workModal");
  const modalBody = document.querySelector("#workModalBody");
  if (!project || !modal) return;

  if (workModalCloseTimer) {
    window.clearTimeout(workModalCloseTimer);
    workModalCloseTimer = null;
  }

  renderWorkModal(project);
  if (modalBody) modalBody.scrollTop = 0;
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-modal-open");
  window.requestAnimationFrame(() => modal.classList.add("is-open"));
}

function closeWorkModal() {
  const modal = document.querySelector("#workModal");
  if (!modal || !modal.classList.contains("is-open")) return;

  modal.classList.remove("is-open");
  workModalCloseTimer = window.setTimeout(() => {
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-modal-open");
    workModalCloseTimer = null;
  }, WORK_MODAL_TRANSITION_MS);
}

function initWorkModal() {
  createWorkModal();

  document.addEventListener("click", (event) => {
    if (event.target.matches("[data-modal-close]")) closeWorkModal();
    if (event.target.matches("[data-modal-top]")) {
      document.querySelector("#workModalBody")?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeWorkModal();
  });
}

function renderLab() {
  const list = document.querySelector("#labList");
  list.innerHTML = "";

  vibecodingProjects.forEach((project) => {
    const item = document.createElement("a");
    item.className = "lab-item";
    item.href = project.link;
    if (project.link && project.link.startsWith("http")) {
      item.target = "_blank";
      item.rel = "noopener noreferrer";
    }
    item.setAttribute("aria-label", `${project.title} lab project`);
    item.innerHTML = `
      <div class="lab-card-info">
        <div class="lab-card-title">
          <span class="lab-logo-slot">
            ${project.logo ? `<img src="${project.logo}" alt="${project.title} logo" loading="lazy" />` : ""}
          </span>
          <div>
            <h3>${project.title}</h3>
            <p>${project.type}</p>
          </div>
        </div>
        <span class="lab-status">${project.status}</span>
        <span class="lab-type">${project.introCn}</span>
      </div>
      <div class="lab-product-visual lab-product-visual--${project.id}">
        ${
          project.visual
            ? `<img src="${project.visual}" alt="${project.title} product visual" loading="lazy" />`
            : `<div class="central-axis-visual" aria-hidden="true">
                <span></span><span></span><span></span><span></span>
                <strong>Central Axis H5</strong>
              </div>`
        }
      </div>
    `;
    list.appendChild(item);
  });
}

function renderArchiveFilter() {
  const filter = document.querySelector("#archiveFilter");
  filter.innerHTML = "";

  archiveCategories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.cn = archiveCategoryLabelsCn[category] || category;
    button.innerHTML = `<span>${archiveCategoryLabelsEn[category] || category}</span>`;
    button.className = category === "ALL" ? "is-active" : "";
    button.addEventListener("click", () => {
      document.querySelectorAll(".archive-filter button").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      renderArchive(category);
    });
    filter.appendChild(button);
  });
}

function createArchiveSectionHeading(type) {
  const copy = archiveSectionCopy[type] || {
    title: archiveCategoryLabelsEn[type] || type,
    en: "A selected archive of visual studies and design explorations.",
    cn: "\u7cbe\u9009\u89c6\u89c9\u7814\u7a76\u4e0e\u8bbe\u8ba1\u63a2\u7d22\u6863\u6848\u3002",
  };
  const heading = document.createElement("header");
  heading.className = "archive-section-heading";
  heading.innerHTML = `
    <h3>${copy.title}</h3>
    <p>${copy.en}</p>
    <p class="cn-copy">${copy.cn}</p>
  `;
  return heading;
}

function renderArchive(activeCategory = "ALL") {
  const wall = document.querySelector("#logoWall");
  const logoFeature = document.querySelector(".logo-archive-feature");
  const viewAllLogos = document.querySelector("#viewAllLogos");
  const masonry = document.querySelector("#archiveMasonry");
  const showLogos = activeCategory === "ALL" || activeCategory === "LOGO";
  const filteredItems =
    activeCategory === "ALL" ? archiveItems : archiveItems.filter((item) => item.type === activeCategory);

  wall.innerHTML = "";
  masonry.innerHTML = "";
  logoFeature.hidden = !showLogos;
  viewAllLogos.hidden = !showLogos;

  if (showLogos) renderLogoWall(wall);

  const makeArchiveTile = (item) => {
    const tile = document.createElement("button");
    const tileClasses = ["archive-tile"];
    if (item.layout) tileClasses.push(`archive-tile--${item.layout}`);
    if (item.featured) tileClasses.push("archive-tile--full");
    tile.className = tileClasses.join(" ");
    tile.type = "button";
    tile.dataset.archiveIndex = String(archiveItems.indexOf(item));
    tile.setAttribute("aria-label", `${item.title} archive image`);
    tile.innerHTML = `<img src="${item.image}?v=20260714-other-design" alt="${item.title}" loading="lazy" />`;
    tile.addEventListener("click", () => openArchiveItemModal(Number(tile.dataset.archiveIndex)));
    return tile;
  };

  const renderArchiveGroup = (type, items) => {
    if (!items.length) return;
    const group = document.createElement("section");
    group.className = "archive-group";
    const heading = createArchiveSectionHeading(type);
    const grid = document.createElement("div");
    grid.className = `archive-group__grid archive-group__grid--${type.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

    if (type === "PROMOTIONAL MATERIALS") {
      const rows = document.createElement("div");
      rows.className = "archive-promo-rows";
      [
        [items[0], items[1]],
        [items[2], items[3]],
      ].forEach((rowItems) => {
        const row = document.createElement("div");
        row.className = "archive-promo-row";
        rowItems.filter(Boolean).forEach((item) => row.appendChild(makeArchiveTile(item)));
        rows.appendChild(row);
      });
      grid.appendChild(rows);
      if (items[4]) grid.appendChild(makeArchiveTile(items[4]));
    } else {
      items.forEach((item) => grid.appendChild(makeArchiveTile(item)));
    }

    group.append(heading, grid);
    masonry.appendChild(group);
  };

  if (activeCategory === "ALL") {
    archiveCategories
      .filter((category) => category !== "ALL" && category !== "LOGO")
      .forEach((category) => renderArchiveGroup(category, archiveItems.filter((item) => item.type === category)));
  } else {
    renderArchiveGroup(activeCategory, filteredItems);
  }

  bindArchivePromoRowImages();
  updateArchivePromoRows();
  observeRevealItems();
}

function updateArchivePromoRows() {
  const rows = document.querySelectorAll(".archive-promo-row");
  rows.forEach((row) => {
    if (window.matchMedia("(max-width: 760px)").matches) {
      row.style.removeProperty("--archive-promo-image-height");
      return;
    }

    const images = Array.from(row.querySelectorAll("img"));
    if (images.length < 2) return;

    const ratios = images.map((image) => {
      if (!image.naturalWidth || !image.naturalHeight) return 1;
      return image.naturalWidth / image.naturalHeight;
    });
    const ratioTotal = ratios.reduce((sum, ratio) => sum + ratio, 0);
    if (!ratioTotal) return;

    const styles = window.getComputedStyle(row);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
    const availableWidth = row.clientWidth - gap * (images.length - 1);
    const rowHeight = Math.max(120, availableWidth / ratioTotal);
    row.style.setProperty("--archive-promo-image-height", `${rowHeight}px`);
  });
}

function bindArchivePromoRowImages() {
  document.querySelectorAll(".archive-promo-row img").forEach((image) => {
    if (!image.complete) {
      image.addEventListener("load", updateArchivePromoRows, { once: true });
    }
  });
  window.requestAnimationFrame(updateArchivePromoRows);
}

function logoSizeToPx(size, compact = false) {
  const desktopSizes = {
    small: 82,
    medium: 105,
    large: 132,
    wide: 150,
    tall: 138,
    hero: 190,
  };
  const compactSizes = {
    small: 66,
    medium: 80,
    large: 94,
    wide: 104,
    tall: 92,
    hero: 116,
  };
  return (compact ? compactSizes : desktopSizes)[size] || (compact ? 80 : 105);
}

function logoTrackItem(logo, index, cycleOffset = 0) {
  const item = document.createElement("button");
  const isCompact = window.matchMedia("(max-width: 760px)").matches;
  const rowPositions = isCompact ? [34, 126, 220, 314] : [36, 156, 262, 382];
  const rowPattern = isCompact
    ? [1, 3, 0, 2, 1, 3, 2, 0, 1, 2, 3, 0]
    : [2, 0, 3, 1, 2, 0, 1, 3, 0, 2, 1, 3, 2, 0, 3, 1];
  const spacing = isCompact ? 98 : 166;
  const row = rowPattern[index % rowPattern.length];
  const yOffset = (isCompact ? [0, 8, -6, 5, -8, 6] : [0, 12, -8, 6, -14, 4, 10, -4])[index % (isCompact ? 6 : 8)];
  const xOffset = (isCompact ? [0, 12, 24, 6, 18, 30] : [0, 18, 34, 8, 28, 44, 14, 38])[index % (isCompact ? 6 : 8)];
  const visualSize = logoSizeToPx(logo.size, isCompact);
  const startX = isCompact ? 30 : 48;

  item.type = "button";
  item.className = `logo-drift-item logo-drift-item--${logo.size || "medium"}`;
  item.style.setProperty("--x", `${startX + cycleOffset + index * spacing + xOffset}px`);
  item.style.setProperty("--y", `${(rowPositions[row] || rowPositions[0]) + yOffset}px`);
  item.style.setProperty("--r", `${logo.rotate || 0}deg`);
  item.style.setProperty("--s", `${visualSize}px`);
  item.setAttribute("aria-label", `${logo.name} logo detail`);
  item.innerHTML = `
    <span class="logo-drift-mark">
      <img src="${logo.src}?v=20260713-logo-refresh" alt="${logo.name} logo" loading="lazy" onerror="this.parentElement.classList.add('is-missing'); this.remove();" />
    </span>
    <span class="logo-drift-label">
      <strong>${logo.name}</strong>
      <em>${logo.type} / ${logo.year}</em>
    </span>
  `;
  item.dataset.logoId = logo.id;
  item.addEventListener("click", () => openLogoDetailModal(logo.id));
  return item;
}

function renderLogoWall(wall) {
  const wallLogos = logoArchive;
  const isCompact = window.matchMedia("(max-width: 760px)").matches;
  const logoSpacing = isCompact ? 98 : 166;
  const cycleWidth = wallLogos.length * logoSpacing + (isCompact ? 130 : 220);
  const trackWidth = cycleWidth * 2;
  const inner = document.createElement("div");
  inner.className = "logo-flow";
  inner.style.setProperty("--track-width", `${trackWidth}px`);

  for (let trackIndex = 0; trackIndex < 2; trackIndex += 1) {
    const track = document.createElement("div");
    track.className = "logo-flow__track";
    track.setAttribute("aria-hidden", trackIndex === 1 ? "true" : "false");
    track.style.setProperty("--track-width", `${trackWidth}px`);
    for (let cycleIndex = 0; cycleIndex < 2; cycleIndex += 1) {
      wallLogos.forEach((logo, index) => {
        const item = logoTrackItem(logo, index, cycleIndex * cycleWidth);
        if (trackIndex === 1 || cycleIndex === 1) item.tabIndex = -1;
        track.appendChild(item);
      });
    }
    inner.appendChild(track);
  }

  wall.appendChild(inner);
}

function createLogoCard(logo, extraClass = "") {
  const card = document.createElement("article");
  card.className = `logo-card logo-card--${logo.id} ${extraClass}`.trim();
  card.dataset.name = `${logo.name} / ${logo.type} / ${logo.year}`;
  card.innerHTML = `
    <div class="logo-card__mark">
      <img src="${logo.src}?v=20260713-logo-refresh" alt="${logo.name} logo" loading="lazy" onerror="this.parentElement.classList.add('is-missing'); this.remove();" />
    </div>
    <div class="logo-card__meta">
      <strong>${logo.name}</strong>
      <span>${logo.type}</span>
      <em>${logo.year}</em>
    </div>
  `;
  card.addEventListener("click", () => openLogoDetailModal(logo.id));
  return card;
}

function createLogoModal() {
  const modal = document.createElement("div");
  modal.className = "logo-modal";
  modal.id = "logoModal";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="logo-modal__overlay" data-logo-modal-close></div>
    <button class="logo-modal__close" type="button" data-logo-modal-close aria-label="Close logo archive">×</button>
    <button class="logo-modal__top" type="button" data-logo-modal-top aria-label="Back to top">↑</button>
    <section class="logo-modal__panel" role="dialog" aria-modal="true" aria-labelledby="logoModalTitle">
      <div class="logo-modal__body" id="logoModalBody">
        <header class="logo-modal__header">
          <p class="section-kicker">Logo Archive</p>
          <h2 id="logoModalTitle">Logo Archive</h2>
          <p class="logo-modal__title-cn">标志设计合集</p>
          <p>A collection of identity marks, cultural symbols and visual explorations.</p>
          <p class="logo-modal__copy-cn">收录品牌标志、文化符号与视觉识别探索。</p>
          <div class="logo-modal__categories" aria-label="Logo archive categories">
            <span>All</span>
            <span>Brand Marks</span>
            <span>Cultural Symbols</span>
            <span>Event & Campaign</span>
            <span>Experimental Marks</span>
          </div>
        </header>
        <div class="logo-modal__grid" id="logoModalGrid"></div>
      </div>
    </section>
  `;
  document.body.appendChild(modal);
}

function createLogoDetailModal() {
  const modal = document.createElement("div");
  modal.className = "logo-detail-modal";
  modal.id = "logoDetailModal";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="logo-detail-modal__overlay" data-logo-detail-close></div>
    <button class="logo-detail-modal__close" type="button" data-logo-detail-close aria-label="Close logo detail">×</button>
    <button class="logo-detail-modal__top" type="button" data-logo-detail-top aria-label="Back to top">↑</button>
    <section class="logo-detail-modal__panel" role="dialog" aria-modal="true" aria-labelledby="logoDetailTitle">
      <div class="logo-detail-modal__body" id="logoDetailBody"></div>
    </section>
  `;
  document.body.appendChild(modal);
}

function renderLogoDetail(logo) {
  const body = document.querySelector("#logoDetailBody");
  if (!body) return;
  const detailAssets = logoDetailAssets[logo.id] || {};
  const detailLogo = detailAssets.logo || logo.src;
  const detailImages = detailAssets.images || [];
  const relatedWork = detailAssets.workId ? selectedWorks.find((work) => work.id === detailAssets.workId) : null;

  body.innerHTML = `
    <figure class="logo-detail-mark">
      <img src="${detailLogo}?v=20260713-logo2" alt="${logo.name} logo" loading="lazy" />
    </figure>
    <div class="logo-detail-info">
      <h2 id="logoDetailTitle">${logo.name}</h2>
      <p class="logo-detail-cn">${logo.nameCn || logo.name}</p>
      <dl>
        <div>
          <dt>Type</dt>
          <dd>${logo.type}</dd>
        </div>
        <div>
          <dt>Year</dt>
          <dd>${logo.year}</dd>
        </div>
        <div>
          <dt>Category</dt>
          <dd>${logo.category}</dd>
        </div>
      </dl>
      ${
        relatedWork
          ? `<button class="logo-detail-vis-card" type="button" data-logo-vis-work="${relatedWork.id}">
              <img src="${relatedWork.cover}?v=20260714-vis-cover" alt="${relatedWork.title} VIS cover" loading="lazy" />
              <span>\u70b9\u51fb\u67e5\u770b\u5b8c\u6574VIS</span>
            </button>`
          : ""
      }
      ${
        detailImages.length
          ? `<div class="logo-detail-gallery">
              ${detailImages
                .map(
                  (src, index) => `
                    <figure>
                      <img src="${src}?v=20260713-logo2" alt="${logo.name} design image ${index + 1}" loading="lazy" onerror="this.parentElement.remove();" />
                    </figure>
                  `
                )
                .join("")}
            </div>`
          : ""
      }
    </div>
  `;
}

function openLogoDetailModal(logoId) {
  const logo = logoArchive.find((item) => item.id === logoId);
  const modal = document.querySelector("#logoDetailModal");
  if (!logo || !modal) return;

  if (logoDetailModalCloseTimer) {
    window.clearTimeout(logoDetailModalCloseTimer);
    logoDetailModalCloseTimer = null;
  }

  renderLogoDetail(logo);
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-modal-open");
  window.requestAnimationFrame(() => modal.classList.add("is-open"));
}

function openLogoRelatedWork(workId) {
  closeLogoDetailModal();
  closeLogoModal();
  window.setTimeout(() => openWorkModal(workId), LOGO_DETAIL_MODAL_TRANSITION_MS);
}

function closeLogoDetailModal() {
  const modal = document.querySelector("#logoDetailModal");
  if (!modal || !modal.classList.contains("is-open")) return;

  modal.classList.remove("is-open");
  logoDetailModalCloseTimer = window.setTimeout(() => {
    modal.setAttribute("aria-hidden", "true");
    if (!document.querySelector("#logoModal")?.classList.contains("is-open")) {
      document.body.classList.remove("is-modal-open");
    }
    logoDetailModalCloseTimer = null;
  }, LOGO_DETAIL_MODAL_TRANSITION_MS);
}

function renderLogoModalGrid() {
  const grid = document.querySelector("#logoModalGrid");
  if (!grid) return;
  grid.innerHTML = "";
  logoArchive.forEach((logo) => grid.appendChild(createLogoCard(logo)));
}

function openLogoModal() {
  const modal = document.querySelector("#logoModal");
  const modalBody = document.querySelector("#logoModalBody");
  if (!modal) return;

  if (logoModalCloseTimer) {
    window.clearTimeout(logoModalCloseTimer);
    logoModalCloseTimer = null;
  }

  renderLogoModalGrid();
  if (modalBody) modalBody.scrollTop = 0;
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-modal-open");
  window.requestAnimationFrame(() => modal.classList.add("is-open"));
}

function closeLogoModal() {
  const modal = document.querySelector("#logoModal");
  if (!modal || !modal.classList.contains("is-open")) return;

  modal.classList.remove("is-open");
  logoModalCloseTimer = window.setTimeout(() => {
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-modal-open");
    logoModalCloseTimer = null;
  }, LOGO_MODAL_TRANSITION_MS);
}

function createArchiveItemModal() {
  const modal = document.createElement("div");
  modal.className = "archive-item-modal";
  modal.id = "archiveItemModal";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="archive-item-modal__overlay" data-archive-item-close></div>
    <button class="archive-item-modal__close" type="button" data-archive-item-close aria-label="Close archive image">×</button>
    <button class="archive-item-modal__top" type="button" data-archive-item-top aria-label="Back to top">↑</button>
    <section class="archive-item-modal__panel" role="dialog" aria-modal="true" aria-labelledby="archiveItemTitle">
      <div class="archive-item-modal__body" id="archiveItemBody"></div>
    </section>
  `;
  document.body.appendChild(modal);
}

function renderArchiveItemModal(item) {
  const body = document.querySelector("#archiveItemBody");
  if (!body) return;

  body.innerHTML = `
    <div class="archive-item-modal__gallery">
      ${(item.detailImages && item.detailImages.length ? item.detailImages : [item.image])
        .map(
          (image, index) => `
            <figure class="archive-item-modal__image">
              <img src="${image}?v=20260714-ip-image" alt="${item.title} ${index + 1}" loading="lazy" />
            </figure>
          `
        )
        .join("")}
    </div>
    <aside class="archive-item-modal__info">
      <p class="section-kicker">${item.type}</p>
      <h2 id="archiveItemTitle">${item.title}</h2>
      <dl>
        <div>
          <dt>Type</dt>
          <dd>${item.type}</dd>
        </div>
        <div>
          <dt>Year</dt>
          <dd>${item.year}</dd>
        </div>
      </dl>
      <p>${item.description}</p>
    </aside>
  `;
}

function openArchiveItemModal(index) {
  const item = archiveItems[index];
  const modal = document.querySelector("#archiveItemModal");
  if (!item || !modal) return;

  if (archiveItemModalCloseTimer) {
    window.clearTimeout(archiveItemModalCloseTimer);
    archiveItemModalCloseTimer = null;
  }

  renderArchiveItemModal(item);
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-modal-open");
  window.requestAnimationFrame(() => modal.classList.add("is-open"));
}

function closeArchiveItemModal() {
  const modal = document.querySelector("#archiveItemModal");
  if (!modal || !modal.classList.contains("is-open")) return;

  modal.classList.remove("is-open");
  archiveItemModalCloseTimer = window.setTimeout(() => {
    modal.setAttribute("aria-hidden", "true");
    if (
      !document.querySelector("#logoModal")?.classList.contains("is-open") &&
      !document.querySelector("#logoDetailModal")?.classList.contains("is-open") &&
      !document.querySelector("#workModal")?.classList.contains("is-open")
    ) {
      document.body.classList.remove("is-modal-open");
    }
    archiveItemModalCloseTimer = null;
  }, LOGO_DETAIL_MODAL_TRANSITION_MS);
}

function initLogoModal() {
  createLogoModal();
  createLogoDetailModal();
  createArchiveItemModal();
  document.querySelector("#viewAllLogos")?.addEventListener("click", openLogoModal);
  document.querySelector("#logoWall")?.addEventListener("click", (event) => {
    const item = event.target.closest("[data-logo-id]");
    if (item) openLogoDetailModal(item.dataset.logoId);
  });

  document.addEventListener("click", (event) => {
    if (event.target.matches("[data-logo-modal-close]")) closeLogoModal();
    if (event.target.matches("[data-logo-detail-close]")) closeLogoDetailModal();
    if (event.target.matches("[data-archive-item-close]")) closeArchiveItemModal();
    const visWorkTrigger = event.target.closest("[data-logo-vis-work]");
    if (visWorkTrigger) openLogoRelatedWork(visWorkTrigger.dataset.logoVisWork);
    if (event.target.matches("[data-logo-modal-top]")) {
      document.querySelector("#logoModalBody")?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    if (event.target.matches("[data-logo-detail-top]")) {
      document.querySelector("#logoDetailBody")?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    if (event.target.matches("[data-archive-item-top]")) {
      document.querySelector("#archiveItemBody")?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLogoDetailModal();
      closeLogoModal();
      closeArchiveItemModal();
    }
  });

  window.addEventListener("resize", updateArchivePromoRows);
}

function observeRevealItems() {
  const revealItems = document.querySelectorAll(
    "[data-reveal], .lab-item, .archive-tile"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function initNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  toggle.addEventListener("click", () => {
    const isOpen = toggle.classList.toggle("is-open");
    nav.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      toggle.classList.remove("is-open");
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

function initContactCopy() {
  const cards = document.querySelectorAll(".contact-card[data-copy]");
  cards.forEach((card) => {
    card.addEventListener("click", async () => {
      const value = card.dataset.copy || "";
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(value);
        } else {
          const input = document.createElement("textarea");
          input.value = value;
          input.setAttribute("readonly", "");
          input.style.position = "fixed";
          input.style.opacity = "0";
          document.body.appendChild(input);
          input.select();
          document.execCommand("copy");
          input.remove();
        }
        card.classList.add("is-copied");
        window.setTimeout(() => card.classList.remove("is-copied"), 1200);
      } catch (error) {
        console.warn("Copy failed", error);
      }
    });
  });
}

renderWorks();
initWorksStackInteractions();
initWorkModal();
renderLab();
renderArchiveFilter();
renderArchive();
initLogoModal();
initNavigation();
initContactCopy();
observeRevealItems();

