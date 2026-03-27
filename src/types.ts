export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  year: string;
  category: string;
  showcase?: 'museum' | 'forest' | 'red';
}

export type AppWindow = 'home' | 'about' | 'projects' | 'contact' | null;
