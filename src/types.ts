export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  result: string;
  logo: string;
  period?: string;
  description?: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  role: string;
  badge: string;
  iconName: 'ai' | 'shield' | 'code';
  description: string;
  highlights: string[];
}

export interface ResearchItem {
  title: string;
  category: string;
  summary: string;
  concept: string;
  diagramImage: string;
  areas: string[];
  keyPillars: {
    title: string;
    description: string;
  }[];
}

export interface ProjectItem {
  id: string;
  name: string;
  type: string;
  category: 'ui-ux' | 'web-design' | 'frontend' | 'ai-ml' | 'cybersecurity' | 'mobile' | 'creative';
  categoryLabel: string;
  nature: 'Self-Initiated Concept' | 'Portfolio Concept Project' | string;
  shortDescription: string;
  status: string;
  tools: string[];
  image: string;
  liveUrl?: string | null;
  githubUrl?: string | null;
  documentUrl?: string | null;
  isCustom?: boolean;
  createdAt?: string;
  caseStudy: {
    overview: string;
    problem: string;
    goal: string;
    targetUsers: string;
    researchInsights: string[];
    userFlowSteps: string[];
    designSystem: {
      colors: { name: string; hex: string; role: string }[];
      typography: string;
      principles: string[];
    };
    designDecisions: string[];
    developmentNotes: string[];
    qualitativeOutcome: string;
    whatILearned: string;
  };
}

export interface CreativeItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'mobile' | 'graphics' | 'games';
  tags: string[];
  statusText: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
  color: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
  icon: string;
  isAvailable: boolean;
}
