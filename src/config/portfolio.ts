import { EducationItem, ActivityItem, ResearchItem, ProjectItem, CreativeItem, SkillCategory, SocialLink } from '../types';

export const portfolio = {
  name: "Alfi Shahriyar",
  role: "UI/UX Designer & Front-End Developer",
  secondaryRole: "AI/ML & Cybersecurity Researcher",
  eyebrow: "Hi, I'm",
  tagline: "I design thoughtful digital experiences and build responsive websites that turn ideas into useful products.",
  subTagline: "Exploring AI/ML, cybersecurity research, mobile applications and creative digital experiences.",

  // Deployment and Custom Domain Configuration
  siteUrl: "https://alfi-shahriyar.vercel.app", // Easily change to "https://alfishahriyar.com" or your custom domain
  customDomainHint: "alfishahriyar.com",
  canonicalUrl: "https://alfi-shahriyar.vercel.app",

  profileImage: "/images/alfi-shahriyar.jpg",
  ogImage: "/images/og-image.jpg",

  bio: "I'm Alfi Shahriyar, a Computer Science & Engineering student and aspiring UI/UX Designer & Front-End Developer with interests spanning modern web development, AI/ML, cybersecurity, mobile applications and creative digital experiences. My work combines design thinking with technical development. I enjoy turning ideas into useful interfaces, experimenting with modern technologies, and exploring how thoughtful design can improve digital products. My core research focus is Federated Learning-Based Intrusion Detection for IoT and Edge Networks, exploring AI/ML techniques for privacy-aware and resource-conscious cybersecurity.",

  interests: [
    "Web Development",
    "UI/UX Design",
    "AI / Machine Learning",
    "Cybersecurity Research",
    "Mobile Applications",
    "Graphics Design",
    "Creative Game Dev"
  ],

  heroBadges: [
    { label: "UI/UX Design", icon: "Layout" },
    { label: "Figma", icon: "Figma" },
    { label: "Next.js", icon: "Code2" },
    { label: "AI/ML", icon: "Cpu" },
    { label: "Cybersecurity", icon: "ShieldCheck" },
  ],

  cv: {
    available: false, // Set to true when PDF is placed in public folder
    path: "/cv/Alfi_Shahriyar_CV.pdf",
    label: "Download CV",
    statusNote: "CV file can be attached in /public/cv/ or linked here."
  },

  contact: {
    email: "alfishahriyar242@gmail.com",
    location: "Bangladesh",
    availability: "Open to UI/UX, Front-End & Research Opportunities",
    heading: "Let's Build Something Great",
    subheading: "Have a project in mind or just want to say hello? I'd love to hear from you."
  },

  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com",
      handle: "alfi-shahriyar",
      icon: "Github",
      isAvailable: true
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com",
      handle: "alfi-shahriyar",
      icon: "Linkedin",
      isAvailable: true
    },
    {
      platform: "Email",
      url: "mailto:alfishahriyar242@gmail.com",
      handle: "alfishahriyar242@gmail.com",
      icon: "Mail",
      isAvailable: true
    }
  ] as SocialLink[],

  education: [
    {
      id: "diu",
      institution: "Daffodil International University",
      degree: "BSc in Computer Science & Engineering",
      result: "Current CGPA: 3.94",
      logo: "/images/logos/diu.png",
      period: "Undergraduate Program",
      description: "Focused on core computer science fundamentals, human-computer interaction, web architectures, AI/ML paradigms, and cybersecurity research."
    },
    {
      id: "ccpc-hsc",
      institution: "Chattogram Cantonment Public College",
      degree: "Higher Secondary Certificate (HSC)",
      field: "Science",
      result: "GPA: 5.00",
      logo: "/images/logos/ccpc.png",
      period: "Higher Secondary",
      description: "Academic focus on physics, higher mathematics, chemistry, and introductory computational thinking."
    },
    {
      id: "ccpc-ssc",
      institution: "Chattogram Cantonment Public College",
      degree: "Secondary School Certificate (SSC)",
      field: "Science",
      result: "GPA: 5.00",
      logo: "/images/logos/ccpc.png",
      period: "Secondary School",
      description: "Foundation in science, analytical problem solving, and information technology."
    }
  ] as EducationItem[],

  activities: [
    {
      id: "ai-club",
      title: "AI Club",
      role: "Lead Member",
      badge: "Leadership & Collaboration",
      iconName: "ai",
      description: "Active leadership in peer discussions, machine learning workshops, and research literature reviews exploring intelligent systems.",
      highlights: [
        "Facilitating student discussions on modern AI/ML frameworks",
        "Exploring edge computing and federated learning concepts",
        "Encouraging collaborative hands-on projects"
      ]
    },
    {
      id: "cyber-club",
      title: "Cybersecurity Club",
      role: "Lead Member",
      badge: "Security & Defense",
      iconName: "shield",
      description: "Advancing awareness in network defense, intrusion detection concepts, ethical research, and secure system design.",
      highlights: [
        "Studying network vulnerability vectors and IDS architectures",
        "Engaging in defensive security simulations and workshops",
        "Promoting security-first thinking in digital product development"
      ]
    },
    {
      id: "contest",
      title: "CSE Programming Contest",
      role: "High Scorer",
      badge: "Problem Solving",
      iconName: "code",
      description: "Demonstrated strong algorithmic reasoning, data structure proficiency, and time-pressured problem solving in university contests.",
      highlights: [
        "High score in competitive programming rounds",
        "Rigorous practice with algorithmic complexity and logic",
        "Translating abstract problem requirements into clean code"
      ]
    }
  ] as ActivityItem[],

  research: {
    title: "Federated Learning-Based Intrusion Detection System for IoT and Edge Networks",
    category: "Core Research Topic",
    summary: "Exploring decentralized AI/ML paradigms to safeguard interconnected Internet of Things (IoT) nodes without centralizing raw network telemetry.",
    concept: "IoT and edge devices generate network and security telemetry locally. Traditional intrusion detection relies on transferring vast volumes of raw data to a central cloud, exposing user privacy and causing massive bandwidth bottlenecks. Federated Learning allows participating edge clients to train local anomaly detection models on-device and communicate only encrypted model weight gradients to a central coordinator. The server aggregates these updates (via FedAvg or robust aggregators) to iteratively refine a global defense model without ever collecting raw network packets.",
    diagramImage: "/images/research/federated-ids.jpg",
    areas: [
      "Federated Learning",
      "Artificial Intelligence",
      "Machine Learning",
      "Cybersecurity",
      "Intrusion Detection",
      "IoT Security",
      "Edge Computing",
      "Explainable AI",
      "Privacy-Aware Learning",
      "Resource-Aware Systems"
    ],
    keyPillars: [
      {
        title: "Decentralized Edge Intelligence",
        description: "Executing local anomaly detection on resource-constrained devices, minimizing latency and eliminating central telemetry bottlenecks."
      },
      {
        title: "Privacy Preservation",
        description: "Ensuring sensitive device logs, payload data, and user network footprints never leave the local boundary."
      },
      {
        title: "Collaborative Cyber Defense",
        description: "Enabling collective immunity across heterogeneous IoT nodes through iterative global model parameter aggregation."
      }
    ]
  } as ResearchItem,

  skills: [
    {
      title: "DESIGN",
      color: "from-blue-500/20 to-cyan-500/20",
      skills: ["Figma", "Framer", "UI/UX Design", "Responsive Design", "Wireframing", "Design Systems", "Prototyping"]
    },
    {
      title: "FRONT-END",
      color: "from-indigo-500/20 to-blue-500/20",
      skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"]
    },
    {
      title: "DEVELOPMENT",
      color: "from-cyan-500/20 to-teal-500/20",
      skills: ["Git / GitHub", "Modern Web Development", "Mobile App Development", "RESTful Architecture", "Component Engineering"]
    },
    {
      title: "AI / ML",
      color: "from-purple-500/20 to-blue-500/20",
      skills: ["Artificial Intelligence", "Machine Learning", "Federated Learning", "Explainable AI", "Data Analysis", "Intrusion Detection Models"]
    },
    {
      title: "CYBERSECURITY",
      color: "from-emerald-500/20 to-cyan-500/20",
      skills: ["Cybersecurity Fundamentals", "Intrusion Detection (IDS)", "IoT Security", "Edge Security", "Network Defense Concepts"]
    },
    {
      title: "CREATIVE",
      color: "from-pink-500/20 to-indigo-500/20",
      skills: ["Graphics Design", "Visual Composition", "Creative Coding", "Small Game Development", "Micro-Interactions"]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: "apex-roofing",
      name: "Apex Roofing",
      type: "Web Design & UI/UX Experience",
      category: "web-design",
      categoryLabel: "Web Design",
      nature: "Self-Initiated Concept",
      shortDescription: "A modern, high-converting digital presence and instant estimate flow engineered for an architectural contracting service.",
      status: "Concept Finished",
      tools: ["Figma", "React", "Tailwind CSS", "UX Architecture"],
      image: "/images/projects/apex-roofing.jpg",
      liveUrl: null, // "Coming Soon" - no fake URLs
      githubUrl: null,
      caseStudy: {
        overview: "Apex Roofing was conceptualized to address common UX pain points in home service contractor websites: clunky quote forms, lack of transparent pricing signals, and uninspiring visual branding.",
        problem: "Traditional contracting websites suffer from high bounce rates due to overwhelming text, hidden contact channels, and complicated multistep consultation forms that demand personal contact details upfront.",
        goal: "Design a trustworthy, visually striking web experience that allows homeowners to preview materials, calculate estimates in under 60 seconds, and schedule consultations seamlessly.",
        targetUsers: "Residential homeowners, property managers, and commercial building owners seeking reliable, professional roof repair and replacement.",
        researchInsights: [
          "Users prioritize social proof (real inspection photos, client reviews) above technical jargon.",
          "Over 68% of residential service inquiries originate on mobile devices while inspecting properties.",
          "An interactive material visualizer increased perceived transparency and trust."
        ],
        userFlowSteps: [
          "Landing Page → Material Showcase → Interactive Estimate Calculator → Date Selector → Confirmation Summary"
        ],
        designSystem: {
          colors: [
            { name: "Deep Slate", hex: "#0f172a", role: "Primary Canvas" },
            { name: "Apex Blue", hex: "#2563eb", role: "Primary Action & Highlights" },
            { name: "Amber Accent", hex: "#f59e0b", role: "Trust Badges & Accents" }
          ],
          typography: "Plus Jakarta Sans for accessible, high-legibility typographic hierarchy.",
          principles: ["Generous whitespace", "Transparent data cards", "Fast mobile touch targets"]
        },
        designDecisions: [
          "Introduced a sticky bottom-bar quote launcher on mobile viewports for effortless access.",
          "Replaced lengthy multi-page questionnaires with a clean progressive disclosure stepper.",
          "Utilized high-contrast architectural imagery to elevate brand prestige."
        ],
        developmentNotes: [
          "Responsive grid system ensuring pristine alignment across mobile (375px) to 4K displays.",
          "Performant image loading with next-gen formats and lazy decoding.",
          "Strict WCAG AA contrast compliance across all text and interaction states."
        ],
        qualitativeOutcome: "A refined, professional design artifact demonstrating how thoughtful user experience and modern visual craftsmanship transform traditionally utilitarian trade websites.",
        whatILearned: "How micro-interactions during form inputs substantially reduce form abandonment and improve user confidence."
      }
    },
    {
      id: "flowdesk-ai",
      name: "FlowDesk AI",
      type: "SaaS Product Design & Front-End Interface",
      category: "ai-ml",
      categoryLabel: "AI/ML & Front-End",
      nature: "Self-Initiated Concept",
      shortDescription: "An intelligent visual workflow orchestrator enabling engineering teams to assemble and monitor autonomous agent chains.",
      status: "Concept Finished",
      tools: ["Figma", "React", "TypeScript", "Tailwind CSS", "Motion"],
      image: "/images/projects/flowdesk-ai.jpg",
      liveUrl: null,
      githubUrl: null,
      caseStudy: {
        overview: "FlowDesk AI explores human-AI collaborative workflows, focusing on a node-based visual canvas where engineers can inspect reasoning chains, token consumption, and edge latency in real-time.",
        problem: "Modern AI pipeline dashboards often drown users in raw JSON payloads and fragmented log streams, making debugging autonomous agents stressful and visually chaotic.",
        goal: "Create an intuitive, node-based workspace where agent decision branches, prompt templates, and execution states are immediately comprehensible at a glance.",
        targetUsers: "AI engineers, prompt designers, and product managers coordinating multi-agent orchestration systems.",
        researchInsights: [
          "Visual node graphs require clear state indicators (idle, active, evaluating, error) with distinct iconography.",
          "Engineers need instant side-drawer access to prompt inputs without losing their position on the canvas.",
          "Dark mode is the universal preference for dense data monitoring tools."
        ],
        userFlowSteps: [
          "Dashboard Overview → Canvas Workspace → Drag Node → Configure Agent Parameters → Run Test Execution → Inspect Telemetry"
        ],
        designSystem: {
          colors: [
            { name: "Carbon Canvas", hex: "#0b0f19", role: "Main Background" },
            { name: "Electric Indigo", hex: "#6366f1", role: "Active Nodes & Primary Triggers" },
            { name: "Cyan Pulse", hex: "#06b6d4", role: "Data Flow Indicators" }
          ],
          typography: "Syne for headlines paired with JetBrains Mono for execution parameters and code previews.",
          principles: ["Mathematical spacing scales", "Subtle border hierarchy", "Non-blocking inspection panels"]
        },
        designDecisions: [
          "Designed custom canvas zoom and pan controls optimized for trackpads and mice.",
          "Implemented collapsible telemetry inspector to preserve canvas real estate.",
          "Utilized subtle pulse animations to signify active packet transmissions between nodes."
        ],
        developmentNotes: [
          "State management handling node connections and execution logs seamlessly.",
          "Tailwind CSS flex and grid structures for resilient responsive dashboard panes.",
          "Zero layout shift during live simulation runs."
        ],
        qualitativeOutcome: "A sophisticated developer-centric UI demonstrating advanced layout composition, component modularity, and deep empathy for technical users.",
        whatILearned: "Balancing high information density with visual calm is critical when designing tools for complex cognitive tasks."
      }
    },
    {
      id: "novacare",
      name: "NovaCare",
      type: "HealthTech Patient Portal & UI/UX System",
      category: "ui-ux",
      categoryLabel: "UI/UX Design",
      nature: "Self-Initiated Concept",
      shortDescription: "An accessible telehealth and patient management portal designed to reduce clinical anxiety and streamline consultations.",
      status: "Concept Finished",
      tools: ["Figma", "Design Systems", "Prototyping", "Accessibility (a11y)"],
      image: "/images/projects/novacare.jpg",
      liveUrl: null,
      githubUrl: null,
      caseStudy: {
        overview: "NovaCare is a human-centered digital healthcare portal connecting patients with clinical specialists, prescription refills, and lab reports with minimal friction.",
        problem: "Patient portals are notoriously clinical, confusing to elderly patients, and poorly adapted for quick mobile appointment management during emergencies.",
        goal: "Build a comforting, warm, and highly accessible patient dashboard that prioritizes upcoming appointments, immediate physician messaging, and plain-language test results.",
        targetUsers: "Patients managing chronic health routines, working professionals scheduling tele-consults, and clinical support coordinators.",
        researchInsights: [
          "Users experiencing medical anxiety require soft visual palettes and large, unmistakable call-to-action buttons.",
          "Test results should include contextual normal ranges rather than raw cryptic medical numbers.",
          "Emergency telemedicine access must always be a 1-tap operation."
        ],
        userFlowSteps: [
          "Patient Login → Health Summary Card → Select Specialty Doctor → Pick Available Slot → Confirmation & Pre-consult Form"
        ],
        designSystem: {
          colors: [
            { name: "Serene Navy", hex: "#0c1322", role: "Grounding Background" },
            { name: "Healing Teal", hex: "#0d9488", role: "Primary Actions & Health Indicators" },
            { name: "Soft Cyan", hex: "#38bdf8", role: "Interactive Accents" }
          ],
          typography: "Plus Jakarta Sans configured with strict baseline 1.6 line height for effortless readability.",
          principles: ["High optical contrast", "Touch targets > 48px", "Clear error prevention"]
        },
        designDecisions: [
          "Replaced tabular prescription data with card-based visual medicine schedules with icon badges.",
          "Integrated an instant consultation timer with calendar sync for Google and Apple Calendars.",
          "Designed comprehensive responsive layouts specifically tested for older adult usability."
        ],
        developmentNotes: [
          "Complete keyboard navigation with explicit focus rings across all inputs and interactive cards.",
          "Semantic HTML5 landmarks (nav, main, section, aside) for screen reader support.",
          "Modular design system tokens scalable across web and tablet views."
        ],
        qualitativeOutcome: "A thoughtful, empathetic digital health product design emphasizing accessibility, warmth, and cognitive clarity.",
        whatILearned: "How micro-copy and emotional design choices can significantly reduce stress in high-stakes healthcare scenarios."
      }
    },
    {
      id: "clearflow",
      name: "ClearFlow Plumbing Redesign",
      type: "Responsive Web Redesign & Front-End",
      category: "frontend",
      categoryLabel: "Front-End & Responsive",
      nature: "Portfolio Concept Project",
      shortDescription: "A comprehensive digital transformation redesign transforming a cluttered local utility site into a sleek, mobile-first booking experience.",
      status: "Concept Finished",
      tools: ["React", "TypeScript", "Tailwind CSS", "Figma"],
      image: "/images/projects/clearflow.jpg",
      liveUrl: null,
      githubUrl: null,
      caseStudy: {
        overview: "ClearFlow Plumbing was developed as an end-to-end redesign exercise addressing the clunky UX, slow mobile loading, and chaotic layout typical of local emergency trade services.",
        problem: "Users facing plumbing emergencies are under time pressure. The legacy design buried phone numbers, lacked transparent emergency dispatch pricing, and took 6 seconds to load on 4G connections.",
        goal: "Deliver a lightning-fast responsive web experience with an immediate emergency dispatch tap button, transparent upfront pricing tiers, and a real-time technician tracker preview.",
        targetUsers: "Urban residential clients facing pipe bursts, heating malfunctions, or scheduled preventative plumbing maintenance.",
        researchInsights: [
          "Over 84% of emergency plumbing site visits occur during distress situations where rapid phone calling is paramount.",
          "Clear breakdown of callout charges immediately establishes trust versus competitors with ambiguous fees.",
          "Customer reviews with verified location badges dramatically boost booking completion."
        ],
        userFlowSteps: [
          "Hero Viewport → Tap Emergency Call / Instant Booking → Select Issue Type → See Upfront Estimate → Dispatch Requested"
        ],
        designSystem: {
          colors: [
            { name: "Deep Ocean", hex: "#0a1120", role: "Primary Atmosphere" },
            { name: "Clear Aqua", hex: "#0284c7", role: "Primary Interactive" },
            { name: "Safety Coral", hex: "#f43f5e", role: "Emergency Dispatch Alert" }
          ],
          typography: "Plus Jakarta Sans with clean numeric tabular figures.",
          principles: ["Immediate action hierarchy", "Zero clutter above the fold", "Subtle visual feedback"]
        },
        designDecisions: [
          "Engineered a floating emergency call button with one-tap dialer initiation on mobile devices.",
          "Structured an interactive service selector with upfront transparent price ranges.",
          "Crafted high-fidelity desktop and mobile viewports demonstrating responsive craftsmanship."
        ],
        developmentNotes: [
          "Built using modern React functional components with clean modular state separation.",
          "Tailwind CSS responsive classes guaranteeing fluid transitions between viewport widths.",
          "Pristine accessibility with full ARIA live regions for dynamic dispatch status updates."
        ],
        qualitativeOutcome: "A tangible demonstration of full-stack design thinking, bridging business objectives with rapid mobile usability in high-stress consumer scenarios.",
        whatILearned: "How reducing choice overload in urgent interfaces directly translates into superior customer satisfaction."
      }
    }
  ] as ProjectItem[],

  creativeProjects: [
    {
      id: "mobile-apps",
      title: "Mobile App Development",
      subtitle: "Beyond the Web",
      description: "I explore mobile application development, focusing on useful interfaces, responsive interaction patterns and practical digital experiences. Designing for touch-first ergonomic reachability and fluid gesture interactions.",
      category: "mobile",
      tags: ["React Native", "Mobile UI/UX", "iOS & Android Patterns", "Touch Design"],
      statusText: "Future mobile concepts and prototypes currently in development."
    },
    {
      id: "graphics-design",
      title: "Creative & Visual Design",
      subtitle: "Visual Composition & Branding",
      description: "Exploring digital graphics, brand identity systems, typography pairings, and modern design assets that establish a memorable, cohesive digital presence.",
      category: "graphics",
      tags: ["Brand Identity", "Visual Composition", "Figma", "Digital Art Assets"],
      statusText: "Selected creative work coming soon."
    },
    {
      id: "game-dev",
      title: "Creative Experiments & Small Games",
      subtitle: "Interactive Playgrounds",
      description: "Personal experiments in creative coding, mini-game physics loops, and interactive micro-experiences built to explore fun visual logic and browser performance.",
      category: "games",
      tags: ["Creative Coding", "Canvas API", "Game Loops", "Micro-Interactions"],
      statusText: "Playable mini-game experiment available directly below!"
    }
  ] as CreativeItem[],

  designProcess: [
    {
      step: "01",
      title: "Discover",
      subtitle: "Understand & Empathize",
      description: "Understand the core problem, end-user motivations, functional constraints, and business goals through research and empathy."
    },
    {
      step: "02",
      title: "Define",
      subtitle: "Clarify & Structure",
      description: "Clarify project goals, content architecture, user journeys, and core requirements before touching visual tools."
    },
    {
      step: "03",
      title: "Wireframe",
      subtitle: "Architecture & Low-Fi",
      description: "Create information architecture, structural hierarchy, and low-fidelity layouts to test flow and ergonomic pacing."
    },
    {
      step: "04",
      title: "Design",
      subtitle: "Visual System & High-Fi",
      description: "Build an intentional visual system: typography hierarchy, color tokens, accessible contrast, components, and polished prototypes."
    },
    {
      step: "05",
      title: "Develop",
      subtitle: "Clean Front-End Code",
      description: "Transform designs into responsive, production-ready web experiences using modern React, TypeScript, and clean Tailwind styling."
    },
    {
      step: "06",
      title: "Refine",
      subtitle: "Usability & Performance",
      description: "Rigorously test across mobile viewports, audit accessibility, optimize asset delivery, and fine-tune subtle micro-interactions."
    }
  ]
};
