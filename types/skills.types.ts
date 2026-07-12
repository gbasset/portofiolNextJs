export interface SkillProject {
  title: string;
  company: string;
  period: string;
  context: string;
  challenges: string[];
  solutions: string[];
  results: string[];
  stack: string[];
}

export interface Skill {
  id: string;
  language: string;
  image: string;
  technos: string[];
  description: string;
  projects: SkillProject[];
}

export interface SkillsData {
  skills: Skill[];
}
