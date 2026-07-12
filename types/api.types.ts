export interface ImageUrl {
  url: string;
}

export interface ProjectLink {
  name: string;
  url: string;
}

export interface MainProject {
  _id: string;
  name: string;
  description: string;
  imageHome: ImageUrl;
}

export interface ProjectDetail extends MainProject {
  images: ImageUrl[];
  language: string[];
  tags: string[];
  devices: ('mobile' | 'desktop')[];
  links: ProjectLink[];
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface ContactPayload {
  subject: string;
  message: string;
  from: string;
}
